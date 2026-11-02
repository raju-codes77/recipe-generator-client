import React from "react";

interface FoodCanvasAIIconProps {
  size?: number;
  className?: string;
  animateDots?: boolean;
  withOuterGlow?: boolean;
}

export default function FoodCanvasAIIcon({
  size = 32,
  className = "",
  animateDots = false,
  withOuterGlow = false,
}: FoodCanvasAIIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none ${className}`}
      aria-hidden="true"
    >
      <defs>
        {/* Main Vibrant Emerald Bubble Gradient */}
        <linearGradient
          id="fcBubbleGrad"
          x1="6"
          y1="5"
          x2="42"
          y2="42"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#1E8A5C" />
          <stop offset="50%" stopColor="#156E49" />
          <stop offset="100%" stopColor="#0F5438" />
        </linearGradient>

        {/* Soft Highlight at Top */}
        <linearGradient
          id="fcTopHighlight"
          x1="24"
          y1="5"
          x2="24"
          y2="22"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>

        {/* Golden Sparkle Gradient */}
        <linearGradient
          id="fcSparkleGrad"
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>

        {/* Speech Bubble Drop Shadow */}
        <filter id="fcBubbleShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#0A3322" floodOpacity="0.28" />
        </filter>

        {/* Chef Hat Shadow for Depth */}
        <filter id="fcHatShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#0A3322" floodOpacity="0.35" />
        </filter>
      </defs>

      {/* Main Chat Speech Bubble with shadow and crisp outline */}
      <g filter="url(#fcBubbleShadow)">
        <path
          d="M24 5C13.5 5 5 12.8 5 22.5C5 27.6 7.4 32.2 11.3 35.4C10.6 38.3 9.2 40.8 7.3 42.6C10.4 42.6 14.5 41.2 17.5 38.8C19.5 39.6 21.7 40 24 40C34.5 40 43 32.2 43 22.5C43 12.8 34.5 5 24 5Z"
          fill="url(#fcBubbleGrad)"
          stroke={withOuterGlow ? "#FFFFFF" : "rgba(255, 255, 255, 0.55)"}
          strokeWidth={withOuterGlow ? "2" : "1.2"}
        />

        {/* Subtle Top Inner Highlight */}
        <path
          d="M24 6.2C14.3 6.2 6.5 13.5 6.5 22.5C6.5 27.1 8.8 31.3 12.3 34.2L12.7 34.5L12.4 35.5C11.9 37.3 11 39 9.8 40.4C12.1 39.9 14.8 38.7 17 37L17.5 36.6L18.1 36.8C20 37.5 21.9 37.9 24 37.9C33.7 37.9 41.5 30.6 41.5 22.5C41.5 14.4 33.7 6.2 24 6.2Z"
          stroke="url(#fcTopHighlight)"
          strokeWidth="1"
          fill="none"
        />
      </g>

      {/* Group: Chef Hat (Minimal, warm cream/white, friendly) */}
      <g filter="url(#fcHatShadow)">
        {/* Hat Puffs */}
        <circle cx="18.5" cy="17" r="4.2" fill="#FFFDF8" />
        <circle cx="29.5" cy="17" r="4.2" fill="#FFFDF8" />
        <circle cx="24" cy="15.2" r="5.2" fill="#FFFDF8" />

        {/* Hat Body connect fill */}
        <path
          d="M17.5 18.5H30.5L29.8 22H18.2L17.5 18.5Z"
          fill="#FFFDF8"
        />

        {/* Hat Brim / Band */}
        <rect
          x="16.5"
          y="21.5"
          width="15"
          height="3.2"
          rx="1.6"
          fill="#FFF4E0"
        />
        {/* Soft detail on brim band */}
        <line
          x1="18.5"
          y1="23.1"
          x2="29.5"
          y2="23.1"
          stroke="#E6D3B3"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
      </g>

      {/* 2 Subtle Golden AI Sparkles */}
      {/* Sparkle 1: Top-Right Sparkle */}
      <path
        d="M36 7.5C36 10.2 38.2 11.5 40 11.5C38.2 11.5 36 12.8 36 15.5C36 12.8 33.8 11.5 32 11.5C33.8 11.5 36 10.2 36 7.5Z"
        fill="url(#fcSparkleGrad)"
      />
      {/* Sparkle 2: Top-Left Sparkle (smaller) */}
      <path
        d="M11.5 11C11.5 12.7 12.9 13.5 14 13.5C12.9 13.5 11.5 14.3 11.5 16C11.5 14.3 10.1 13.5 9 13.5C10.1 13.5 11.5 12.7 11.5 11Z"
        fill="url(#fcSparkleGrad)"
      />

      {/* Three Small Typing Dots below Chef Hat */}
      <g className={animateDots ? "animate-pulse" : ""}>
        <circle cx="19" cy="30" r="1.8" fill="#FFFDF8" fillOpacity="0.95" />
        <circle cx="24" cy="30" r="1.8" fill="#FFFDF8" fillOpacity="0.95" />
        <circle cx="29" cy="30" r="1.8" fill="#FFFDF8" fillOpacity="0.95" />
      </g>
    </svg>
  );
}
