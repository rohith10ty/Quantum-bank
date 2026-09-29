import React from "react";
import { motion } from "motion/react";

export default function QuantumLogo({
  compact = false,
  dark = false,
  className = "",
}) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <motion.div
        whileHover={{ rotate: 30, scale: 1.04 }}
        transition={{ duration: 0.35 }}
        className="relative flex h-10 w-10 items-center justify-center"
      >
        <svg
          viewBox="0 0 48 48"
          className="h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id="quantumGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#22d3c5" />
              <stop offset="100%" stopColor="#0f766e" />
            </linearGradient>
          </defs>

          <path
            d="M24 3L41.5 13.5V34.5L24 45L6.5 34.5V13.5L24 3Z"
            fill="url(#quantumGradient)"
          />

          <path
            d="M24 10L35.5 17V31L24 38L12.5 31V17L24 10Z"
            fill="none"
            stroke="rgba(255,255,255,0.85)"
            strokeWidth="2"
          />

          <circle cx="24" cy="24" r="4.2" fill="white" />
        </svg>
      </motion.div>

      {!compact && (
        <div className="flex items-baseline gap-1">
          <span
            className={`text-[22px] font-semibold tracking-[-0.04em] ${
              dark ? "text-white" : "text-neutral-950"
            }`}
          >
            Quantum
          </span>

          <span
            className={`text-[22px] font-light tracking-[-0.04em] ${
              dark ? "text-neutral-400" : "text-neutral-500"
            }`}
          >
            Bank
          </span>
        </div>
      )}
    </div>
  );
}
