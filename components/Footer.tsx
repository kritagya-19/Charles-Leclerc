"use client";

import React from "react";
import Link from "next/link";
import { TextReveal } from "@/components/ui/cascade-text";

export default function Footer() {
  return (
    <footer
      className="relative w-full overflow-hidden -mt-px pt-8 sm:pt-12 md:pt-16 lg:pt-20 pb-3 sm:pb-5 select-none"
      style={{
        backgroundColor: "#F4F1E8",
        background: `
          radial-gradient(ellipse 55% 65% at 0% 65%, #E10600 0%, rgba(225, 6, 0, 0.85) 40%, transparent 85%),
          radial-gradient(ellipse 55% 65% at 100% 65%, #E10600 0%, rgba(225, 6, 0, 0.85) 40%, transparent 85%),
          radial-gradient(ellipse 85% 45% at 50% 100%, #350002 0%, #600002 40%, transparent 85%),
          linear-gradient(to bottom, #F4F1E8 0%, #F4F1E8 16%, #F4DCDC 32%, #F2A2A2 48%, #E10600 68%, #9E0000 85%, #4D0000 100%)
        `,
      }}
      aria-label="Website Footer"
    >
      {/* ── Main Footer Card Container ── */}
      <div className="w-full max-w-[1600px] mx-auto px-3 sm:px-6 md:px-8 lg:px-10">
        
        {/* Unified Sculpted Card Container */}
        <div className="relative w-full h-[600px] sm:h-[680px] md:h-[740px] lg:h-[800px] xl:h-[840px] overflow-visible select-none">

          {/* Sculpted Silhouette Card Background SVG (Top Notch + Stepped Bottom Wings) */}
          <svg
            viewBox="0 0 1440 740"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-[0_35px_30px_rgba(0,0,0,0.65)]"
            preserveAspectRatio="none"
          >
            <path
              d="M 40 36 L 530 36 C 580 36, 600 0, 650 0 L 790 0 C 840 0, 860 36, 910 36 L 1400 36 C 1422 36, 1440 54, 1440 76 L 1440 658 C 1440 676, 1426 694, 1410 694 L 1140 694 C 1090 694, 1080 740, 1030 740 L 410 740 C 360 740, 350 694, 300 694 L 30 694 C 14 694, 0 676, 0 658 L 0 76 C 0 54, 18 36, 40 36 Z"
              fill="#1C0104"
            />
          </svg>

          {/* Decorative Subtle Contour / Topographic Lines (Ferrari Red #E10600) */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30 z-0">
            <svg
              className="w-full h-full object-cover"
              viewBox="0 0 1440 740"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M -100 140 C 220 60, 420 300, 720 200 C 1020 100, 1220 340, 1540 260"
                stroke="#E10600"
                strokeWidth="1.2"
                opacity="0.35"
              />
              <path
                d="M -100 260 C 280 160, 480 420, 800 320 C 1120 220, 1300 460, 1540 400"
                stroke="#E10600"
                strokeWidth="0.9"
                opacity="0.30"
              />
              <path
                d="M -100 420 C 200 300, 460 560, 840 460 C 1220 360, 1380 600, 1540 540"
                stroke="#E10600"
                strokeWidth="1.1"
                opacity="0.35"
              />
              <path
                d="M -100 600 C 260 480, 540 720, 880 620 C 1220 520, 1420 700, 1540 660"
                stroke="#E10600"
                strokeWidth="0.8"
                opacity="0.25"
              />
              <path
                d="M 100 460 C 50 380, 160 240, 260 300 C 360 360, 310 540, 190 560 C 130 570, 70 520, 100 460 Z"
                stroke="#E10600"
                strokeWidth="1.0"
                opacity="0.30"
              />
              <path
                d="M 1340 460 C 1390 380, 1280 240, 1180 300 C 1080 360, 1130 540, 1250 560 C 1310 570, 1370 520, 1340 460 Z"
                stroke="#E10600"
                strokeWidth="1.0"
                opacity="0.30"
              />
              <path
                d="M 460 170 C 410 110, 550 90, 590 150 C 630 210, 490 240, 460 170 Z"
                stroke="#E10600"
                strokeWidth="1.3"
                opacity="0.45"
              />
              <path
                d="M 980 450 C 930 390, 1070 370, 1110 440 C 1140 510, 1010 520, 980 450 Z"
                stroke="#E10600"
                strokeWidth="1.3"
                opacity="0.45"
              />
            </svg>
          </div>

          {/* ── Top Area: Charles Signature & Headline Statement ── */}
          <div className="relative z-10 pt-0 sm:pt-1 md:pt-2 px-4 flex flex-col items-center justify-center text-center">
            
            {/* Signature Graphic nestled directly inside the raised arch */}
            <div className="-mb-2 sm:-mb-3 md:-mb-4 transform -rotate-1 hover:rotate-0 transition-transform duration-500 z-30 pointer-events-auto">
              <img
                src="/images/auto/ezgif-frame-089.webp"
                alt="Charles Leclerc Signature"
                className="w-48 sm:w-56 md:w-64 lg:w-72 h-auto object-contain filter drop-shadow-[0_0_15px_rgba(225,6,0,0.7)]"
              />
            </div>

            {/* Headline Statement: 2 lines matching Ferrari Red Hero Banner */}
            <div className="flex flex-col items-center justify-center select-none tracking-tight z-20">
              
              {/* Line 1: ALWAYS (White) + BRINGING (Ferrari Red) */}
              <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 leading-[0.88]">
                <span className="font-sans font-black uppercase text-2xl sm:text-4xl md:text-5xl lg:text-[4rem] xl:text-[4.6rem] text-white tracking-tighter drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
                  ALWAYS
                </span>
                <span className="font-sans font-black uppercase text-2xl sm:text-4xl md:text-5xl lg:text-[4rem] xl:text-[4.6rem] text-[#FF1824] tracking-tighter drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
                  BRINGING
                </span>
              </div>

              {/* Line 2: THE (White) + FIGHT. (Ferrari Red + White Period) */}
              <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-5 leading-[0.88] mt-1 sm:mt-1.5">
                <span className="font-sans font-black uppercase text-2xl sm:text-4xl md:text-5xl lg:text-[4rem] xl:text-[4.6rem] text-white tracking-tighter drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
                  THE
                </span>
                <div className="inline-flex items-baseline">
                  <span className="font-sans font-black uppercase text-2xl sm:text-4xl md:text-5xl lg:text-[4rem] xl:text-[4.6rem] text-[#FF1824] tracking-tighter drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
                    FIGHT
                  </span>
                  <span className="font-sans font-black text-2xl sm:text-4xl md:text-5xl lg:text-[4rem] xl:text-[4.6rem] text-white">
                    .
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* ── Left Column: PAGES Navigation ── */}
          <div className="absolute left-3 sm:left-6 md:left-10 lg:left-14 top-[48%] -translate-y-1/2 z-30 pointer-events-auto flex flex-col items-center text-center w-[100px] sm:w-[140px] md:w-[180px] lg:w-[220px]">
            <span className="text-[9px] sm:text-[10px] md:text-xs font-sans font-bold uppercase tracking-[0.25em] text-[#C8B8B8] mb-2 sm:mb-2.5 md:mb-3">
              PAGES
            </span>
            <nav className="flex flex-col gap-1.5 sm:gap-2 md:gap-2.5 items-center">
              {[
                { name: "HOME", href: "#hero" },
                { name: "ON TRACK", href: "#on-off-track" },
                { name: "OFF TRACK", href: "#on-off-track" },
                { name: "CALENDAR", href: "#helmet-gallery" },
              ].map((item) => (
                <TextReveal
                  key={item.name}
                  as={Link}
                  href={item.href}
                  text={item.name}
                  color="white"
                  hoverColor="#E10600"
                  fontSize="inherit"
                  style={{ padding: 0 }}
                  className="font-sans font-black text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl tracking-tight uppercase leading-snug drop-shadow-sm"
                />
              ))}
            </nav>
            <TextReveal
              as={Link}
              href="#store"
              text="STORE"
              color="#FF1824"
              hoverColor="#FF3832"
              fontSize="inherit"
              style={{ padding: 0 }}
              className="mt-2.5 sm:mt-3 md:mt-4 font-sans font-black text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl tracking-tight uppercase drop-shadow-sm"
            />
          </div>

          {/* ── Right Column: FOLLOW ON Navigation ── */}
          <div className="absolute right-3 sm:right-6 md:right-10 lg:right-14 top-[48%] -translate-y-1/2 z-30 pointer-events-auto flex flex-col items-center text-center w-[100px] sm:w-[140px] md:w-[180px] lg:w-[220px]">
            <span className="text-[9px] sm:text-[10px] md:text-xs font-sans font-bold uppercase tracking-[0.25em] text-[#C8B8B8] mb-2 sm:mb-2.5 md:mb-3">
              FOLLOW ON
            </span>
            <div className="flex flex-col gap-1.5 sm:gap-2 md:gap-2.5 items-center">
              {[
                { name: "TIKTOK", href: "https://www.tiktok.com/@charlesleclerc" },
                { name: "INSTAGRAM", href: "https://www.instagram.com/charles_leclerc/" },
                { name: "YOUTUBE", href: "https://www.youtube.com" },
                { name: "TWITCH", href: "https://www.twitch.tv/charlesleclerc" },
              ].map((social) => (
                <TextReveal
                  key={social.name}
                  as={Link}
                  href={social.href}
                  target="_blank"
                  text={social.name}
                  color="white"
                  hoverColor="#E10600"
                  fontSize="inherit"
                  style={{ padding: 0 }}
                  className="font-sans font-black text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl tracking-tight uppercase leading-snug drop-shadow-sm"
                />
              ))}
            </div>
          </div>

          {/* ── Partnership Logo Loop (Marquee - runs across at button baseline behind Charles) ── */}
          <div className="absolute left-0 right-0 bottom-12 sm:bottom-16 md:bottom-20 lg:bottom-24 z-10 overflow-hidden pointer-events-auto flex items-center">
            <style>
              {`
                @keyframes marquee {
                  0% { transform: translateX(0%); }
                  100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                  display: flex;
                  width: max-content;
                  animation: marquee 30s linear infinite;
                }
                .animate-marquee:hover {
                  animation-play-state: paused;
                }
              `}
            </style>
            
            {/* The fading edges for the marquee */}
            <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#1C0104] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#1C0104] to-transparent z-10 pointer-events-none" />

            <div className="animate-marquee flex items-center gap-10 sm:gap-14 md:gap-20 px-6">
              {[...Array(2)].map((_, i) => (
                <React.Fragment key={i}>
                  {[
                    "PUMA", "APM MONACO", "EIGHT SLEEP", "RICHARD MILLE",
                    "RIVA", "VISTAJET", "FERRARI", "GIORGIO ARMANI",
                    "BANG & OLUFSEN", "BELL RACING", "EA SPORTS", "CHIVAS REGAL"
                  ].map((sponsor, idx) => (
                    <span 
                      key={`${i}-${idx}`} 
                      className="whitespace-nowrap font-sans font-black text-[11px] sm:text-xs md:text-sm lg:text-base tracking-widest text-[#C8B8B8] hover:text-white transition-colors cursor-pointer select-none drop-shadow-md"
                    >
                      {sponsor}
                    </span>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* ── Layer 1: Character (Charles Leclerc) - Waist touches the ending of footer card ── */}
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-10 sm:-bottom-14 md:-bottom-16 lg:-bottom-20 xl:-bottom-24 h-[520px] sm:h-[590px] md:h-[640px] lg:h-[700px] xl:h-[730px] pointer-events-none z-20 flex items-end justify-center">
            <img
              src="/images/charles_footer-Photoroom.png"
              alt="Charles Leclerc in Ferrari Racing Suit and Helmet"
              draggable={false}
              className="h-full w-auto max-w-none object-contain select-none pointer-events-none filter drop-shadow-[0_15px_35px_rgba(0,0,0,0.9)]"
            />
          </div>

          {/* ── Layer 2: Business Enquiries Button (Directly ON TOP of character) ── */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-5 sm:bottom-6 md:bottom-7 lg:bottom-8 z-30 pointer-events-auto">
            <Link
              href="#store"
              className="group inline-flex items-center gap-1.5 sm:gap-2 px-5 sm:px-7 md:px-8 py-2 sm:py-2.5 rounded-xl bg-[#E10600] hover:bg-[#FF261E] text-white font-sans font-black text-[10px] sm:text-xs md:text-sm tracking-wider uppercase shadow-[0_8px_30px_rgba(225,6,0,0.7)] hover:shadow-[0_12px_40px_rgba(225,6,0,0.9)] hover:scale-105 active:scale-95 transition-all duration-300 border border-white/25"
            >
              <span>BUSINESS ENQUIRIES</span>
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </Link>
          </div>

          {/* ── Bottom-Left Copyright: Sitting cleanly on the red shelf cutout ── */}
          <div className="absolute bottom-1 sm:bottom-1.5 md:bottom-2 left-3 sm:left-5 md:left-8 lg:left-10 z-20 pointer-events-auto">
            <span className="text-[9px] sm:text-[10px] md:text-xs font-sans font-bold text-white tracking-tight drop-shadow-sm">
              &copy; {new Date().getFullYear()} Charles Leclerc. All rights reserved
            </span>
          </div>

          {/* ── Bottom-Right Legal Links: Sitting cleanly on the red shelf cutout ── */}
          <div className="absolute bottom-1 sm:bottom-1.5 md:bottom-2 right-3 sm:right-5 md:right-8 lg:right-10 flex items-center gap-4 sm:gap-6 text-[9px] sm:text-[10px] md:text-xs font-sans font-black uppercase text-white z-20 pointer-events-auto drop-shadow-sm tracking-wider">
            <Link href="#hero" className="hover:text-white/80 transition-colors">
              PRIVACY POLICY
            </Link>
            <Link href="#hero" className="hover:text-white/80 transition-colors">
              TERMS
            </Link>
          </div>

        </div>

      </div>
    </footer>
  );
}

