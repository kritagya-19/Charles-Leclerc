"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import LoadingScreen from "@/components/LoadingScreen";
import ScrollVelocity from "@/components/ScrollVelocity";
import StatementQuote from "@/components/StatementQuote";
import PersonalStory from "@/components/PersonalStory";
import CharlesFullscreen from "@/components/CharlesFullscreen";
import HelmetGallery from "@/components/HelmetGallery";
import StoreCTA from "@/components/StoreCTA";
import Partnerships from "@/components/Partnerships";
import SocialSection from "@/components/SocialSection";
import Topography from "@/components/Topography";
import CharlesSignature from "@/components/CharlesSignature";
import FadeThrough from "@/components/ui/fade-through";
import Footer from "@/components/Footer";

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isLoading]);

  const TOTAL_FRAMES = 89;
  const getFrameSrc = (index: number) => {
    const frameNum = String(index + 1).padStart(3, "0");
    return `/images/auto/ezgif-frame-${frameNum}.png`;
  };

  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = framesRef.current[index];
    if (img && img.complete && img.naturalWidth > 0) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
  };

  // Preload all sequential signature frames to guarantee flicker-free scrolling
  useEffect(() => {
    let isMounted = true;
    const images: HTMLImageElement[] = [];

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameSrc(i);
      if ("decode" in img) {
        img.decode().catch(() => {});
      }
      img.onload = () => {
        if (!isMounted) return;
        if (currentFrameRef.current === i) {
          renderFrame(i);
        }
      };
      images.push(img);
    }
    framesRef.current = images;

    renderFrame(currentFrameRef.current);

    return () => {
      isMounted = false;
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Scroll-scrubbed signature animation mapped to start forming when visible
  useEffect(() => {
    const updateFrame = (progress: number) => {
      const START_SCROLL = 0.22;
      const END_SCROLL = 0.95;

      let norm = 0;
      if (progress > START_SCROLL) {
        norm = Math.min(1, (progress - START_SCROLL) / (END_SCROLL - START_SCROLL));
      }

      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.floor(norm * TOTAL_FRAMES))
      );
      currentFrameRef.current = frameIndex;

      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
      rafIdRef.current = requestAnimationFrame(() => {
        rafIdRef.current = null;
        renderFrame(currentFrameRef.current);
      });
    };

    updateFrame(scrollYProgress.get());

    const unsubscribe = scrollYProgress.on("change", (latest) => {
      updateFrame(latest);
    });

    return () => {
      unsubscribe();
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [scrollYProgress]);

  // Parallax animation transforms
  // IMPORTANT: All input ranges span [0 → 1] so useTransform never extrapolates.
  // Values plateau (stay constant) after reaching their target.

  // 1. Hero card scaling: 1.0 → 0.5 during first 45% of scroll, then stays at 0.5
  const heroScale = useTransform(
    scrollYProgress,
    [0, 0.45, 1],
    [1, 0.5, 0.5]
  );
  const heroRadius = useTransform(
    scrollYProgress,
    [0, 0.02, 0.4, 1],
    ["0px", "0px", "24px", "24px"]
  );

  // 2. Dark background layer fades in and STAYS at opacity 1 forever
  const darkBgOpacity = useTransform(
    scrollYProgress,
    [0, 0.02, 0.25, 1],
    [0, 0, 1, 1]
  );

  // 3. Marquee text & badge: fade in, then STAY at opacity 1 forever
  const elementsOpacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.25, 1],
    [0, 0, 1, 1]
  );

  // 4. Signature opacity on landed card: fade in as card lands, stay visible
  const signatureOpacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.25, 1],
    [0, 0, 1, 1]
  );

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>
      <motion.div 
        className="bg-[#0B0408] min-h-screen"
      >
        {/* Section 1 & 2: Hero Parallax Zoom-Out into Kinetic Marquee Container */}
      <div ref={containerRef} className="relative bg-[#0B0408] min-h-[350vh]">
        {/* Sticky viewport frame: Ensures full screen hero on page load */}
        <div className="sticky top-0 h-screen w-screen overflow-hidden flex items-center justify-center isolate bg-[#0B0408]">
          
          {/* Background layer for Section 2 */}
          <motion.div
            style={{ opacity: darkBgOpacity }}
            className="absolute inset-0 z-0 bg-[#0B0408] pointer-events-none overflow-hidden"
          >
            <div className="absolute inset-0">
              <Topography
                lowColor="#ffffff"
                midColor="#fffcfc"
                highColor="#FFFFFF"
                speed={0.35}
                morphAmount={3.0}
                morphSpeed={0.03}
                bands={1}
                thickness={0.006}
                scale={2.05}
                pixelSize={1.0}
                glow={0.05}
                colorMode="elevation"
                contrast={3.0}
                brightness={1.0}
                fillBands={false}
                opacity={0.05}
                grain={true}
                grainIntensity={0.05}
                mouseInteraction={false}
                mouseRadius={0.3}
                mouseStrength={0.4}
              />
            </div>
          </motion.div>

          {/* Scrolling Velocity Marquee layer (Positioned BEHIND the image card - stays 100% visible) */}
          <motion.div
            style={{ opacity: elementsOpacity }}
            className="absolute inset-0 z-10 flex flex-col justify-center gap-8 pointer-events-none select-none"
          >
            <ScrollVelocity
              texts={[
                {
                  text: "DID IT AT HOME MONACO VICTORY CHARLES LECLERC ",
                  className: "text-[#9F040E] font-sans uppercase text-5xl md:text-8xl tracking-tight"
                },
                {
                  text: "NEVER GIVE UP SCUDERIA FERRARI DRIVER 16 ",
                  className: "text-[#7A7873] font-serif uppercase text-5xl md:text-8xl tracking-tight"
                }
              ]}
              velocity={45}
              numCopies={12}
            />
          </motion.div>

          {/* Center Container holding the Parallax Hero Image Card */}
          <div className="relative z-20 flex flex-col items-center justify-center w-full h-full">
            
            {/* Badge / Header label above the landed portrait */}
            <motion.div
              style={{ opacity: elementsOpacity }}
              className="absolute top-[10vh] sm:top-[12vh] flex flex-col items-center gap-1 z-30 pointer-events-none"
            >
              <div className="w-8 h-8 rounded-full border border-[#E10600] flex items-center justify-center bg-[#0B0408]">
                <span className="text-[#E10600] font-bold text-xs">16</span>
              </div>
              <span className="text-xs uppercase tracking-widest text-[#F4F1E8]/70 font-mono">
                MESSAGE FROM LECLERC
              </span>
            </motion.div>

            {/* Hero Portrait Container (Starts 100% full screen, zooms out into 16:9 card) */}
            <motion.div
              style={{
                scale: heroScale,
                borderRadius: heroRadius,
              }}
              className="relative w-full h-full overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.9)] origin-center"
            >
              <video 
                src="/images/H1.mp4" 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-full object-cover" 
              />

              {/* Decorative Top-Left Line */}
              <motion.div 
                initial={{ y: "-100%", opacity: 0 }}
                animate={!isLoading ? { y: 0, opacity: 1 } : { y: "-100%", opacity: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                className="absolute top-0 left-6 sm:left-12 z-40 w-[24px] sm:w-[32px] h-[22%] sm:h-[25%] bg-[#F4F1E8] flex justify-center drop-shadow-md overflow-hidden"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 24px))' }}
              >
                <div className="w-[2px] h-full bg-[#8B0000]"></div>
              </motion.div>

              {/* Charles Leclerc Name Overlay */}
              <div className="absolute top-[26%] sm:top-[29%] left-14 sm:left-24 z-40 flex flex-col items-start pointer-events-none drop-shadow-2xl">
                <span className="font-sans text-3xl sm:text-5xl md:text-[4rem] text-[#F4F1E8] tracking-tight leading-none mb-1 sm:mb-2">Charles</span>
                <FadeThrough 
                  className="font-serif text-[#F4F1E8] tracking-wide leading-[0.85] uppercase" 
                  phrases={[
                    <span key="1" className="text-6xl sm:text-8xl md:text-[7.5rem]">LECLERC</span>,
                    <span key="2" className="text-6xl sm:text-8xl md:text-[7.5rem]">F1 DRIVER</span>,
                    <span key="3" className="text-5xl sm:text-7xl md:text-[6.5rem]">NUMBER 16</span>,
                    <span key="4" className="text-6xl sm:text-8xl md:text-[7.5rem]">FERRARI</span>
                  ]} 
                />
              </div>

              {/* Decorative Bottom-Left Line */}
              <motion.div 
                initial={{ y: "100%", opacity: 0 }}
                animate={!isLoading ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                className="absolute bottom-0 left-6 sm:left-12 z-40 w-[24px] sm:w-[32px] h-[50%] sm:h-[45%] bg-[#F4F1E8] flex justify-center drop-shadow-md overflow-hidden"
                style={{ clipPath: 'polygon(0 0, 100% 24px, 100% 100%, 0 100%)' }}
              >
                <div className="w-[2px] h-full bg-[#8B0000]"></div>
              </motion.div>

            </motion.div>

            {/* Charles Leclerc Signature Frame Sequence Overlay — Layered ABOVE Hero Card (Exceeds hero frame without overflow clipping) */}
            <motion.div 
              style={{ scale: heroScale, opacity: signatureOpacity }}
              className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none"
            >
              <div className="w-full h-full flex items-center justify-center scale-135 sm:scale-150 md:scale-165 lg:scale-175 origin-center">
                <canvas 
                  ref={canvasRef}
                  width={1280}
                  height={720}
                  className="w-full h-full object-contain filter drop-shadow-[0_0_18px_rgba(225,6,0,0.45)]" 
                />
              </div>
            </motion.div>

          </div>

        </div>
      </div>

      {/* Section 3: Bold Statement Quote */}
      <StatementQuote />

      {/* Section 4: Personal Story (Editorial Card Scroll) */}
      <PersonalStory />

      {/* Section 5 & 6: On & Off Track + Charles Fullscreen Overlap Parallax */}
      <CharlesFullscreen />

      {/* Section 7: Helmet Gallery (Hall of Fame) */}
      <HelmetGallery />

      {/* Section 8: Official Store CTA Section */}
      <StoreCTA />

      {/* Section 9: Partnerships & Campaigns Logo Loop */}
      <Partnerships />

      {/* Section 10: What's up on Social */}
      <SocialSection />

      {/* Section 11: Production-Ready Footer */}
      <Footer />
      </motion.div>
    </>
  );
}
