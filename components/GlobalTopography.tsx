"use client";

import Topography from "@/components/Topography";

/**
 * Fixed full-viewport Topography background that sits behind ALL page content.
 * Rendered once in the root layout — no per-section instances needed.
 * 
 * Uses pointer-events: none so it never blocks interaction with page elements.
 * The WebGL canvas auto-pauses when the tab is hidden (IntersectionObserver + visibilitychange).
 */
export default function GlobalTopography() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 w-screen h-screen pointer-events-none select-none"
      style={{ zIndex: 0 }}
    >
      <Topography
        lowColor="#ffffff"
        midColor="#ffffff"
        highColor="#FFFFFF"
        speed={0.35}
        morphAmount={3.0}
        morphSpeed={0.03}
        bands={1}
        thickness={0.006}
        scale={1.9}
        pixelSize={1.0}
        glow={0.05}
        colorMode="elevation"
        contrast={3.0}
        brightness={0.55}
        fillBands={false}
        opacity={0.3}
        grain={true}
        grainIntensity={0.06}
        mouseInteraction={false}
        mouseRadius={0.3}
        mouseStrength={0.4}
      />
    </div>
  );
}
