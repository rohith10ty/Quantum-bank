import React, { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { IconEye, IconEyeOff, IconRotateDot } from "@tabler/icons-react";

export default function BankCard({ card }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // Default to Emerald Debit Card if no card prop is provided
  const currentCard = card || {
    id: "card_1",
    type: "Debit",
    tier: "Quantum Emerald Signature Debit Card",
    shortTier: "Emerald Signature",
    network: "VISA",
    cardNumber: "5241 •••• •••• 1092",
    fullNumber: "5241 6619 4022 1092",
    holder: "ROHITH NAIDU",
    expiry: "11/28",
    cvv: "319",
    color: "emerald",
    status: "Active",
  };

  const isEmerald = currentCard.color === "emerald";

  // Mouse tilt spring physics
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [8, -8]);
  const rotateY = useTransform(x, [-100, 100], [-8, 8]);

  const smoothX = useSpring(rotateX, { stiffness: 220, damping: 24 });
  const smoothY = useSpring(rotateY, { stiffness: 220, damping: 24 });

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="w-full">
      {/* 3D TILT CONTAINER */}
      <div
        className="perspective-[1000px] cursor-pointer select-none"
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        <motion.div
          style={{
            rotateX: smoothX,
            rotateY: smoothY,
            transformStyle: "preserve-3d",
          }}
          className="w-full"
        >
          {/* FAST FLIP ROTATION CONTAINER */}
          <motion.div
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{ transformStyle: "preserve-3d" }}
            className={`relative min-h-[224px] w-full rounded-[24px] p-6 text-white shadow-[0_15px_35px_rgba(0,0,0,0.18)] border transition-all duration-200 ${
              isEmerald
                ? "bg-[#04241d] border-emerald-500/25"
                : "bg-[#0e0e0e] border-white/10"
            }`}
          >
            {/* Background subtle geometric rings */}
            <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full border border-white/5 pointer-events-none" />
            <div className="absolute -right-5 -top-10 h-44 w-44 rounded-full border border-white/5 pointer-events-none" />

            {/* ================= FRONT OF CARD ================= */}
            <div
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
              className={`flex h-full min-h-[176px] flex-col justify-between transition-opacity duration-150 ${
                isFlipped ? "pointer-events-none opacity-0" : "opacity-100"
              }`}
            >
              {/* TOP ROW: LOGO & BADGE / NETWORK */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <svg viewBox="0 0 48 48" className="h-7 w-7 shrink-0">
                    <path
                      d="M24 3L41.5 13.5V34.5L24 45L6.5 34.5V13.5L24 3Z"
                      fill={isEmerald ? "#10b981" : "#14b8a6"}
                    />
                    <circle cx="24" cy="24" r="5" fill="white" />
                  </svg>
                  <div>
                    <span className="text-sm font-bold tracking-wide">Quantum Bank</span>
                    <span
                      className={`ml-2 inline-block rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                        isEmerald
                          ? "bg-emerald-400/20 text-emerald-300 border border-emerald-400/30"
                          : "bg-white/15 text-neutral-200 border border-white/20"
                      }`}
                    >
                      {currentCard.type}
                    </span>
                  </div>
                </div>

                <span className="text-sm italic font-extrabold tracking-wider text-neutral-300 font-mono">
                  {currentCard.network || "VISA"}
                </span>
              </div>

              {/* MIDDLE ROW: REAL METALLIC GOLD EMV CHIP & CARD NUMBER */}
              <div className="my-2">
                <div className="flex items-center justify-between mb-2.5">
                  {/* Real Gold EMV Chip */}
                  <svg
                    viewBox="0 0 44 32"
                    className="h-7 w-10 shrink-0 rounded-[5px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.7),0_2px_4px_rgba(0,0,0,0.35)]"
                  >
                    <defs>
                      <linearGradient
                        id={`goldGrad_${currentCard.id}`}
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#fae58d" />
                        <stop offset="25%" stopColor="#d4af37" />
                        <stop offset="55%" stopColor="#9a6e14" />
                        <stop offset="80%" stopColor="#f3e5ab" />
                        <stop offset="100%" stopColor="#b8860b" />
                      </linearGradient>
                    </defs>
                    <rect
                      x="0.5"
                      y="0.5"
                      width="43"
                      height="31"
                      rx="4.5"
                      fill={`url(#goldGrad_${currentCard.id})`}
                      stroke="#6b4c09"
                      strokeWidth="0.75"
                    />
                    <path
                      d="M0 11.5 H13.5 V20.5 H0"
                      fill="none"
                      stroke="#523903"
                      strokeWidth="0.8"
                      strokeLinecap="round"
                    />
                    <path
                      d="M44 11.5 H30.5 V20.5 H44"
                      fill="none"
                      stroke="#523903"
                      strokeWidth="0.8"
                      strokeLinecap="round"
                    />
                    <path d="M13.5 16 H30.5" fill="none" stroke="#523903" strokeWidth="0.8" />
                    <path d="M22 0.5 V11.5" fill="none" stroke="#523903" strokeWidth="0.8" />
                    <path d="M22 20.5 V31.5" fill="none" stroke="#523903" strokeWidth="0.8" />
                    <rect
                      x="14"
                      y="11"
                      width="16"
                      height="10"
                      rx="3.5"
                      fill="none"
                      stroke="#523903"
                      strokeWidth="0.8"
                    />
                  </svg>

                  {/* Contactless tier name */}
                  <div className="text-neutral-400 text-xs font-mono font-bold tracking-widest">
                    {currentCard.shortTier || currentCard.tier}
                  </div>
                </div>

                <p className="text-base sm:text-xl tracking-[0.12em] sm:tracking-[0.18em] font-mono font-bold text-neutral-100 truncate">
                  {showDetails ? currentCard.fullNumber : currentCard.cardNumber}
                </p>
              </div>

              {/* BOTTOM ROW: HOLDER & EXPIRY (NO CVV ON FRONT) */}
              <div className="flex items-end justify-between pt-1">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.15em] text-neutral-400 font-semibold">
                    Card holder
                  </p>
                  <p className="mt-0.5 text-xs sm:text-sm font-semibold tracking-wide">
                    {currentCard.holder}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-[9px] uppercase tracking-[0.15em] text-neutral-400 font-semibold">
                    Expires
                  </p>
                  <p className="mt-0.5 text-xs sm:text-sm font-semibold font-mono tracking-wider">
                    {currentCard.expiry}
                  </p>
                </div>
              </div>
            </div>

            {/* ================= BACK OF CARD (CVV, NO NAME) ================= */}
            <div
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
              className={`absolute inset-0 flex h-full flex-col justify-between p-6 transition-opacity duration-150 ${
                !isFlipped ? "pointer-events-none opacity-0" : "opacity-100"
              }`}
            >
              {/* MAGNETIC STRIPE */}
              <div className="-mx-6 -mt-6 h-10 bg-black border-b border-white/10" />

              {/* SIGNATURE STRIP & CVV PANEL (NO NAME) */}
              <div className="my-2 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] uppercase tracking-wider text-neutral-400 font-semibold">
                    Authorized Signature
                  </span>
                  <span className="text-[9px] uppercase tracking-wider text-neutral-300 font-semibold">
                    Security Code
                  </span>
                </div>

                <div className="flex h-9 items-center justify-between rounded-lg bg-white/95 px-3 shadow-inner">
                  <div className="flex items-center gap-1.5 opacity-60">
                    <div className="h-1.5 w-6 rounded-full bg-neutral-300" />
                    <div className="h-1.5 w-12 rounded-full bg-neutral-300" />
                    <div className="h-1.5 w-8 rounded-full bg-neutral-300" />
                  </div>
                  <div className="rounded bg-neutral-900 px-2.5 py-0.5 font-mono text-xs font-bold text-amber-400 shadow-xs">
                    CVV {showDetails ? currentCard.cvv : "•••"}
                  </div>
                </div>
              </div>

              {/* BACK FOOTER / CONCIERGE INFO */}
              <div className="flex items-center justify-between border-t border-white/10 pt-2 text-[10px] text-neutral-400">
                <span className="font-medium">
                  {isEmerald ? "Quantum Debit Concierge" : "Elite Credit Concierge"}
                </span>
                <span className="font-mono text-neutral-300">1800-420-9999</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* CARD ACTION BUTTONS: FLIP OPTION & SHOW DETAILS */}
      <div className="mt-3 flex items-center justify-between gap-2 px-1">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsFlipped(!isFlipped);
          }}
          className="flex items-center gap-1.5 rounded-xl border border-neutral-300/80 bg-white px-3.5 py-1.5 text-xs font-bold text-neutral-800 shadow-2xs hover:bg-neutral-100 active:scale-95 transition cursor-pointer"
        >
          <IconRotateDot
            size={15}
            className={`text-teal-600 transition-transform duration-200 ${
              isFlipped ? "rotate-180" : ""
            }`}
          />
          <span>{isFlipped ? "Flip to Front" : "Flip to Back"}</span>
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setShowDetails(!showDetails);
          }}
          className="flex items-center gap-1.5 rounded-xl border border-neutral-300/80 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-700 shadow-2xs hover:bg-neutral-100 active:scale-95 transition cursor-pointer"
        >
          {showDetails ? (
            <IconEyeOff size={15} className="text-neutral-500" />
          ) : (
            <IconEye size={15} className="text-teal-600" />
          )}
          <span>{showDetails ? "Hide Details" : "Show Details"}</span>
        </button>
      </div>
    </div>
  );
}
