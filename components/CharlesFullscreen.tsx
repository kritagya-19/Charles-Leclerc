"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import OnOffTrack from "./OnOffTrack";

export default function CharlesFullscreen() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Continuous 1:1 scroll-driven vertical slide:
  // Starts at 100% (below viewport) when OnOffTrack is locked,
  // reaches 0% (fully covering viewport and OnOffTrack) right at 1.0 progress
  // and smoothly transitions to scrolling the page down.
  const y = useTransform(scrollYProgress, [0, 1], ["100%", "0%"]);

  // Photo subtly de-zooms continuously as the panel lands
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1]);

  return (
    <div
      ref={containerRef}
      className="relative w-full -mt-[10vh] sm:-mt-[14vh]"
      style={{ height: "200vh" }}
    >
      {/* Sticky viewport frame that locks OnOffTrack while Charles section slides up over it */}
      <div className="sticky top-0 w-full h-screen overflow-hidden isolate bg-[#F4F1E8]">
        {/* Layer 1 (z-10): Track Off Section (Stays stationary behind) */}
        <div className="absolute inset-0 z-10 w-full h-full flex flex-col justify-center overflow-hidden">
          <OnOffTrack />
        </div>

        {/* Layer 2 (z-20): Charles Fullscreen Section (Slides up and overlaps Track Off) */}
        <motion.div
          style={{ y }}
          className="absolute inset-0 z-20 w-full h-screen overflow-hidden will-change-transform shadow-[0_-20px_60px_rgba(0,0,0,0.6)]"
          aria-label="Charles Leclerc — full-screen portrait"
        >
          {/* Photo with subtle parallax scale */}
          <motion.div
            style={{ scale }}
            className="absolute inset-0 w-full h-full origin-center will-change-transform"
          >
            <img
              src="/images/charles.jpg"
              alt="Charles Leclerc"
              draggable={false}
              className="w-full h-full object-cover object-center select-none pointer-events-none"
            />
          </motion.div>

          {/* Subtle gradient vignette — darkens edges for cinematic depth */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)",
            }}
          />

          {/* Very faint bottom fade so it blends into whatever comes next */}
          <div
            className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, transparent, rgba(13,13,13,0.7))",
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}
