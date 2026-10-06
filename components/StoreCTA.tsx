"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";



export default function StoreCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Scroll scrubbing for entrance animation matching reference recording
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  // Main oversized image enters smoothly from the right as user scrolls into section
  const mainImageX = useTransform(scrollYProgress, [0, 1], [90, 0]);
  const mainImageOpacity = useTransform(scrollYProgress, [0, 0.4], [0.6, 1]);

  const handleStoreClick = () => {
    window.open("https://store.ferrari.com/en-it/sports-lifestyle/racing/charles-leclerc", "_blank");
  };

  return (
    <section
      id="store"
      ref={sectionRef}
      className="relative w-full bg-[#F4F1E8] text-[#0D0D0D] overflow-hidden select-none"
    >
      {/* 1. SECTION TRANSITION: Curved black visor boundary coming down from Helmet Gallery */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-px pointer-events-none z-10 overflow-hidden leading-none"
        style={{ height: "clamp(90px, 10vw, 150px)" }}
      >
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          preserveAspectRatio="none"
          className="w-full h-full block"
        >
          <path
            d="M0,0 L1440,0 L1440,25 Q720,120 0,25 Z"
            fill="#0B0408"
          />
        </svg>
      </div>

      {/* 2. BACKGROUND: Clean solid background */}

      {/* 3. MAIN STORE SECTION CONTENT CONTAINER - generous breathing room below curved transition */}
      <div
        className="relative z-20 w-full max-w-[94rem] mx-auto px-6 sm:px-10 md:px-14 lg:px-20 xl:px-24"
        style={{
          paddingTop: "clamp(130px, 14vw, 190px)",
          paddingBottom: "clamp(80px, 8vw, 110px)",
        }}
      >
        
        {/* Editorial 2-Column Composition matching reference grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* ======================================================== */}
          {/* LEFT SIDE: Store Content Block (spans 6 cols on desktop) */}
          {/* ======================================================== */}
          <div className="lg:col-span-6 flex flex-col items-start relative z-30 lg:pr-6 mt-20 sm:mt-28 lg:mt-40 xl:mt-48">
            
            {/* 1. Small Store Label with Shopping Bag Icon */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-2.5 mb-4 text-[#0D0D0D]"
            >
              <div className="w-4 h-4 flex items-center justify-center text-[#E10600]">
                <svg
                  width="17"
                  height="18"
                  viewBox="0 0 17 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full text-current"
                >
                  <path
                    d="m10.931 5.783-.759.812c-1.132 1.212-2.89 1.212-4.022 0l-.76-.812C4.313 4.637 2.568 5.29 2.275 6.928l-1.238 7.18c-.227 1.318.652 2.543 1.838 2.543h10.588c1.185 0 2.064-1.225 1.838-2.544l-1.239-7.179c-.28-1.638-2.037-2.29-3.116-1.145h-.014ZM10.839 3.048 9.84 1.849C8.894.717 7.43.717 6.484 1.85l-1 1.199"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeMiterlimit="10"
                  />
                </svg>
              </div>
              <span className="font-sans font-bold text-xs sm:text-sm uppercase tracking-wider text-[#0D0D0D]">
                LECLERC STORE
              </span>
            </motion.div>

            {/* 2. Large Multi-line Headline - Refined editorial scale */}
            {/* Matches reference editorial typography: Grotesque Sans for lines 1-2, Newake Font for line 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-[#0D0D0D] tracking-tighter leading-[0.88] uppercase">
                <span className="font-sans font-black text-6xl sm:text-7xl md:text-6xl lg:text-[6.5rem] xl:text-[7rem] block">
                  MONACO
                </span>
                <span className="font-sans font-black text-5xl sm:text-6xl md:text-5xl lg:text-[3.5rem] xl:text-[4rem] block">
                  VICTORY
                </span>
                <span className="font-serif italic font-normal text-5xl sm:text-6xl md:text-5xl lg:text-[3.5rem] xl:text-[4rem] tracking-tight block">
                  COLLECTION
                </span>
              </h2>
            </motion.div>

            {/* 3. Supporting Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-sans text-sm sm:text-base md:text-[1.05rem] text-[#2C2C2C] max-w-lg leading-relaxed mt-5 mb-8 font-normal"
            >
              Celebrate Charles&apos;s historic Monaco victory with the exclusive official collection designed for the Tifosi who never stopped believing. Wear it, frame it, treasure it forever.
            </motion.p>

            {/* 4. CTA Button Row */}
            {/* Cleanly aligned under the text hierarchy */}
            <div className="relative w-full flex items-center pt-2">
              
              {/* CTA Button */}
              <motion.button
                onClick={handleStoreClick}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#E10600] hover:bg-[#8B0000] text-white font-sans font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 cursor-pointer flex-shrink-0"
              >
                <span>VISIT THE STORE</span>
                <span className="text-sm font-normal">↗</span>
              </motion.button>
            </div>

          </div>


          {/* ========================================================= */}
          {/* RIGHT SIDE: Oversized Editorial Composition (6 cols)     */}
          {/* ========================================================= */}
          {/* Shifted UP to align with heading - adjust translateY to move up/down */}
          <div 
            className="lg:col-span-6 relative mt-6 lg:mt-0 flex justify-center lg:justify-end"
            style={{ transform: "translateY(clamp(-320px, -8vw, -40px))" }}
          >
            
            {/* Wrapper for the entire right-side composition */}
            <motion.div
              style={{
                x: mainImageX,
                opacity: mainImageOpacity,
              }}
              className="relative w-full max-w-[38rem] lg:max-w-[42rem]"
            >
              
              {/* PRIMARY LARGE IMAGE: Oversized hoodie model below curved transition */}
              <div className="relative w-full overflow-hidden shadow-2xl z-10 bg-[#E8E4DA] rounded-sm">
                <img
                  src="https://i.pinimg.com/736x/d4/e5/55/d4e555bc58f5b17b68a971393ad4cd5b.jpg"
                  alt="Charles Leclerc Scuderia Maranello Hoodie"
                  className="w-full aspect-[896/1200] object-cover object-[center_80%] scale-[1.01]"
                  loading="eager"
                />
              </div>

            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}
