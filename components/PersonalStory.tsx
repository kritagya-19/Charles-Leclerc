"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";

interface EditorialCard {
  id: string;
  title: string;
  image: string;
  xPercent: number;
  yPercent: number;
  widthClass: string;
  aspectClass: string;
  speed: number;
  labelPosition?: "above" | "below";
  badge?: {
    num?: string;
    icon?: "flag" | "trophy" | "star";
  };
  filter?: "grayscale" | "none";
}

// 10 Editorial Cards with standardized moderate spacing, 2 large square anchors, and exact exit positioning
const editorialCards: EditorialCard[] = [
  {
    // Card 1: Positioned at ~72vw (right 1/4 area of viewport on initial entry)
    id: "card-1",
    title: "Early Days",
    image: "https://i.pinimg.com/736x/fd/28/1b/fd281b5f700a67f560f4fbde57e10ed5.jpg",
    xPercent: 17.78, // 72vw on 405vw track
    yPercent: 20,
    widthClass: "w-[220px] sm:w-[270px] md:w-[300px] lg:w-[330px]",
    aspectClass: "aspect-[4/5]",
    speed: 1.05,
    labelPosition: "above",
    badge: { num: "P1", icon: "trophy" },
  },
  {
    // Card 2: Moderate gap (~30vw from Card 1)
    id: "card-2",
    title: "Formula 2 Champion in 2017",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPNUjGzH4hxv7scC4FklbE-cevtKFmQVyZggbgc4BmJCTbo-eoeT_o9t4&s=10",
    xPercent: 25.18, // 102vw
    yPercent: 10,
    widthClass: "w-[180px] sm:w-[220px] md:w-[260px] lg:w-[290px]",
    aspectClass: "aspect-[16/10]",
    speed: 0.85,
    labelPosition: "above",
    filter: "grayscale",
  },
  {
    // LARGE SQUARE CARD 1: 3rd card from beginning, significantly larger 1:1 square, label above
    id: "card-3",
    title: "Joined Ferrari in 2019",
    image:
      "https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000001/content/dam/fom-website/sutton/2018/Italy/Saturday/dcd1801se1015.webp",
    xPercent: 32.59, // 132vw (~30vw from Card 2)
    yPercent: 22,
    widthClass: "w-[290px] sm:w-[370px] md:w-[440px] lg:w-[490px] xl:w-[520px]",
    aspectClass: "aspect-[4/5]",
    speed: 1.25,
    labelPosition: "above",
    badge: { num: "P1", icon: "flag" },
  },
  {
    // Card 4: Moderate gap (~38vw after large square anchor 1)
    id: "card-4",
    title: "First Ferrari win at Monza 2019",
    image:
      "https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000001/content/dam/fom-website/manual/XPB_Images/Belgium_2019/Sunday/XPB_1004550_HiRes.webp",
    xPercent: 42.96, // 174vw
    yPercent: 42,
    widthClass: "w-[230px] sm:w-[280px] md:w-[320px] lg:w-[350px]",
    aspectClass: "aspect-[16/10]",
    speed: 0.95,
    labelPosition: "above",
  },
  {
    // Card 5: Moderate gap (~30vw from Card 4)
    id: "card-5",
    title: "Home victory in 2024",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLx_AN9pRFuiA-NjFmrcZoIeuHgD5q_PiE3MuAwzWjrJ84m1hEoB0-Tag&s=10",
    xPercent: 50.37, // 204vw
    yPercent: 12,
    widthClass: "w-[220px] sm:w-[270px] md:w-[310px] lg:w-[340px]",
    aspectClass: "aspect-[16/10]",
    speed: 0.85,
    labelPosition: "above",
  },
  {
    // Card 6: Moderate gap (~30vw from Card 5)
    id: "card-6",
    title: "Playing piano gives me balance",
    image:
      "https://i.pinimg.com/736x/c0/ad/e0/c0ade0254ba5e37ba79c4627935a7890.jpg",
    xPercent: 57.78, // 234vw
    yPercent: 28,
    widthClass: "w-[220px] sm:w-[270px] md:w-[310px] lg:w-[340px]",
    aspectClass: "aspect-[4/5]",
    speed: 1.15,
    labelPosition: "above",
  },
  {
    // Card 7: Moderate gap (~34vw from Card 6)
    id: "card-7",
    title: "Leo, more than a pet, family",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN_7hPPy4lcyEhDTag11dTT9PoeeGnTeBh4bHrGLCSBg&s=10",
    xPercent: 65.19, // 264vw
    yPercent: 44,
    widthClass: "w-[210px] sm:w-[250px] md:w-[280px] lg:w-[310px]",
    aspectClass: "aspect-square",
    speed: 0.9,
    labelPosition: "above",
  },
  {
    // LARGE SQUARE CARD 2: 3rd card from end (Card 8 of 10), significantly larger 1:1 square, label below
    id: "card-8",
    title: "Love, building life beyond track",
    image:
      "https://images.prestigeonline.com/wp-content/uploads/sites/4/2026/03/09174630/charles-leclerc-and-alexandra-saint-mleux-5.jpeg",
    xPercent: 72.59, // 294vw (~30vw from Card 7)
    yPercent: 16,
    widthClass: "w-[290px] sm:w-[370px] md:w-[440px] lg:w-[490px] xl:w-[520px]",
    aspectClass: "aspect-[4/3]",
    speed: 1.25,
    labelPosition: "below", // Label placed below image
  },
  {
    // Card 9: Moderate gap (~38vw after large square anchor 2)
    id: "card-9",
    title: "Beyond Racing, Fashion, photography, time on water",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM-lDoxtKG0Fv2EOdB_au9nx-VF5fuxZF9e-1cX90ckuCUiU26c8_o-7Zp&s=10",
    xPercent: 82.96, // 336vw
    yPercent: 40,
    widthClass: "w-[210px] sm:w-[250px] md:w-[280px] lg:w-[310px]",
    aspectClass: "aspect-[3/4]",
    speed: 0.88,
    labelPosition: "above",
  },
  {
    // Card 10: Final card (~32vw from Card 9)
    id: "card-10",
    title: "What's next, still on the same mindset",
    image:
      "https://hips.hearstapps.com/hmg-prod/images/ferrari-x-charles-leclerc-capsule-collection-1-6830d29874b6b.jpg?crop=0.716xw:1.00xh;0.156xw,0&resize=640:*",
    xPercent: 90.37, // 366vw — lands fully visible at 60vw inside viewport right as horizontal scroll completes
    yPercent: 20,
    widthClass: "w-[210px] sm:w-[250px] md:w-[290px] lg:w-[320px]",
    aspectClass: "aspect-[4/5]",
    speed: 1.15,
    labelPosition: "above",
  },
];

export default function PersonalStory() {
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Trigger begins when 1/2 (50%) of the Personal Story section enters the viewport
  const { scrollYProgress } = useScroll({
    target: sentinelRef,
    offset: ["start 50%", "end 100%"],
  });

  // Inertia spring smoothing for fluid, natural easing
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 75,
    damping: 24,
    restDelta: 0.001,
  });

  // Track Dimensions: 405vw total with a 305vw pan distance
  const TRACK_VW = 405;
  const PAN_VW = 305;

  // Horizontal pan: moves smoothly until progress 0.94, where Card 10 is 100% fully visible, then smoothly transitions to unpinning
  const xVw = useTransform(
    smoothProgress,
    [0, 0.94],
    ["0vw", `-${PAN_VW}vw`],
    { clamp: true }
  );

  // Section text & metadata color interpolation
  const labelColor = useTransform(
    smoothProgress,
    [0.32, 0.50],
    ["#B8B6B0", "#6A6862"]
  );

  // Card border transition
  const cardBorderColor = useTransform(
    smoothProgress,
    [0.32, 0.50],
    ["rgba(244, 241, 232, 0.12)", "rgba(13, 13, 13, 0.14)"]
  );

  // Badge background & text transitions
  const badgeBg = useTransform(
    smoothProgress,
    [0.32, 0.50],
    ["rgba(26, 26, 26, 0.85)", "rgba(255, 255, 255, 0.95)"]
  );
  const badgeTextColor = useTransform(
    smoothProgress,
    [0.32, 0.50],
    ["#F4F1E8", "#0D0D0D"]
  );
  const badgeBorder = useTransform(
    smoothProgress,
    [0.32, 0.50],
    ["rgba(225, 6, 0, 0.4)", "rgba(225, 6, 0, 0.5)"]
  );

  // Sentinel height: 205vh tightens the transition so Personal Story completes and flows smoothly into Track Off without excess blank space
  const SENTINEL_VH = 205;

  return (
    <div
      id="personal-story-section"
      ref={sentinelRef}
      className="relative"
      style={{ height: `${SENTINEL_VH}vh` }}
      aria-label="Personal story scroll section"
    >
      {/* PINNED PANEL — stays locked at top:0 for the entire sentinel range */}
      <motion.section
        className="sticky top-0 w-full h-screen overflow-hidden select-none bg-transparent"
        aria-label="Editorial photo gallery"
      >
        {/* ── Horizontal card track ── */}
        <motion.div
          style={{ x: xVw, width: `${TRACK_VW}vw` }}
          className="absolute top-0 left-0 h-full will-change-transform z-10"
        >
          {editorialCards.map((card) => (
            <CardItem
              key={card.id}
              card={card}
              trackVw={TRACK_VW}
              smoothProgress={smoothProgress}
              labelColor={labelColor}
              cardBorderColor={cardBorderColor}
              badgeBg={badgeBg}
              badgeTextColor={badgeTextColor}
              badgeBorder={badgeBorder}
            />
          ))}
        </motion.div>
      </motion.section>
    </div>
  );
}

// ── Card sub-component ───────────────────────────────────────────────────────
interface CardItemProps {
  card: EditorialCard;
  trackVw: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  smoothProgress: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  labelColor: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cardBorderColor: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  badgeBg: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  badgeTextColor: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  badgeBorder: any;
}

function CardItem({
  card,
  smoothProgress,
  labelColor,
  cardBorderColor,
  badgeBg,
  badgeTextColor,
  badgeBorder,
}: Omit<CardItemProps, "trackVw"> & { trackVw?: number }) {
  // Multi-plane parallax depth offset based on individual card speed:
  const cardParallaxX = useTransform(
    smoothProgress,
    [0, 0.94],
    [0, (card.speed - 1) * 45],
    { clamp: true }
  );

  return (
    <motion.div
      className="absolute flex flex-col items-start will-change-transform"
      style={{
        left: `${card.xPercent}%`,
        top: `${card.yPercent}%`,
        x: cardParallaxX,
      }}
    >
      {/* Location / year label placed ABOVE image (standard for 9 cards, including Large Card 1) */}
      {card.labelPosition !== "below" && (
        <motion.div
          style={{ color: labelColor }}
          className="text-[10px] sm:text-xs tracking-[0.25em] uppercase font-semibold mb-2 px-0.5 font-mono will-change-transform select-none transition-colors"
        >
          {card.title}
        </motion.div>
      )}

      {/* Image card */}
      <motion.div
        className={`group relative overflow-hidden rounded-sm shadow-2xl bg-[#1A1A1A] transition-transform duration-500 hover:scale-[1.02] ${card.widthClass} ${card.aspectClass}`}
      >
        <img
          src={card.image}
          alt={card.title}
          draggable={false}
          className={`w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none ${
            card.filter === "grayscale"
              ? "grayscale contrast-125 brightness-95"
              : "contrast-105 brightness-100"
          }`}
        />
      </motion.div>

      {/* Location / year label placed BELOW image for Large Square Card 2 (Card 8) */}
      {card.labelPosition === "below" && (
        <motion.div
          style={{ color: labelColor }}
          className="text-[10px] sm:text-xs tracking-[0.25em] uppercase font-semibold mt-2.5 px-0.5 font-mono will-change-transform select-none transition-colors"
        >
          {card.title}
        </motion.div>
      )}

      {/* Badge */}
      {card.badge && (
        <motion.div
          style={{
            backgroundColor: badgeBg,
            borderColor: badgeBorder,
            color: badgeTextColor,
          }}
          className="mt-2.5 inline-flex items-center gap-2 px-3 py-1 backdrop-blur-sm border text-xs font-mono font-medium rounded-sm will-change-transform select-none transition-colors"
        >
          {card.badge.num && (
            <span className="text-[#E10600] font-bold">{card.badge.num}</span>
          )}
          {card.badge.icon === "flag" && (
            <span className="text-sm leading-none" title="Chequered Flag">
              🏁
            </span>
          )}
          {card.badge.icon === "trophy" && (
            <span className="text-sm leading-none" title="P1 Trophy">
              🏆
            </span>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
