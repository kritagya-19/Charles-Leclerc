"use client";

import React from "react";
import Topography from "@/components/Topography";
import TextBlockAnimation from "@/components/ui/text-block-animation";

export default function StatementQuote() {
  return (
    <section className="relative min-h-screen w-full bg-[#0B0408] text-[#F4F1E8] flex flex-col justify-center items-center px-6 py-24 md:py-36 overflow-hidden isolate">
      {/* WebGL Topography contour background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
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

      {/* Main Quote Container */}
      <div className="relative z-10 w-full max-w-[95vw] lg:max-w-screen-2xl mx-auto text-center flex flex-col justify-center items-center gap-2 md:gap-4 select-none">
        <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-serif uppercase leading-[1.1] tracking-tight">
          <TextBlockAnimation
            blockColor="#cf4740ff"
            stagger={0.12}
            duration={0.65}
            animateOnScroll={true}
          >
            {/* Line 1 */}
            <div className="py-1 lg:py-2">
              <div className="flex justify-center items-center flex-wrap">
                <span className="font-sans font-bold text-[#E10600] mr-4 sm:mr-6">REDEFINING</span>
                <span>LIMITS,</span>
              </div>
            </div>

            {/* Line 2 */}
            <div className="py-1 lg:py-2">
              <div className="flex justify-center items-center flex-wrap">
                <span>FIGHTING FOR </span>
                <span className="font-sans font-bold text-[#E10600] ml-3 sm:ml-5">WINS,</span>
              </div>
            </div>

            {/* Line 3 */}
            <div className="py-1 lg:py-2">
              <div className="flex justify-center items-center flex-wrap">
                <span>BRINGING IT ALL IN</span>
              </div>
            </div>

            {/* Line 4 */}
            <div className="py-1 lg:py-2">
              <div className="flex justify-center items-center flex-wrap">
                <span>ALL WAYS. DEFINING A</span>
              </div>
            </div>

            {/* Line 5 */}
            <div className="py-1 lg:py-2">
              <div className="flex justify-center items-center flex-wrap">
                <span className="font-sans font-bold text-[#E10600] mr-4 sm:mr-6">LEGACY</span>
                <span>IN FORMULA 1</span>
              </div>
            </div>

            {/* Line 6 */}
            <div className="py-1 lg:py-2">
              <div className="flex justify-center items-center flex-wrap">
                <span>ON AND OFF THE TRACK.</span>
              </div>
            </div>
          </TextBlockAnimation>
        </h2>
      </div>
    </section>
  );
}
