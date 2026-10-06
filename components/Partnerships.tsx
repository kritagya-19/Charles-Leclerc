"use client";

import React from "react";
import LogoLoop, { LogoItem } from "@/components/ui/LogoLoop";

// Custom styled vector partner brand logos for Charles Leclerc & Scuderia Ferrari
const PARTNER_LOGOS: LogoItem[] = [
  {
    src: "/images/logo/cdnlogo.com_bang-olufsen-logo.png",
    alt: "Bang & Olufsen",
    title: "Bang & Olufsen",
    href: "#",
    style: { transform: "scale(0.7)" },
  },
  {
    src: "/images/logo/cdnlogo.com_chivas-regal-logo.png",
    alt: "Chivas Regal",
    title: "Chivas Regal",
    href: "#",
    style: { transform: "scale(0.7)" },
  },
  {
    src: "/images/logo/[CITYPNG.COM]HD Ferrari Black Logo Transparent PNG - 2000x2000.png",
    alt: "Ferrari",
    title: "Ferrari",
    href: "#",
    style: { transform: "scale(1.85)", maxHeight: "100px" },
  },
  {
    src: "/images/logo/Puma-logo-sports-brand-emblem-footwear-sportswear-transparent-PNG-image.png",
    alt: "Puma",
    title: "Puma",
    href: "#",
    style: { transform: "scale(0.7)" },
  },
  {
    src: "/images/logo/pngwing.com.png",
    alt: "Partner",
    title: "Partner",
    href: "#",
    style: { transform: "scale(1.75)", maxHeight: "95px" },
  },
  {
    src: "/images/logo/8de7050dfeb4b2870d716246170d039c.png",
    alt: "Partner",
    title: "Partner",
    href: "#",
    style: { transform: "scale(0.7)" },
  },
  {
    src: "/images/logo/dde22d6b7deae074dfe3e903fa610775.png",
    alt: "Partner",
    title: "Partner",
    href: "#",
    style: { transform: "scale(1.65)", maxHeight: "90px" },
  }
];

export default function Partnerships() {
  return (
    <section className="relative bg-[#F4F1E8] text-[#0D0D0D] pt-16 md:pt-24 pb-32 md:pb-48 lg:pb-60 px-6 md:px-12 lg:px-20 overflow-hidden">

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Row: Left Heading, Right Description (matching user layout) */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
          {/* Left Side: Heading */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E10600]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#2C2C2C]">
                GLOBAL PORTFOLIO & BRANDS
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-[#0D0D0D] leading-none">
              PARTNERSHIPS
            </h2>
            <p className="text-2xl sm:text-4xl md:text-5xl font-serif text-[#E10600] tracking-wide mt-1 uppercase">
              & CAMPAIGNS
            </p>
          </div>

          {/* Right Side: Description */}
          <div className="max-w-md">
            <p className="text-sm md:text-base text-[#2C2C2C] leading-relaxed font-sans">
              Driven by relentless precision, luxury aesthetics, and world-class racing performance. Charles Leclerc partners with iconic luxury, haute horlogerie, and technology leaders globally.
            </p>
          </div>
        </div>
      </div>

      {/* Logo Loop Section (True 100% Full Viewport Screen Width from Left to Right Edge) */}
      <div className="relative py-6 -mx-6 md:-mx-12 lg:-mx-20 w-[calc(100%+3rem)] md:w-[calc(100%+6rem)] lg:w-[calc(100%+10rem)]">
        <LogoLoop
          logos={PARTNER_LOGOS}
          speed={75}
          direction="right"
          logoHeight={60}
          gap={98}
          hoverSpeed={0}
          scaleOnHover
          fadeOut
          fadeOutColor="#F4F1E8"
          ariaLabel="Charles Leclerc Global Partners"
        />
      </div>
    </section>
  );
}
