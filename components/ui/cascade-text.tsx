"use client";

import React, { useMemo, useState, type ElementType, type CSSProperties } from "react";

export interface TextRevealProps {
  text: string;
  as?: ElementType;
  href?: string;
  target?: string;
  className?: string;
  style?: CSSProperties;
  fontSize?: string;
  staggerDelay?: number;
  duration?: number;
  easing?: string;
  color?: string;
  hoverColor?: string;
  direction?: "up" | "down";
  onClick?: (e: React.MouseEvent) => void;
}

const TextReveal = React.memo(function TextReveal({
  text,
  as: Component = "a",
  href,
  target,
  className = "",
  style,
  fontSize = "3rem",
  staggerDelay = 25,
  duration = 250,
  easing = "cubic-bezier(0.16, 1, 0.3, 1)",
  color = "inherit",
  hoverColor = "#b2c73a",
  direction = "up",
  onClick,
}: TextRevealProps) {
  const [hovered, setHovered] = useState(false);

  const chars = useMemo(() => {
    if (typeof Intl !== "undefined" && Intl.Segmenter) {
      const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
      return Array.from(segmenter.segment(text), (s) => s.segment);
    }
    return [...text];
  }, [text]);

  const isUp = direction === "up";

  const rootProps: Record<string, unknown> = {
    className: `inline-block relative no-underline font-extrabold uppercase tracking-tight overflow-hidden cursor-pointer select-none leading-none ${className}`.trim(),
    style: {
      fontSize,
      color: hovered ? hoverColor : color,
      transition: "color 0.35s ease",
      lineHeight: 1,
      ...style,
    },
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    onClick,
    "aria-label": text,
  };

  if (href !== undefined) {
    rootProps.href = href;
  }
  if (target) {
    rootProps.target = target;
    if (target === "_blank") rootProps.rel = "noopener noreferrer";
  }

  return (
    <Component {...rootProps}>
      <span
        className="inline-flex relative overflow-hidden leading-none"
        aria-hidden="true"
      >
        {chars.map((char, i) => (
          <span
            key={i}
            className="inline-block relative overflow-hidden leading-none"
          >
            {/* Primary Char */}
            <span
              className="block will-change-transform leading-none"
              style={{
                transition: `transform ${duration}ms ${easing}`,
                transitionDelay: `${i * staggerDelay}ms`,
                transform: hovered
                  ? isUp
                    ? "translateY(-130%)"
                    : "translateY(130%)"
                  : "translateY(0%)",
              }}
            >
              {char === " " || char.trim() === "" ? "\u00A0" : char}
            </span>
            {/* Duplicate Char for Cascading Reveal */}
            <span
              className="block absolute top-0 left-0 will-change-transform leading-none"
              style={{
                transition: `transform ${duration}ms ${easing}`,
                transitionDelay: `${i * staggerDelay}ms`,
                transform: hovered
                  ? "translateY(0%)"
                  : isUp
                  ? "translateY(130%)"
                  : "translateY(-130%)",
              }}
            >
              {char === " " || char.trim() === "" ? "\u00A0" : char}
            </span>
          </span>
        ))}
      </span>
    </Component>
  );
});

TextReveal.displayName = "TextReveal";
export { TextReveal };
