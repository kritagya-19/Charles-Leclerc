"use client";

import React, { useEffect, useState } from "react";
import Topography from "@/components/Topography";

/**
 * Fixed full-viewport Topography background that sits behind ALL page content.
 * Rendered once in the root layout — provides a single continuous, seamless background
 * with zero section boundaries, seams, or cuts.
 * 
 * Supports smooth crossfade between Dark Mode (white/silver contours on #0B0408)
 * and Light Mode (charcoal/dark contours on #F4F1E8).
 */
export default function GlobalTopography() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const handleScroll = () => {
      const personalStoryEl = document.getElementById("personal-story-section");
      const onOffTrackEl = document.getElementById("on-off-track");
      const helmetGalleryEl = document.getElementById("helmet-gallery");

      if (personalStoryEl) {
        const pRect = personalStoryEl.getBoundingClientRect();
        // Personal story begins dark, then turns light as cards pan horizontally
        if (pRect.top <= -window.innerHeight * 0.35 && pRect.bottom > 0) {
          setTheme("light");
          return;
        }
      }

      if (onOffTrackEl) {
        const oRect = onOffTrackEl.getBoundingClientRect();
        if (oRect.top <= window.innerHeight && oRect.bottom > 0) {
          setTheme("light");
          return;
        }
      }

      if (helmetGalleryEl) {
        const hRect = helmetGalleryEl.getBoundingClientRect();
        if (hRect.top <= 0 && hRect.bottom > 0) {
          setTheme("dark");
          return;
        }
      }

      // Default back to dark for Hero, StatementQuote, and start of PersonalStory
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const personalStoryTop = personalStoryEl ? personalStoryEl.offsetTop : 3000;
      if (scrollY < personalStoryTop + window.innerHeight * 0.5) {
        setTheme("dark");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 w-screen h-screen pointer-events-none select-none z-0 overflow-hidden transition-colors duration-1000 ease-out"
      style={{
        backgroundColor: theme === "dark" ? "#0B0408" : "#F4F1E8",
      }}
    >
      {/* Dark Theme Canvas (White/Silver lines) */}
      <div
        className="absolute inset-0 transition-opacity duration-1000 ease-out"
        style={{ opacity: theme === "dark" ? 1 : 0 }}
      >
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
          opacity={0.07}
          grain={true}
          grainIntensity={0.05}
          mouseInteraction={false}
        />
      </div>

      {/* Light Theme Canvas (Charcoal/Dark lines) */}
      <div
        className="absolute inset-0 transition-opacity duration-1000 ease-out"
        style={{ opacity: theme === "light" ? 1 : 0 }}
      >
        <Topography
          lowColor="#414141ff"
          midColor="#262325"
          highColor="#4a494aff"
          speed={0.35}
          morphAmount={3.0}
          morphSpeed={0.03}
          bands={1}
          thickness={0.002}
          scale={2.05}
          pixelSize={1.0}
          glow={0.02}
          colorMode="elevation"
          contrast={3.0}
          brightness={1.0}
          fillBands={false}
          opacity={0.24}
          grain={true}
          grainIntensity={0.04}
          mouseInteraction={false}
        />
      </div>
    </div>
  );
}
