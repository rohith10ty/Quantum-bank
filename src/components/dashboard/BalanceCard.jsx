import React, { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import OptionWheel from "../ui/OptionWheel";
import { accountsData } from "../../data/bankingData";

const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const CORRECT_PIN = "123";

export default function BalanceCard() {
  const savingsAccount = accountsData.find((a) => a.id === "acc_1") || accountsData[0];
  const formattedBalance = `₹${savingsAccount.balance.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showWheelPrompt, setShowWheelPrompt] = useState(false);
  const [pinDigits, setPinDigits] = useState(["1", "2", "3"]);
  const [errorMsg, setErrorMsg] = useState("");
  const chamberRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const el = chamberRef.current;
    if (!el) return;

    const preventPageScroll = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    el.addEventListener("wheel", preventPageScroll, { passive: false });
    return () => {
      el.removeEventListener("wheel", preventPageScroll);
    };
  }, [showWheelPrompt]);

  // Close wheel prompt when clicking outside the balance card
  useEffect(() => {
    if (!showWheelPrompt) return;

    const handleClickOutside = (e) => {
      if (cardRef.current && !cardRef.current.contains(e.target)) {
        setShowWheelPrompt(false);
        setErrorMsg("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showWheelPrompt]);

  const handleEyeClick = () => {
    if (isUnlocked) {
      // Hide balance again
      setIsUnlocked(false);
      setShowWheelPrompt(false);
      setErrorMsg("");
    } else {
      // Toggle the 3-wheel prompt
      setShowWheelPrompt((prev) => !prev);
      setErrorMsg("");
    }
  };

  const updateDigit = (index, val) => {
    setPinDigits((prev) => {
      const updated = [...prev];
      updated[index] = String(val);
      return updated;
    });
    setErrorMsg("");
  };

  const handleUnlock = () => {
    const entered = pinDigits.join("");
    if (entered === CORRECT_PIN) {
      setIsUnlocked(true);
      setShowWheelPrompt(false);
      setErrorMsg("");
    } else {
      setErrorMsg("Incorrect PIN. Please try 123");
    }
  };

  return (
    <div ref={cardRef}>
      <div className="relative min-h-[190px] overflow-hidden rounded-[24px] bg-[#0b0b0b] p-6 text-white shadow-xl border border-white/10 flex flex-col justify-between">
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full opacity-20 blur-3xl"
          style={{ background: "#14b8a6" }}
        />

        {/* TOP: AVAILABLE BALANCE & EYE ICON */}
        <div className="relative z-10 flex items-center justify-between">
          <span className="text-sm font-medium text-neutral-400">Available Balance</span>

          <button
            onClick={handleEyeClick}
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-neutral-300 transition hover:bg-white/20 active:scale-95"
          >
            {isUnlocked ? (
              <IconEye size={18} stroke={1.8} />
            ) : (
              <IconEyeOff size={18} stroke={1.8} />
            )}
          </button>
        </div>

        {/* MIDDLE / BOTTOM CONTENT */}
        <div className="relative z-10 my-auto">
          {!showWheelPrompt ? (
            /* BALANCE DISPLAY (HIDDEN AS ₹ ******* BY DEFAULT, REVEALED WHEN UNLOCKED) */
            <div className="py-2">
              <h2 className="text-3xl sm:text-4xl font-extrabold font-mono tracking-tight text-white">
                {isUnlocked ? formattedBalance : "₹ *******"}
              </h2>
            </div>
          ) : (
            /* 3-WHEEL PASSCODE INTERFACE (3 DIFFERENT ANGLES: LEFT, CENTER, RIGHT) */
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-3 py-1"
            >
              {/* PLANE 3-WHEEL CONTAINER (TIGHTER & CLOSER SPACING) */}
              <div
                ref={chamberRef}
                className="relative flex h-[95px] w-full max-w-[210px] mx-auto items-center justify-center gap-1.5 px-1 py-1 [overscroll-behavior:contain] [touch-action:none]"
              >
                {/* Wheel 1: side="left" (Circular 3D Rotation Left) */}
                <div className="h-full w-16 flex items-center justify-center overflow-hidden">
                  <OptionWheel
                    items={DIGITS}
                    defaultSelected={1}
                    side="left"
                    fontSize={1.25}
                    spacing={1.25}
                    curve={1.4}
                    tilt={8.5}
                    blur={1.2}
                    fade={0.32}
                    inset={5}
                    textColor="rgba(255, 255, 255, 0.28)"
                    activeColor="#ffffff"
                    onChange={(idx, label) => updateDigit(0, label)}
                  />
                </div>

                {/* Wheel 2: side="center" (Center Cylinder) */}
                <div className="h-full w-16 flex items-center justify-center overflow-hidden border-x border-white/5">
                  <OptionWheel
                    items={DIGITS}
                    defaultSelected={2}
                    side="center"
                    fontSize={1.25}
                    spacing={1.25}
                    curve={1.5}
                    tilt={9.0}
                    blur={1.2}
                    fade={0.32}
                    textColor="rgba(255, 255, 255, 0.28)"
                    activeColor="#ffffff"
                    onChange={(idx, label) => updateDigit(1, label)}
                  />
                </div>

                {/* Wheel 3: side="right" (Circular 3D Rotation Right) */}
                <div className="h-full w-16 flex items-center justify-center overflow-hidden">
                  <OptionWheel
                    items={DIGITS}
                    defaultSelected={3}
                    side="right"
                    fontSize={1.25}
                    spacing={1.25}
                    curve={1.4}
                    tilt={8.5}
                    blur={1.2}
                    fade={0.32}
                    inset={5}
                    textColor="rgba(255, 255, 255, 0.28)"
                    activeColor="#ffffff"
                    onChange={(idx, label) => updateDigit(2, label)}
                  />
                </div>
              </div>

              {errorMsg && (
                <p className="text-[11px] font-semibold text-rose-400 text-center">
                  {errorMsg}
                </p>
              )}

              {/* UNLOCK BALANCE BUTTON */}
              <button
                onClick={handleUnlock}
                className="w-full rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 py-2.5 text-xs font-bold text-neutral-950 shadow-md transition hover:from-teal-400 hover:to-emerald-400 active:scale-98"
              >
                Unlock Balance
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {/* HELPER MESSAGE BELOW THE CARD */}
      <p className="mt-2 text-center text-xs text-neutral-400 font-medium">
        To view the balance PIN: 123
      </p>
    </div>
  );
}
