"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";

export default function OnOffTrack() {
  const sectionRef = useRef<HTMLElement>(null);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Scroll-driven entrance animation tied progressively to scroll position
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
  });

  // Inertia spring smoothing for fluid, natural easing with no abrupt jumps
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  // Symmetrical scroll-driven slide-in:
  // Left image slides in progressively from -14vw to its final resting position (0vw)
  const leftX = useTransform(smoothProgress, [0, 1], ["-14vw", "0vw"]);
  // Right image slides in progressively from +14vw to its final resting position (0vw)
  const rightX = useTransform(smoothProgress, [0, 1], ["14vw", "0vw"]);

  return (
    <section 
      ref={sectionRef}
      id="on-off-track"
      className="relative w-full min-h-[85vh] sm:min-h-screen bg-transparent text-[#0D0D0D] overflow-hidden isolate select-none flex flex-col justify-center py-10 md:py-14"
    >

      {/* Left Image Cutout: CLR.png (Charles in Helmet facing Right) */}
      <motion.div 
        style={{ x: leftX }}
        className="absolute left-[-11vw] bottom-[-15vh] z-10 h-[86%] sm:h-[92%] md:h-[96%] lg:h-[100%] xl:h-[104%] pointer-events-none flex items-end justify-start select-none will-change-transform"
      >
        <img
          src="/images/CLR.png"
          alt="Charles Leclerc On Track - Ferrari Helmet"
          draggable={false}
          className="h-full w-auto max-w-[46vw] sm:max-w-[42vw] md:max-w-[38vw] lg:max-w-[36vw] object-contain object-left-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.25)]"
        />
      </motion.div>

      {/* Right Image Cutout: CLL.png (Charles in Scuderia Cap facing Left) */}
      <motion.div 
        style={{ x: rightX }}
        className="absolute right-[-9vw] bottom-[-3vh] z-10 h-[86%] sm:h-[92%] md:h-[96%] lg:h-[100%] xl:h-[104%] pointer-events-none flex items-end justify-end select-none will-change-transform"
      >
        <img
          src="/images/CLL.png"
          alt="Charles Leclerc Off Track - Red Scuderia Cap"
          draggable={false}
          className="h-full w-auto max-w-[46vw] sm:max-w-[42vw] md:max-w-[38vw] lg:max-w-[36vw] object-contain object-right-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.25)]"
        />
      </motion.div>

      {/* Center Content: ON TRACK and OFF TRACK Columns */}
      <div className="relative z-20 w-full max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-12 sm:gap-16 md:gap-14 lg:gap-20 xl:gap-28 text-center">
          
          {/* Column 1: ON TRACK */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center max-w-[340px] sm:max-w-[400px] md:max-w-[440px] group"
          >
            {/* Title Area */}
            <div className="relative flex flex-col items-center gap-0 sm:gap-0.5 md:gap-1 select-none">

              {/* Top Row: ON (Serif) */}
              <h3 className="text-7xl sm:text-8xl md:text-9xl lg:text-[7.5rem] xl:text-[8.5rem] font-serif font-normal text-[#0D0D0D] leading-[0.88] tracking-tight">
                ON
              </h3>

              {/* Bottom Row: TRACK (Heavy Sans-Serif) */}
              <h4 className="text-6xl sm:text-7xl md:text-8xl lg:text-[6.5rem] xl:text-[7.5rem] font-sans font-black text-[#0D0D0D] leading-[0.88] tracking-tighter uppercase">
                TRACK
              </h4>
            </div>

            {/* Subtext Description */}
            <p className="text-sm sm:text-base md:text-lg font-sans font-medium text-[#2C2C2C] leading-relaxed mt-6 sm:mt-8 md:mt-10 px-2 max-w-[260px] sm:max-w-[290px] md:max-w-[320px]">
              Most recent results, career stats and photos from trackside.
            </p>

            {/* Arrow Button */}
            <motion.button
              whileHover={{ scale: 1.08, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection("helmet-gallery")}
              className="mt-6 sm:mt-8 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#E10600] hover:bg-[#c40500] text-[#FFFFFF] flex items-center justify-center shadow-[0_8px_20px_rgba(225,6,0,0.3)] transition-all cursor-pointer"
              aria-label="View On Track Stats and Photos"
            >
              <svg 
                className="w-6 h-6 transform transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M9 7v6a4 4 0 0 0 4 4h7" />
                <path d="M16 13l4 4-4 4" />
              </svg>
            </motion.button>
          </motion.div>

          {/* Column 2: OFF TRACK */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center max-w-[340px] sm:max-w-[400px] md:max-w-[440px] group"
          >
            {/* Title Area */}
            <div className="relative flex flex-col items-center gap-0 sm:gap-0.5 md:gap-1 select-none">
              {/* Top Row: OFF (Serif) */}
              <h3 className="text-7xl sm:text-8xl md:text-9xl lg:text-[7.5rem] xl:text-[8.5rem] font-serif font-normal text-[#0D0D0D] leading-[0.88] tracking-tight">
                OFF
              </h3>

              {/* Bottom Row: TRACK (Heavy Sans-Serif) */}
              <h4 className="text-6xl sm:text-7xl md:text-8xl lg:text-[6.5rem] xl:text-[7.5rem] font-sans font-black text-[#0D0D0D] leading-[0.88] tracking-tighter uppercase">
                TRACK
              </h4>
            </div>

            {/* Subtext Description */}
            <p className="text-sm sm:text-base md:text-lg font-sans font-medium text-[#2C2C2C] leading-relaxed mt-6 sm:mt-8 md:mt-10 px-2 max-w-[260px] sm:max-w-[290px] md:max-w-[320px]">
              Campaigns, shoots and other such promotional materials for fans
            </p>

            {/* Arrow Button */}
            <motion.button
              whileHover={{ scale: 1.08, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection("store")}
              className="mt-6 sm:mt-8 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#E10600] hover:bg-[#c40500] text-[#FFFFFF] flex items-center justify-center shadow-[0_8px_20px_rgba(225,6,0,0.3)] transition-all cursor-pointer"
              aria-label="View Off Track Campaigns and Shoots"
            >
              <svg 
                className="w-6 h-6 transform transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M9 7v6a4 4 0 0 0 4 4h7" />
                <path d="M16 13l4 4-4 4" />
              </svg>
            </motion.button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

