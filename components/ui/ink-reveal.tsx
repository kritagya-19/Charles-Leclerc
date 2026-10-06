"use client";
import { useEffect, useRef, useCallback } from "react";

interface InkRevealProps {
  /** RGB color of the mask overlay, e.g. [252, 250, 248] */
  maskColor?: [number, number, number];
  /**
   * Image URL to use as the mask fill instead of a solid color.
   * The image is drawn with cover-fit each frame; ink stamps
   * carve through it to reveal whatever sits behind the canvas.
   */
  maskImage?: string;
  /**
   * Background image URL drawn beneath the mask image on the canvas.
   * The mask image is composited on top of this each frame.
   * When stamps carve through the canvas, the DOM layer behind is revealed.
   */
  backgroundImage?: string;
  /** Radius of each ink stamp in px */
  brushSize?: number;
  /** How long each stamp lives before fading (ms) */
  lifetime?: number;
  /** Initial radius before the stamp expands */
  rStart?: number;
  /** Random variation factor for stamp radius (0–1) */
  rVary?: number;
  /** Min pixel distance between stamps along a stroke */
  stampStep?: number;
  /** Max stamps alive at once (oldest are pruned) */
  maxStamps?: number;
  /** Number of segments on the wobble circle (higher = smoother) */
  segments?: number;
  /** Wobble amplitude weights [primary, secondary, tertiary] */
  wobble?: [number, number, number];
  /** Gradient inner-radius factor (0–1, relative to stamp radius) */
  gradientInnerRadius?: number;
  /** Gradient opacity stops [center, mid, edge] */
  gradientStops?: [number, number, number];
  /** Extra CSS class for the canvas element */
  className?: string;
  /** Extra inline styles for the canvas element */
  style?: React.CSSProperties;
}

interface Stamp {
  x: number;
  y: number;
  born: number;
  seed: number;
  rmax: number;
}

/* ---------- helpers ---------- */

/** Draw `img` onto `ctx` with cover-fit (centered crop). */
function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  w: number,
  h: number
) {
  const imgRatio = img.naturalWidth / img.naturalHeight;
  const canvasRatio = w / h;
  let sx: number, sy: number, sw: number, sh: number;

  if (imgRatio > canvasRatio) {
    // image is wider than canvas → crop sides
    sh = img.naturalHeight;
    sw = sh * canvasRatio;
    sx = (img.naturalWidth - sw) / 2;
    sy = 0;
  } else {
    // image is taller than canvas → crop top/bottom
    sw = img.naturalWidth;
    sh = sw / canvasRatio;
    sx = 0;
    sy = (img.naturalHeight - sh) / 2;
  }

  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
}

/* ---------- component ---------- */

export default function InkReveal({
  maskColor = [252, 250, 248],
  maskImage,
  backgroundImage,
  brushSize = 128,
  lifetime = 600,
  rStart = 10,
  rVary = 0.45,
  stampStep = 10,
  maxStamps = 200,
  segments = 36,
  wobble = [0.14, 0.08, 0.05],
  gradientInnerRadius = 0.2,
  gradientStops = [0.95, 0.88, 0],
  className,
  style,
}: InkRevealProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stampsRef = useRef<Stamp[]>([]);
  const runningRef = useRef(false);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const dimsRef = useRef({ w: 0, h: 0 });
  const maskImageRef = useRef<HTMLImageElement | null>(null);
  const bgImageRef = useRef<HTMLImageElement | null>(null);

  const mc = maskColor;

  /* ---- Load the mask image (if provided) ---- */
  useEffect(() => {
    if (!maskImage) return;
    const img = new Image();
    img.onload = () => {
      maskImageRef.current = img;
      // Immediately redraw the canvas with the loaded image
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const { w, h } = dimsRef.current;
      if (w > 0 && h > 0) {
        ctx.globalCompositeOperation = "source-over";
        // Draw bg first, then mask on top
        if (bgImageRef.current) drawCover(ctx, bgImageRef.current, w, h);
        drawCover(ctx, img, w, h);
      }
    };
    img.src = maskImage;
  }, [maskImage]);

  /* ---- Load the background image (if provided) ---- */
  useEffect(() => {
    if (!backgroundImage) return;
    const img = new Image();
    img.onload = () => {
      bgImageRef.current = img;
      // Redraw canvas with background + mask composited
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const { w, h } = dimsRef.current;
      if (w > 0 && h > 0) {
        ctx.globalCompositeOperation = "source-over";
        drawCover(ctx, img, w, h);
        if (maskImageRef.current) drawCover(ctx, maskImageRef.current, w, h);
      }
    };
    img.src = backgroundImage;
  }, [backgroundImage]);

  /* ---- Fill canvas: background image first, then mask image on top ---- */
  const fillCanvas = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number) => {
      // Step 1: Draw the background (CLBG.png gradient)
      if (bgImageRef.current) {
        drawCover(ctx, bgImageRef.current, w, h);
      } else {
        ctx.fillStyle = `rgb(${mc[0]},${mc[1]},${mc[2]})`;
        ctx.fillRect(0, 0, w, h);
      }
      // Step 2: Draw the mask image (CL1.png portrait) on top
      if (maskImageRef.current) {
        drawCover(ctx, maskImageRef.current, w, h);
      }
    },
    [mc]
  );

  /* ---- Resize handler ---- */
  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = parent.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    dimsRef.current = { w, h };
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = "source-over";
    fillCanvas(ctx, w, h);
  }, [fillCanvas]);

  /* ---- Ink carving (wobble-circle stamp) ---- */
  const carveInk = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      r: number,
      seed: number,
      alpha: number
    ) => {
      const g = ctx.createRadialGradient(
        x, y, r * gradientInnerRadius,
        x, y, r
      );
      g.addColorStop(0, `rgba(0,0,0,${gradientStops[0] * alpha})`);
      g.addColorStop(0.5, `rgba(0,0,0,${gradientStops[1] * alpha})`);
      g.addColorStop(1, `rgba(0,0,0,${gradientStops[2] * alpha})`);
      ctx.fillStyle = g;

      ctx.beginPath();
      for (let i = 0; i <= segments; i++) {
        const a = (i / segments) * Math.PI * 2;
        const wob =
          0.78 +
          wobble[0] * Math.sin(a * 3 + seed) +
          wobble[1] * Math.sin(a * 5 + seed * 2.1) +
          wobble[2] * Math.sin(a * 7 + seed * 0.7);
        const px = x + Math.cos(a) * r * wob;
        const py = y + Math.sin(a) * r * wob;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
    },
    [segments, wobble, gradientInnerRadius, gradientStops]
  );

  /* ---- Stamp management ---- */
  const addStamp = useCallback(
    (x: number, y: number) => {
      const stamps = stampsRef.current;
      if (stamps.length >= maxStamps) stamps.shift();
      stamps.push({
        x,
        y,
        born: performance.now(),
        seed: Math.random() * Math.PI * 2,
        rmax: brushSize * (1 - rVary + Math.random() * rVary),
      });
    },
    [brushSize, rVary, maxStamps]
  );

  const stampAlong = useCallback(
    (x: number, y: number) => {
      const last = lastPosRef.current;
      if (!last) {
        addStamp(x, y);
      } else {
        const dx = x - last.x;
        const dy = y - last.y;
        const dist = Math.hypot(dx, dy);
        const steps = Math.max(1, Math.ceil(dist / stampStep));
        for (let i = 1; i <= steps; i++) {
          addStamp(last.x + (dx * i) / steps, last.y + (dy * i) / steps);
        }
      }
      lastPosRef.current = { x, y };
    },
    [addStamp, stampStep]
  );

  /* ---- Animation loop ---- */
  const loop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { w, h } = dimsRef.current;
    const now = performance.now();
    const stamps = stampsRef.current;

    ctx.globalCompositeOperation = "source-over";
    fillCanvas(ctx, w, h);
    ctx.globalCompositeOperation = "destination-out";

    for (let i = stamps.length - 1; i >= 0; i--) {
      const t = (now - stamps[i].born) / lifetime;
      if (t >= 1) {
        stamps.splice(i, 1);
        continue;
      }
      const ease = 1 - Math.pow(1 - t, 3);
      const r = rStart + (stamps[i].rmax - rStart) * ease;
      const alpha = 1 - t * t;
      carveInk(ctx, stamps[i].x, stamps[i].y, r, stamps[i].seed, alpha);
    }

    if (stamps.length) {
      requestAnimationFrame(loop);
    } else {
      runningRef.current = false;
    }
  }, [carveInk, fillCanvas, lifetime, rStart]);

  const startLoop = useCallback(() => {
    if (!runningRef.current) {
      runningRef.current = true;
      requestAnimationFrame(loop);
    }
  }, [loop]);

  /* ---- Mount / unmount ---- */
  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [resize]);

  /* ---- Pointer helpers ---- */
  const getRelativePos = (
    el: HTMLCanvasElement,
    clientX: number,
    clientY: number
  ) => {
    const rect = el.getBoundingClientRect();
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 1,
        touchAction: "none",
        ...style,
      }}
      /* --- Mouse events --- */
      onMouseEnter={(e) => {
        const pos = getRelativePos(e.currentTarget, e.clientX, e.clientY);
        lastPosRef.current = pos;
        stampAlong(pos.x, pos.y);
        startLoop();
      }}
      onMouseMove={(e) => {
        const pos = getRelativePos(e.currentTarget, e.clientX, e.clientY);
        stampAlong(pos.x, pos.y);
        startLoop();
      }}
      onMouseLeave={() => {
        lastPosRef.current = null;
      }}
      /* --- Touch events (for mobile parity) --- */
      onTouchStart={(e) => {
        const touch = e.touches[0];
        if (!touch) return;
        const pos = getRelativePos(e.currentTarget, touch.clientX, touch.clientY);
        lastPosRef.current = pos;
        stampAlong(pos.x, pos.y);
        startLoop();
      }}
      onTouchMove={(e) => {
        const touch = e.touches[0];
        if (!touch) return;
        const pos = getRelativePos(e.currentTarget, touch.clientX, touch.clientY);
        stampAlong(pos.x, pos.y);
        startLoop();
      }}
      onTouchEnd={() => {
        lastPosRef.current = null;
      }}
    />
  );
}
