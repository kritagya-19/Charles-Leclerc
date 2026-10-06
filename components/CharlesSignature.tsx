"use client";

import React from "react";

export default function CharlesSignature({ className = "w-72 h-36" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Dynamic, energetic Charles Leclerc signature vector path */}
      <path
        d="M 50 130 C 80 40, 110 30, 130 90 C 145 130, 100 160, 80 150 C 60 135, 120 70, 200 60 C 260 50, 310 80, 280 130 C 260 160, 220 170, 230 130 C 245 80, 330 30, 370 70"
        stroke="#E10600"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Stylized #16 inside signature */}
      <path
        d="M 170 110 L 170 165 M 190 100 L 220 90 L 205 165 M 180 135 L 230 125"
        stroke="#E10600"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="M 30 150 L 370 140"
        stroke="#E10600"
        strokeWidth="3"
        strokeDasharray="8 6"
        opacity="0.6"
      />
    </svg>
  );
}
