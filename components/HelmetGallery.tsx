"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface HelmetData {
  id: string;
  name: string;
  year: string;
  subtitle: string;
  description: string;
  primaryColor: string;
  accentColor: string;
  visorColor: string;
  pattern: "monaco" | "giallo" | "azzurro" | "carbon" | "burgundy" | "classic" | "gold" | "white";
  circuit?: string;
  image?: string;
  hoverImage?: string;
}

const HELMETS: HelmetData[] = [
  {
    id: "monaco-2024",
    name: "Monaco GP",
    year: "2024",
    subtitle: "Home Victory Edition",
    description: "Worn during Charles' historic home victory at the 2024 Monaco Grand Prix. Features the Monegasque red and white diagonal sash with gold leaf laurels.",
    primaryColor: "#FFFFFF",
    accentColor: "#E10600",
    visorColor: "#1A1A1A",
    pattern: "monaco",
    circuit: "Circuit de Monaco",
    image: "/images/HE1.png",
    hoverImage: "/images/1.jpg"
  },
  {
    id: "season-2025",
    name: "Season",
    year: "2025",
    subtitle: "Scuderia Carbon Red",
    description: "The official 2025 Scuderia Ferrari race helmet. Blends exposed matte carbon weave with vibrant Scuderia Red and integrated aerodynamic vents.",
    primaryColor: "#0D0D0D",
    accentColor: "#E10600",
    visorColor: "#E10600",
    pattern: "carbon",
    circuit: "World Championship",
    image: "/images/HE3.png",
    hoverImage: "/images/2.jpg"
  },
  {
    id: "monza-2024",
    name: "Monza Special",
    year: "2024",
    subtitle: "Giallo Modena Carbon",
    description: "Created for the Italian Grand Prix at Monza. Showcases Giallo Modena yellow combined with raw carbon fiber, celebrating Ferrari's racing DNA.",
    primaryColor: "#F4C430",
    accentColor: "#0D0D0D",
    visorColor: "#222222",
    pattern: "giallo",
    circuit: "Autodromo Nazionale Monza",
    image: "/images/HE2.png",
    hoverImage: "/images/3.jpg"
  },
  {
    id: "miami-2024",
    name: "Miami GP",
    year: "2024",
    subtitle: "Azzurro La Plata",
    description: "Inspired by Ferrari's historic American racing colors. Features Azzurro La Plata and Azzurro Dino light blue tones with vintage numbering.",
    primaryColor: "#7BB3D9",
    accentColor: "#003366",
    visorColor: "#002B49",
    pattern: "azzurro",
    circuit: "Miami International Autodrome",
    image: "/images/HE8.png",
    hoverImage: "/images/4.jpg"
  },
  {
    id: "jules-2024",
    name: "Jules Tribute",
    year: "2024",
    subtitle: "Honor #17 Bianchi",
    description: "A heartfelt 10th anniversary tribute to godfather Jules Bianchi. Incorporates Jules' #17 helmet design combined with Charles' #16.",
    primaryColor: "#E10600",
    accentColor: "#FFFFFF",
    visorColor: "#121212",
    pattern: "classic",
    circuit: "Japanese Grand Prix",
    image: "/images/HE5.png",
    hoverImage: "/images/5.jpg"
  },
  {
    id: "vegas-2023",
    name: "Vegas GP",
    year: "2023",
    subtitle: "Metallic Gold & Red",
    description: "Designed for the inaugural Las Vegas night race. Finished in metallic crimson red with chrome gold accents and reflective star motifs.",
    primaryColor: "#B89B5E",
    accentColor: "#E10600",
    visorColor: "#FFD700",
    pattern: "gold",
    circuit: "Las Vegas Strip Circuit",
    image: "/images/HE6.png",
    hoverImage: "/images/6.jpg"
  },
  {
    id: "75years-2022",
    name: "75 Years",
    year: "2022",
    subtitle: "Giallo Heritage",
    description: "Celebrating Ferrari's 75th anniversary at Monza 2022. Painted in matte Modena yellow with historical 1947–2022 crest iconography.",
    primaryColor: "#FFD000",
    accentColor: "#111111",
    visorColor: "#1A1A1A",
    pattern: "giallo",
    circuit: "Monza Anniversary",
    image: "/images/HE7.png",
    hoverImage: "/images/7.jpg"
  },
  {
    id: "1000gp-2020",
    name: "1000th GP",
    year: "2020",
    subtitle: "Burgundy Vintage",
    description: "Commemorating Ferrari's 1000th Formula 1 World Championship race at Mugello. Finished in historic 1950s Burgundy with vintage fonts.",
    primaryColor: "#6B1D2F",
    accentColor: "#F4F1E8",
    visorColor: "#2B0B14",
    pattern: "burgundy",
    circuit: "Mugello Circuit",
    image: "/images/HE4.png",
    hoverImage: "/images/8.jpg"
  },
  {
    id: "firstwin-2019",
    name: "First Win",
    year: "2019",
    subtitle: "Spa Heritage",
    description: "The helmet Charles wore to take his maiden Formula 1 victory at Spa-Francorchamps in 2019. An emotional race dedicated to Anthoine Hubert.",
    primaryColor: "#E10600",
    accentColor: "#FFFFFF",
    visorColor: "#1A1A1A",
    pattern: "classic",
    circuit: "Spa-Francorchamps",
    image: "/images/HE9.png",
    hoverImage: "/images/9.jpg"
  }
];

// Helmet Visual Component
function HelmetGraphic({ helmet }: { helmet: HelmetData }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-2">
      {helmet.image ? (
        <img
          src={helmet.image}
          alt={helmet.name}
          className="relative z-10 w-full max-w-[280px] sm:max-w-[290px] h-auto object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)] transform group-hover:scale-105 group-hover:-translate-y-2 transition-transform duration-500 ease-out"
        />
      ) : (
        <svg
          viewBox="0 0 320 280"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full max-w-[280px] sm:max-w-[290px] h-auto drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)] transform group-hover:scale-105 group-hover:-translate-y-2 transition-transform duration-500 ease-out"
        >
        <defs>
          {/* Main Shell Gradients */}
          <linearGradient id={`shell-grad-${helmet.id}`} x1="0" y1="0" x2="320" y2="280" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={helmet.primaryColor} />
            <stop offset="60%" stopColor={helmet.primaryColor} />
            <stop offset="100%" stopColor="#0A0A0A" />
          </linearGradient>

          <linearGradient id={`visor-grad-${helmet.id}`} x1="80" y1="90" x2="260" y2="170" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={helmet.visorColor} />
            <stop offset="40%" stopColor="#2A2A2A" />
            <stop offset="70%" stopColor={helmet.visorColor} />
            <stop offset="100%" stopColor="#050505" />
          </linearGradient>

          <linearGradient id={`shine-${helmet.id}`} x1="40" y1="20" x2="200" y2="180" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>

          {/* Carbon Texture */}
          <pattern id="carbon-pattern" width="6" height="6" patternUnits="userSpaceOnUse">
            <rect width="3" height="3" fill="#1A1A1A" />
            <rect x="3" width="3" height="3" fill="#0D0D0D" />
            <rect y="3" width="3" height="3" fill="#0D0D0D" />
            <rect x="3" y="3" width="3" height="3" fill="#1A1A1A" />
          </pattern>
        </defs>

        {/* Outer Helmet Silhouette */}
        {/* Main Shell Base */}
        <path
          d="M 60 180 C 40 150 40 100 80 50 C 130 15 220 15 270 60 C 300 90 305 140 290 185 C 275 225 220 240 160 240 C 100 240 70 210 60 180 Z"
          fill={`url(#shell-grad-${helmet.id})`}
          stroke="#2A2A2A"
          strokeWidth="2"
        />

        {/* Carbon Pattern Overlay for Carbon/Season model */}
        {helmet.pattern === "carbon" && (
          <path
            d="M 60 180 C 40 150 40 100 80 50 C 130 15 220 15 270 60 C 300 90 305 140 290 185 C 275 225 220 240 160 240 C 100 240 70 210 60 180 Z"
            fill="url(#carbon-pattern)"
            opacity="0.45"
          />
        )}

        {/* Rear Aerodynamic Spoiler */}
        <path
          d="M 45 130 C 35 110 40 80 65 65 C 75 60 70 85 60 120 Z"
          fill={helmet.accentColor}
          opacity="0.9"
        />

        {/* Top Graphics / Accent Stripes */}
        {helmet.pattern === "monaco" && (
          <>
            {/* Red Diagonal Sash */}
            <path d="M 120 25 Q 180 35 240 85 L 210 105 Q 160 55 100 45 Z" fill="#E10600" />
            <path d="M 140 20 Q 200 30 260 80 L 250 90 Q 190 40 130 25 Z" fill="#FFFFFF" />
          </>
        )}

        {helmet.pattern === "giallo" && (
          <path d="M 90 40 Q 170 20 260 75 L 245 95 Q 165 45 80 60 Z" fill="#0D0D0D" opacity="0.85" />
        )}

        {helmet.pattern === "azzurro" && (
          <path d="M 80 50 C 140 30 220 40 270 70 L 260 90 C 200 65 130 55 75 75 Z" fill="#002B49" />
        )}

        {helmet.pattern === "gold" && (
          <path d="M 100 35 Q 180 25 260 65 L 250 80 Q 170 45 90 50 Z" fill="#E10600" />
        )}

        {/* Charles Leclerc Iconic #16 Logo Graphic */}
        <g transform="translate(185, 62) scale(0.75)">
          <text
            x="0"
            y="30"
            fill={helmet.accentColor === helmet.primaryColor ? "#E10600" : helmet.accentColor}
            fontWeight="900"
            fontSize="36"
            fontFamily="sans-serif"
            fontStyle="italic"
            letterSpacing="-2"
          >
            16
          </text>
        </g>

        {/* Visor Recess Frame */}
        <path
          d="M 100 95 C 150 85 240 90 280 125 C 285 150 260 185 210 185 C 160 185 110 170 95 145 C 90 130 92 110 100 95 Z"
          fill="#080808"
        />

        {/* Visor Glass Tint */}
        <path
          d="M 105 100 C 155 90 235 95 272 128 C 275 145 255 178 208 178 C 160 178 115 165 102 142 C 98 128 100 112 105 100 Z"
          fill={`url(#visor-grad-${helmet.id})`}
          stroke="#333333"
          strokeWidth="1.5"
        />

        {/* Visor Tear-Off Post Left & Right */}
        <circle cx="112" cy="120" r="4.5" fill="#E10600" stroke="#FFFFFF" strokeWidth="1" />
        <circle cx="258" cy="142" r="4.5" fill="#E10600" stroke="#FFFFFF" strokeWidth="1" />

        {/* Visor Banner (Monster/Scuderia Top Strip) */}
        <path
          d="M 105 100 C 155 90 235 95 272 128 C 268 136 240 114 170 107 C 120 102 108 108 105 100 Z"
          fill="#111111"
        />
        <path
          d="M 115 102 C 160 94 230 98 262 124"
          stroke={helmet.accentColor || "#E10600"}
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Chin Vent & Lower Details */}
        <path
          d="M 190 195 L 240 190 L 235 208 L 185 210 Z"
          fill="#181818"
          stroke="#333"
          strokeWidth="1"
        />
        <line x1="198" y1="198" x2="232" y2="195" stroke="#555" strokeWidth="1.5" />
        <line x1="195" y1="204" x2="229" y2="201" stroke="#555" strokeWidth="1.5" />

        {/* Hans Device Anchor Bolt */}
        <circle cx="115" cy="195" r="7" fill="#888888" stroke="#111111" strokeWidth="2" />
        <circle cx="115" cy="195" r="3" fill="#E10600" />

        {/* Gloss Surface Sheen */}
        <path
          d="M 75 100 C 60 70 100 30 160 25 C 120 40 85 70 80 120 Z"
          fill={`url(#shine-${helmet.id})`}
        />
      </svg>
      )}
    </div>
  );
}

// Single Notched Card Component matching the reference image layout 1:1
function HelmetCard({
  helmet,
  onClick
}: {
  helmet: HelmetData;
  onClick: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const clipId = `notch-clip-${helmet.id}`;

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative cursor-pointer w-full aspect-[4/5] max-w-[320px] mx-auto"
    >
      {/* SVG Defs for Custom Curved Notched ClipPath matching reference image */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            <path d="M 0.0625 0 H 0.9375 A 0.0625 0.05 0 0 1 1 0.05 V 0.95 A 0.0625 0.05 0 0 1 0.9375 1 H 0.60 C 0.525 1, 0.50 0.9125, 0.425 0.9125 H 0.0625 A 0.0625 0.05 0 0 1 0 0.8625 V 0.05 A 0.0625 0.05 0 0 1 0.0625 0 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Outer Card Notched Container SVG Background & Border */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-30">
        <svg
          viewBox="0 0 320 400"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          {/* Main Notched & S-Curve Border Path matching reference image 1:1 */}
          <path
            d="
              M 20 0 
              H 300 
              A 20 20 0 0 1 320 20 
              V 380 
              A 20 20 0 0 1 300 400 
              H 192 
              C 168 400, 160 365, 136 365 
              H 20 
              A 20 20 0 0 1 0 345 
              V 20 
              A 20 20 0 0 1 20 0 
              Z
            "
            fill="transparent"
            stroke="rgba(255, 255, 255, 0.12)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            className="transition-colors duration-500 group-hover:stroke-[#E10600]"
          />
        </svg>
      </div>

      {/* Main Card Content Area Clipped strictly to Notched Path */}
      <div 
        className="relative z-10 w-full h-full overflow-hidden flex items-center justify-center bg-[#0B0408]"
        style={{ clipPath: `url(#${clipId})` }}
      >
        {/* Main Helmet Image Container: Cinematic Blur & Scale Out */}
        <motion.div
          animate={{
            scale: isHovered ? 1.2 : 1,
            opacity: isHovered ? 0 : 1,
            filter: isHovered ? "blur(12px)" : "blur(0px)"
          }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full h-full flex items-center justify-center p-2"
        >
          <HelmetGraphic helmet={helmet} />
        </motion.div>

        {/* Hover Secondary JPG Image Container: Cinematic Fade & Slow Zoom In */}
        {helmet.hoverImage && (
          <motion.div
            initial={{ scale: 1, opacity: 0 }}
            animate={{
              scale: isHovered ? 1.1 : 1,
              opacity: isHovered ? 1 : 0
            }}
            transition={{ duration: 1.2, ease: [0.25, 1, 0.35, 1] }}
            className="absolute inset-0 z-20 w-full h-full flex items-center justify-center bg-[#0B0408] overflow-hidden"
          >
            <img
              src={helmet.hoverImage}
              alt={`${helmet.name} hover view`}
              className="w-full h-full object-cover rounded-none"
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default function HelmetGallery() {
  const [selectedHelmet, setSelectedHelmet] = useState<HelmetData | null>(null);

  return (
    <section
      id="helmet-gallery"
      className="relative bg-[#0B0408] text-[#F4F1E8] min-h-screen flex flex-col items-center pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-12 sm:pb-16 md:pb-20 px-8 sm:px-12 md:px-20 lg:px-28 xl:px-36 overflow-hidden"
    >

      {/* Section Header */}
      <div className="w-full max-w-6xl mx-auto mb-14 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 relative z-10">
        {/* Left Side: Bold Typography Title matching reference image */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E10600] animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#B8B6B0]">
              CAREER LIVERY ARCHIVE
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-[#F4F1E8] leading-none">
            HELMETS
          </h2>
          <p className="text-3xl md:text-5xl lg:text-6xl font-serif text-[#E10600] tracking-wide mt-1">
            HALL OF FAME
          </p>
        </div>

        {/* Right Side: Editorial Story Caption */}
        <div className="max-w-md">
          <p className="text-sm md:text-base text-[#B8B6B0] leading-relaxed font-sans">
            From his iconic Monaco tribute lid to innovative one-off race designs, Charles has always been passionate about creating bespoke helmets that celebrate speed, tribute, and Scuderia Ferrari glory.
          </p>
        </div>
      </div>

      {/* 3x3 Grid Layout (3 Columns, 3 Rows - 9 Cards with side margin breathing room) */}
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative z-10">
        {HELMETS.map((helmet, idx) => {
          // Stagger middle column (indices 1, 4, 7) slightly for dynamic editorial flow
          const isCenterColumn = idx % 3 === 1;

          return (
            <motion.div
              key={helmet.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
              className={isCenterColumn ? "md:translate-y-5" : ""}
            >
              <HelmetCard
                helmet={helmet}
                onClick={() => setSelectedHelmet(helmet)}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Track Callout CTA - shifted down further from helmet grid */}
      <div
        className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center text-center relative z-10 px-4"
        style={{ marginTop: "clamp(160px, 8vw, 280px)" }}
      >
        {/* Helmet with Laurel Wreath Icon in Ferrari Gold */}
        <div className="w-20 h-10 mb-4 flex items-center justify-center text-[#B89B5E]">
          <svg viewBox="0 0 97 50.1" className="w-full h-full" fill="currentColor">
            <path d="M.4 27.6s3 .9 6.1 5.9c-.4-1.1-.6-2.2-.8-3.4C1.5 27.8 1.1 25.7.8 22c.2 1 3.2 2.4 3.6 4 .4 1.3.8 2.5 1.3 3.1 0-1-.1-2 0-3v-.5c-1.3-1.1-4.3-4.3-3.5-9.1.5 1.2 3 1.6 3.7 7.4.2-1.1.5-2.1.8-3.2C5.5 19.2 3.5 15 5.6 7.9c.3 1.2 2.5 5.7 2 8.3-.2.8-.2 1.7-.3 2.6 0-.2.1-.4.2-.6.3-.9.7-1.8 1.2-2.7 0-1.4-.2-2.8-.8-4.1-.3-.6-.4-1.3-.4-2s.4-1.3.8-1.8c.6-.8.8-2.8.8-2.8s2.2 3.4 0 9.8c.4-.7.9-1.5 1.4-2.1.4-1 .4-2 .2-3.1-.4-1.8-.7-4.5 2.2-7.7-.3 1.5.4 4.2-.1 6-.4 1.3-.9 2.6-1.5 3.8.5-.6 1.1-1.2 1.7-1.8.3-1 .2-2.5.8-4.9.7-2.9 2.2-3.3 2.8-4.8.5 3.3-1 6.7-2.4 8.6l.4-.3c.4-.3.8-.6 1.1-1 .4-1.8 1.2-3.5 2.4-5 .8-.9 2.7-1.4 3-2.2-.3 3.3-2.3 5.1-4 6.3.9-.5 1.9-.7 2.9-.7s2 .4 2.8 1c0 0-2.2 1.3-3.7 1.1-1.5-.2-2.1-.5-3-.2-.3.3-.7.6-1.1.9 2.2-.6 4.8 1 5.8 2-1.9.9-3.5.3-4.3-.6-.7-.7-1.8-.4-2.3-.8-.7.6-1.3 1.2-2 1.8-.7.7-1.3 1.5-1.9 2.4 1.4-1.3 3.7-2.7 6-2.2-.3.9-1.8 2.5-3.4 3.1-1.4.4-2.7.4-3.6.9-.6 1-1 2.1-1.4 3.3 2.1-3.1 6.3-3.9 7.3-3.7 0 0-2 .9-2.4 2.4-.5 1.6-2.2 2.1-3.6 2.2-.7.1-1.4.5-1.9 1-.4 1.4-.8 2.9-1 4.4 1.9-6.5 6.4-5.5 6.4-5.5-.6.3-1 .9-1.2 1.5-.4 1.1-.9 2-2.6 3.2-1.2.8-2.2 2.1-2.7 3.5 0 1.8.4 3.5.9 5.2-.3-2.2-.2-5.2 1.4-7.4-.2 1.5 1.5 4.1 1.1 5.9-.3 1.5-1.4 3.4-1.2 4.8.2.4.4.8.6 1.1 0-1 .5-2.3.5-3.3.3.9.2 3 .2 4.4.5.8 1.1 1.5 1.7 2.2-1.3-2.4-1.4-6-.4-9 1 1.5 2.1 4.4 1.8 6.4-.2 1.5 0 2.9.4 4.3l.3.3c.3.3.7.6 1 .8-1.5-2.1-1.3-5.3-1-6.7 1.8 2 3.3 6 3.2 8.1l1.2.6c1.6.7 3.4 1.1 5.1.6v.2l.1.2v.4c-1.8.5-3.8 0-5.5-.7l-1.8-.9c-1.1 1.1-3.4 1.8-4.8 1.4-1.3-.4-2.6-1.4-3.6-1.3 1.7-1.8 3.9-1.9 5.2-1.1 1.2.7 2 1 2.7.8-.8-.5-1.6-1.1-2.3-1.7l-.3-.3c-1.9.7-4 0-5.3-.8-1.5-.9-1.7-2.6-2.8-3.5 3.5-.1 5 1.4 5.6 2.3.5.7 1.2 1.3 2 1.5-1.1-1.1-2.1-2.2-2.9-3.5-.9-.2-3 0-4.1-1.5 1.5-.1 2.6 0 3.4.5-.2-.4-.4-.8-.6-1.1-1.1-.2-3.1 0-4.4-1.1-1.1-1.1-2.2-2.3-3.1-3.6 0 0 2.5.5 3.8 1.1-1.1-1-3.8-5.7-3.8-5.8ZM96.4 27.3s-3 1-6 6c.3-1.1.6-2.2.7-3.4 4.3-2.4 4.6-4.5 4.9-8.2-.2 1-3.1 2.5-3.6 4.1-.4 1.3-.8 2.5-1.2 3.2v-3.5c1.3-1.1 4.2-4.4 3.3-9.1-.4 1.2-3 1.6-3.6 7.5-.2-1.1-.5-2.1-.8-3.2 1.2-1.5 3.1-5.8.9-12.8-.3 1.2-2.4 5.7-1.9 8.3.2.8.3 1.7.3 2.6 0-.2-.1-.4-.2-.6L88 15.5c0-1.4.2-2.8.7-4.1.3-.6.4-1.3.3-2 0-.7-.4-1.3-.9-1.8-.6-.8-.9-2.8-.9-2.8s-2.1 3.5.2 9.8c-.4-.7-.9-1.4-1.5-2.1-.4-1-.5-2-.3-3.1.4-1.8.6-4.5-2.3-7.7.3 1.5-.4 4.2.2 6 .4 1.3.9 2.5 1.5 3.8-.5-.6-1.1-1.2-1.8-1.7-.3-1-.2-2.5-.8-4.9-.8-2.9-2.2-3.2-2.9-4.8-.4 3.3 1.1 6.7 2.5 8.6l-.4-.3-1.2-.9c-.4-1.8-1.3-3.5-2.5-5-.8-.9-2.8-1.3-3-2.2.3 3.3 2.4 5 4.1 6.3-.9-.5-1.9-.7-2.9-.6-1 0-2 .4-2.8 1 0 0 2.2 1.2 3.7 1 1.5-.2 2.1-.5 3-.2.3.3.7.6 1.1.9-2.2-.6-4.8 1.1-5.8 2.1 2 .9 3.5.2 4.3-.6.7-.7 1.7-.5 2.3-.9.7.6 1.4 1.1 2 1.8.7.7 1.3 1.5 1.9 2.3-1.4-1.2-3.7-2.6-6-2.1.3.9 1.8 2.5 3.5 3 1.4.4 2.7.4 3.6.8.6 1 1.1 2.1 1.5 3.2-2.2-3.1-6.4-3.7-7.4-3.6 0 0 2 .8 2.5 2.4.5 1.6 2.2 2 3.7 2.2.7 0 1.4.4 1.9 1 .5 1.4.8 2.9 1.1 4.4-2-6.4-6.5-5.4-6.5-5.4.6.3 1 .9 1.2 1.5-.4 1.1-.9 2-2.7 3.2 1.3.8 2.2 2 2.8 3.4 0 1.8-.3 3.5-.8 5.2.3-2.2.1-5.2-1.5-7.4.2 1.5-1.5 4.1-1 5.9.4 1.5 1.5 3.4 1.3 4.8l-.6 1.2c0-1-.5-2.3-.5-3.3-.3.9-.1 3-.2 4.4-.5.8-1 1.5-1.6 2.2 1.2-2.5 1.3-6 .2-9-1 1.5-2 4.5-1.7 6.5.2 1.5.1 2.9-.3 4.3l-.3.3c-.3.3-.7.6-1 .9 1.5-2.2 1.2-5.3.9-6.7-1.8 2-3.2 6-3 8.1-.4.2-.8.4-1.1.6-1.6.7-3.4 1.2-5.1.7v.8c1.9.5 3.8 0 5.5-.8.6-.3 1.2-.6 1.8-1 1.1 1.1 3.5 1.7 4.8 1.3 1.3-.4 2.6-1.5 3.6-1.4-1.7-1.7-4-1.8-5.2-1-1.1.7-1.9 1.1-2.7.8.8-.5 1.6-1.1 2.3-1.8l.3-.3c1.9.6 4 0 5.3-.9 1.4-.9 1.7-2.6 2.8-3.6-3.5 0-4.9 1.5-5.5 2.4-.5.7-1.2 1.3-2 1.5 1.1-1.1 2-2.3 2.9-3.5.9-.2 3-.1 4.1-1.6-1.5-.1-2.6 0-3.4.5l.6-1.2c1.1-.2 3.1 0 4.4-1.2 1.1-1.1 2.1-2.3 3-3.6 0 0-2.5.5-3.7 1.2 1.1-1 3.7-5.8 3.7-5.9ZM67.3 20.4zM67.2 20.8zM67.3 20.4zM67.3 20.4zM67.2 20.8zM68.4 33.8c.1-.7.3-1.4.4-2.3 1.1-6.1.4-11.8-2-17-2.9-6.2-9.3-12.9-18.3-13.1-9.1 0-15.6 6.4-18.7 12.6-2.6 5.1-3.4 10.8-2.4 17 .1.9.3 1.6.4 2.3 0 .5.1.9.3 1.4.1.6.3 1.2.4 1.7v.2c.1.5.3 1 .4 1.5.3 1 .5 1.5.8 1.9 0 .2.2.4.3.7l.3.9v.3c0 .3.1.5.2.8 0 1.4.7 2.2 1.5 3.3.9 1.1 1.6 1.3 2.9 1.5.9.1 1.4.2 3 .6l2 .4c2.3.8 4.6 1.3 7.9 1.3h.4c3.1 0 5.2-.4 7.5-1.1s1.9-.4 1.9-.4c1.6-.3 2.2-.4 3.1-.5 1.3-.2 2-.3 3-1.5.9-1 1.5-1.8 1.6-3.2.1-.3.2-.5.3-.8V42c0-.4.2-.7.3-.9.1-.3.2-.5.3-.7.3-.5.5-.9.8-1.9.1-.5.3-1 .4-1.5v-.2c.1-.5.3-1.1.4-1.7.2-.4.3-.9.3-1.4Z" />
          </svg>
        </div>

        {/* Short Editorial Intro */}
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#F4F1E8] mb-6 max-w-xl leading-tight">
          See more helmets and highlights from Charles on the track
        </h3>

        {/* View on Track Button */}
        <a
          href="/#on-track"
          className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#E10600] hover:bg-[#8B0000] text-white font-sans font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg hover:scale-105 active:scale-95"
        >
          <span>VIEW ON TRACK</span>
          <span className="text-sm">↗</span>
        </a>
      </div>

      {/* Balanced dark gap before Store curved visor transition */}
      <div
        className="w-full pointer-events-none"
        style={{ height: "clamp(60px, 8vw, 120px)" }}
        aria-hidden="true"
      />

      {/* Interactive Modal Lightbox for Selected Helmet */}
      <AnimatePresence>
        {selectedHelmet && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedHelmet(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-[#141414] border border-[#333] rounded-2xl p-8 md:p-10 shadow-2xl overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedHelmet(null)}
                className="absolute top-6 right-6 text-[#B8B6B0] hover:text-[#E10600] text-2xl font-bold transition-colors"
                aria-label="Close modal"
              >
                ✕
              </button>

              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Large Helmet Preview */}
                <div className="w-full md:w-1/2 h-64 flex items-center justify-center bg-[#0A0A0A] rounded-xl p-4 border border-[#222]">
                  <HelmetGraphic helmet={selectedHelmet} />
                </div>

                {/* Helmet Info */}
                <div className="w-full md:w-1/2 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#E10600]/20 text-[#E10600] border border-[#E10600]/30">
                      {selectedHelmet.year}
                    </span>
                    <span className="text-xs font-mono text-[#B8B6B0]">
                      {selectedHelmet.circuit}
                    </span>
                  </div>

                  <h3 className="text-3xl font-bold uppercase tracking-tight text-[#F4F1E8]">
                    {selectedHelmet.name}
                  </h3>
                  <p className="text-sm font-serif text-[#E10600] mb-4 uppercase">
                    {selectedHelmet.subtitle}
                  </p>

                  <p className="text-sm text-[#B8B6B0] leading-relaxed mb-6">
                    {selectedHelmet.description}
                  </p>

                  <button
                    onClick={() => setSelectedHelmet(null)}
                    className="self-start px-6 py-2.5 rounded-full bg-[#E10600] hover:bg-[#B80500] text-[#F4F1E8] font-bold text-xs uppercase tracking-wider transition-colors"
                  >
                    Close Showcase
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
