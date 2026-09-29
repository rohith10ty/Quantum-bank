import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  IconLock,
  IconLockOpen,
  IconWifi,
  IconWorld,
  IconShoppingBag,
  IconEye,
  IconEyeOff,
  IconShieldCheck,
  IconCheck,
  IconX,
  IconRotateDot,
  IconKey,
  IconReceipt,
  IconCreditCard,
  IconCalendar,
  IconArrowUpRight,
  IconSparkles,
  IconDeviceMobile,
  IconTrendingUp,
  IconChevronDown,
} from "@tabler/icons-react";
import { cardsData, creditCardTransactions, accountsData } from "../data/bankingData";

export default function Cards() {
  const primarySavings = accountsData.find((a) => a.id === "acc_1") || accountsData[0];
  const [cards, setCards] = useState(cardsData);
  const [selectedCardId, setSelectedCardId] = useState("card_1");
  const [isFlipped, setIsFlipped] = useState(false);
  const [showFullNumber, setShowFullNumber] = useState(false);
  const [spendingLimit, setSpendingLimit] = useState(250000);
  const [showPinModal, setShowPinModal] = useState(false);
  const [showPayBillModal, setShowPayBillModal] = useState(false);
  const [cardDropdownOpen, setCardDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [pinInput, setPinInput] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  const currentCard = cards.find((c) => c.id === selectedCardId) || cards[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setCardDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  const toggleCardLock = () => {
    setCards((prev) =>
      prev.map((c) =>
        c.id === currentCard.id
          ? { ...c, status: c.status === "Active" ? "Frozen" : "Active" }
          : c
      )
    );
    showToast(
      currentCard.status === "Active"
        ? `${currentCard.tier} is now temporarily FROZEN for safety.`
        : `${currentCard.tier} is now ACTIVE and unlocked.`
    );
  };

  const toggleCardFeature = (featureKey) => {
    setCards((prev) =>
      prev.map((c) =>
        c.id === currentCard.id
          ? { ...c, [featureKey]: !c[featureKey] }
          : c
      )
    );
    showToast(`Updated ${featureKey} settings.`);
  };

  const handlePinChange = (e) => {
    e.preventDefault();
    if (pinInput.length !== 4) return;
    setShowPinModal(false);
    setPinInput("");
    showToast("Card PIN successfully updated!");
  };

  const handlePayCreditCardBill = () => {
    setCards((prev) =>
      prev.map((c) =>
        c.id === "card_2"
          ? {
              ...c,
              amountToPay: 0,
              spent: 0,
              remainingBalance: c.currentLimit || 500000,
              availableLimit: c.currentLimit || 500000,
            }
          : c
      )
    );
    setShowPayBillModal(false);
    showToast(`Credit Card bill of ₹${(currentCard.amountToPay || 42850).toLocaleString("en-IN")} settled from Savings Account!`);
  };

  return (
    <div className="mx-auto max-w-[1600px] space-y-6">
      {/* TOAST */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-8 z-50 flex items-center gap-2 rounded-xl bg-neutral-950 px-4 py-3 text-sm font-medium text-white shadow-2xl border border-teal-500/30"
          >
            <IconCheck size={18} className="text-teal-400" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-950">Card Management Vault</h2>
          <p className="text-xs sm:text-sm text-neutral-400">
            Control limits, physical/virtual cards, instant freezing, and security permissions
          </p>
        </div>

        {/* MOBILE DROPDOWN SELECTOR (VISIBLE ON MOBILE ONLY) */}
        <div ref={dropdownRef} className="relative w-full sm:hidden">
          <button
            type="button"
            onClick={() => setCardDropdownOpen((prev) => !prev)}
            className="flex w-full items-center justify-between gap-2.5 rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-left shadow-xs transition hover:border-neutral-300 cursor-pointer"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div
                className={`h-3 w-3 shrink-0 rounded-full ${
                  currentCard.color === "black"
                    ? "bg-neutral-900 border border-neutral-700"
                    : "bg-teal-500"
                }`}
              />
              <div className="min-w-0">
                <p className="truncate text-xs font-bold text-neutral-900">
                  {currentCard.tier}
                </p>
                <p className="text-[10px] text-neutral-500">
                  {currentCard.type} Card • {currentCard.cardNumber.slice(-9)}
                </p>
              </div>
            </div>
            <IconChevronDown
              size={18}
              className={`shrink-0 text-neutral-500 transition-transform duration-200 ${
                cardDropdownOpen ? "rotate-180 text-neutral-900" : ""
              }`}
            />
          </button>

          <AnimatePresence>
            {cardDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="absolute left-0 right-0 top-full z-40 mt-1.5 overflow-hidden rounded-2xl border border-neutral-200 bg-white p-1.5 shadow-xl"
              >
                {cards.map((c) => {
                  const isSelected = c.id === selectedCardId;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => {
                        setSelectedCardId(c.id);
                        setIsFlipped(false);
                        setCardDropdownOpen(false);
                      }}
                      className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left transition cursor-pointer ${
                        isSelected
                          ? "bg-neutral-100 text-neutral-950 font-bold"
                          : "text-neutral-700 hover:bg-neutral-50"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div
                          className={`h-3 w-3 shrink-0 rounded-full ${
                            c.color === "black"
                              ? "bg-neutral-900 border border-neutral-700"
                              : "bg-teal-500"
                          }`}
                        />
                        <div className="min-w-0">
                          <p className="truncate text-xs font-bold text-neutral-900">
                            {c.tier}
                          </p>
                          <p className="text-[10px] text-neutral-500">
                            {c.type} Card • {c.cardNumber.slice(-9)}
                          </p>
                        </div>
                      </div>
                      {isSelected && (
                        <IconCheck size={16} className="shrink-0 text-teal-600" />
                      )}
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* DESKTOP/TABLET CARD SELECTOR TABS (HIDDEN ON MOBILE) */}
        <div className="hidden sm:flex items-center gap-2 rounded-2xl bg-neutral-200/70 p-1.5 overflow-x-auto no-scrollbar">
          {cards.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                setSelectedCardId(c.id);
                setIsFlipped(false);
              }}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedCardId === c.id
                  ? "bg-white text-neutral-950 shadow-xs"
                  : "text-neutral-600 hover:text-neutral-950"
              }`}
            >
              {c.tier}
            </button>
          ))}
        </div>
      </div>

      {/* MAIN CARDS ROW */}
      <div className="grid gap-6 lg:grid-cols-[460px_1fr]">
        {/* LEFT: 3D CARD DISPLAY & CARD CONTROLS */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-full perspective-[1200px]">
            <motion.div
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              style={{ transformStyle: "preserve-3d" }}
              className={`relative min-h-[260px] w-full rounded-3xl p-7 text-white shadow-2xl transition-all duration-200 ${
                currentCard.color === "black"
                  ? "bg-[#0e0e0e] border border-white/15"
                  : "bg-[#04241d] border border-emerald-500/30"
              }`}
            >
              {/* STATUS FROZEN OVERLAY */}
              {currentCard.status === "Frozen" && (
                <div className="absolute inset-0 z-30 flex flex-col items-center justify-center rounded-3xl bg-black/75 backdrop-blur-xs text-center p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30 mb-2">
                    <IconLock size={24} />
                  </div>
                  <h4 className="text-base font-bold text-white">CARD IS FROZEN</h4>
                  <p className="text-xs text-neutral-400 mt-1">All transactions are blocked until unfrozen</p>
                </div>
              )}

              {/* FRONT OF CARD */}
              <div
                style={{ backfaceVisibility: "hidden" }}
                className={`flex h-full min-h-[206px] flex-col justify-between ${
                  isFlipped ? "hidden" : "flex"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-md bg-[#14b8a6] flex items-center justify-center font-bold text-xs">
                        Q
                      </div>
                      <span className="font-bold text-sm tracking-wide">Quantum Bank</span>
                    </div>
                    <p className="text-[10px] text-teal-400 font-semibold tracking-wider uppercase mt-1">
                      {currentCard.tier}
                    </p>
                  </div>

                  <IconWifi size={24} className="text-neutral-400 rotate-90" />
                </div>

                <div className="my-3">
                  <div className="flex items-center justify-between mb-2.5">
                    {/* Real Gold EMV Chip */}
                    <svg
                      viewBox="0 0 44 32"
                      className="h-8 w-11 shrink-0 rounded-[5px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.7),0_2px_4px_rgba(0,0,0,0.35)]"
                    >
                      <defs>
                        <linearGradient
                          id={`goldGradVault_${currentCard.id}`}
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
                        fill={`url(#goldGradVault_${currentCard.id})`}
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

                    <IconWifi size={24} className="text-neutral-400 rotate-90" />
                  </div>

                  <p className="font-mono text-base xs:text-lg sm:text-2xl font-bold tracking-[0.10em] sm:tracking-[0.16em] truncate">
                    {showFullNumber ? currentCard.fullNumber : currentCard.cardNumber}
                  </p>
                </div>

                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-neutral-400">Cardholder</p>
                    <p className="text-sm font-semibold tracking-wider font-mono">{currentCard.holder}</p>
                  </div>

                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-neutral-400">Expires</p>
                    <p className="text-sm font-semibold font-mono">{currentCard.expiry}</p>
                  </div>

                  <span className="font-mono italic font-extrabold text-lg text-neutral-200">
                    VISA
                  </span>
                </div>
              </div>

              {/* BACK OF CARD (NO NAME) */}
              <div
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
                className={`flex h-full min-h-[206px] flex-col justify-between ${
                  isFlipped ? "flex" : "hidden"
                }`}
              >
                <div className="-mx-7 -mt-7 h-10 bg-black border-b border-white/10" />

                <div className="my-2 space-y-1.5">
                  <div className="flex items-center justify-between text-[9px] uppercase tracking-wider text-neutral-400">
                    <span>Authorized Signature</span>
                    <span className="text-amber-300 font-bold">Security Code</span>
                  </div>

                  <div className="flex h-10 items-center justify-between rounded-lg bg-white/95 px-3 shadow-inner">
                    <div className="flex items-center gap-1.5 opacity-60">
                      <div className="h-1.5 w-8 rounded-full bg-neutral-300" />
                      <div className="h-1.5 w-16 rounded-full bg-neutral-300" />
                      <div className="h-1.5 w-10 rounded-full bg-neutral-300" />
                    </div>
                    <div className="rounded bg-neutral-900 px-3 py-1 font-mono text-sm font-bold text-amber-400 shadow-xs">
                      CVV {showFullNumber ? currentCard.cvv : "•••"}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] text-neutral-400 border-t border-white/10 pt-2">
                  <span>Quantum Signature Guard</span>
                  <span className="font-semibold text-teal-400">24/7 Concierge Support</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* CARD ACTION BUTTONS - 2 ROWS IN LEFT COLUMN */}
          <div className="w-full space-y-2.5">
            {/* ROW 1: FLIP & SHOW/HIDE DETAILS */}
            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => setIsFlipped(!isFlipped)}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-neutral-300 bg-white px-3 py-2.5 text-xs font-bold text-neutral-800 shadow-2xs hover:bg-neutral-50 transition cursor-pointer"
              >
                <IconRotateDot size={15} />
                {isFlipped ? "Flip to Front" : "Flip to Back"}
              </button>

              <button
                onClick={() => setShowFullNumber(!showFullNumber)}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-neutral-300 bg-white px-3 py-2.5 text-xs font-bold text-neutral-800 shadow-2xs hover:bg-neutral-50 transition cursor-pointer"
              >
                {showFullNumber ? <IconEyeOff size={15} /> : <IconEye size={15} />}
                {showFullNumber ? "Hide Details" : "Show Details"}
              </button>
            </div>

            {/* ROW 2: CHANGE PIN & REPLACEMENT CARD (BELOW ROW 1) */}
            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => setShowPinModal(true)}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-xs font-bold text-neutral-800 shadow-2xs hover:bg-neutral-50 transition cursor-pointer"
              >
                <IconKey size={15} />
                Change PIN
              </button>

              <button
                onClick={() => showToast("Replacement physical card order placed! Delivery in 3 business days.")}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-xs font-bold text-neutral-800 shadow-2xs hover:bg-neutral-50 transition cursor-pointer"
              >
                <IconShieldCheck size={15} />
                Replacement Card
              </button>
            </div>
          </div>

          {/* PERK / REPUTATION BADGE */}
          <div className="w-full rounded-2xl bg-neutral-100/80 p-4 border border-neutral-200/80 text-xs">
            <div className="flex items-center gap-2 font-bold text-neutral-900 mb-1">
              <IconSparkles size={16} className="text-teal-700" />
              {currentCard.type === "Credit" ? "Infinite Lifestyle Privileges" : "Signature Debit Benefits"}
            </div>
            <p className="text-neutral-500 leading-relaxed text-[11px]">
              {currentCard.type === "Credit"
                ? "Unlimited domestic & international airport lounge access, 0% Forex mark-up on travel, 5X rewards on dining."
                : "Free unlimited ATM withdrawals across India, ₹10 Lakh complimentary accidental insurance cover."}
            </p>
          </div>
        </div>

        {/* RIGHT: TAB METRICS, BILLING, TRANSACTIONS & SETTINGS */}
        <div className="space-y-4">
          {/* IF CREDIT CARD: RENDER 4 TOP STATS (Current Limit, Remaining Balance, Amount to Pay, Avg Monthly Spend) */}
          {currentCard.type === "Credit" ? (
            <div className="space-y-4">
              {/* 4 STATS CARDS */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
                {/* 1. CURRENT LIMIT */}
                <div className="rounded-3xl border border-neutral-200/80 bg-white p-4 sm:p-5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-neutral-500">Current Limit</span>
                    <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-neutral-100 text-neutral-700">
                      <IconCreditCard size={15} />
                    </span>
                  </div>
                  <p className="mt-3 font-mono text-xl sm:text-2xl font-bold tracking-tight text-neutral-950">
                    ₹{(currentCard.currentLimit || 500000).toLocaleString("en-IN")}
                  </p>
                  <p className="mt-1 text-[11px] font-medium text-teal-700">
                    Approved Limit
                  </p>
                </div>

                {/* 2. REMAINING BALANCE */}
                <div className="rounded-3xl border border-neutral-200/80 bg-white p-4 sm:p-5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-neutral-500">Remaining Balance</span>
                    <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                      <IconLockOpen size={15} />
                    </span>
                  </div>
                  <p className="mt-3 font-mono text-xl sm:text-2xl font-bold tracking-tight text-emerald-700">
                    ₹{(currentCard.remainingBalance || 457150).toLocaleString("en-IN")}
                  </p>
                  <p className="mt-1 text-[11px] font-medium text-neutral-400">
                    Available (91.4%)
                  </p>
                </div>

                {/* 3. AMOUNT TO PAY */}
                <div className="rounded-3xl border border-amber-500/25 bg-amber-50/30 p-4 sm:p-5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-neutral-500">Amount to Pay</span>
                    <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
                      <IconReceipt size={15} />
                    </span>
                  </div>
                  <p className="mt-3 font-mono text-xl sm:text-2xl font-bold tracking-tight text-neutral-950">
                    ₹{(currentCard.amountToPay || 42850).toLocaleString("en-IN")}
                  </p>
                  <p className="mt-1 text-[11px] font-medium text-amber-800">
                    Due {currentCard.dueDate || "Oct 15, 2026"}
                  </p>
                </div>

                {/* 4. AVG MONTHLY SPENDING */}
                <div className="rounded-3xl border border-neutral-200/80 bg-white p-4 sm:p-5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-neutral-500">Avg Monthly Spend</span>
                    <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-purple-50 text-purple-700">
                      <IconTrendingUp size={15} />
                    </span>
                  </div>
                  <p className="mt-3 font-mono text-xl sm:text-2xl font-bold tracking-tight text-neutral-950">
                    ₹{(currentCard.avgMonthlySpend || 38500).toLocaleString("en-IN")}
                  </p>
                  <p className="mt-1 text-[11px] font-medium text-purple-700">
                    Last 6 Months Avg
                  </p>
                </div>
              </div>

              {/* CREDIT CARD BILLING CYCLE SUMMARY & LIMIT UTILIZATION */}
              <div className="rounded-3xl border border-neutral-200/80 bg-white p-5 sm:p-6 shadow-2xs">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3.5">
                  <div>
                    <h4 className="text-sm font-bold text-neutral-900">Statement & Utilization</h4>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      Billing Cycle: <span className="font-semibold text-neutral-700">{currentCard.billingCycle || "26th Aug – 25th Sep 2026"}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                      <span className="text-[11px] text-neutral-400">Utilization: </span>
                      <span className="font-mono text-xs font-bold text-emerald-700">8.57% (Optimal)</span>
                    </div>

                    <button
                      onClick={() => setShowPayBillModal(true)}
                      className="flex items-center gap-1.5 rounded-xl bg-neutral-950 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-neutral-800 transition active:scale-95 cursor-pointer whitespace-nowrap"
                    >
                      <IconReceipt size={14} />
                      Pay Bill (₹{(currentCard.amountToPay || 42850).toLocaleString("en-IN")})
                    </button>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-teal-500 to-amber-500 transition-all duration-500"
                    style={{ width: "8.57%" }}
                  />
                </div>
              </div>

              {/* CREDIT CARD TRANSACTIONS (MATCHING ₹42,850 AMOUNT TO PAY) */}
              <div className="rounded-3xl border border-neutral-200/80 bg-white p-5 sm:p-6 shadow-2xs">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4 pb-3 border-b border-neutral-100">
                  <div>
                    <h4 className="text-base font-bold text-neutral-950">Credit Card Statement Transactions</h4>
                    <p className="text-xs text-neutral-400">
                      Items billed in current cycle (Total sum matches Amount to Pay: <span className="font-mono font-bold text-neutral-900">₹{(currentCard.amountToPay || 42850).toLocaleString("en-IN")}</span>)
                    </p>
                  </div>
                  <span className="rounded-xl bg-teal-50 px-3 py-1 font-mono text-xs font-bold text-teal-800 self-start sm:self-auto">
                    {creditCardTransactions.length} Settled Transactions
                  </span>
                </div>

                <div className="divide-y divide-neutral-100">
                  {creditCardTransactions.map((tx) => (
                    <div
                      key={tx.id}
                      className="flex items-center justify-between py-3 hover:bg-neutral-50/60 rounded-xl px-2 transition"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 font-bold text-neutral-800 text-xs">
                          {tx.icon === "Apple" && ""}
                          {tx.icon === "Food" && "🍽️"}
                          {tx.icon === "Shopping" && "🛍️"}
                          {tx.icon === "Transport" && "🚗"}
                          {tx.icon === "Coffee" && "☕"}
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm font-bold text-neutral-900">{tx.name}</p>
                          <div className="flex items-center gap-2 text-[11px] text-neutral-400">
                            <span>{tx.date}</span>
                            <span>•</span>
                            <span>{tx.category}</span>
                            <span>•</span>
                            <span className="font-mono">{tx.ref}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="font-mono font-bold text-xs sm:text-sm text-neutral-950">
                          -₹{tx.amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                        </span>
                        <p className="text-[10px] font-semibold text-emerald-600">Settled</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between rounded-2xl bg-neutral-50 p-3.5 border border-neutral-100 text-xs">
                  <span className="font-bold text-neutral-700">Total Billed Due (Amount to Pay):</span>
                  <span className="font-mono font-bold text-sm text-neutral-950">
                    ₹{(currentCard.amountToPay || 42850).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            /* IF DEBIT CARD: RENDER DEBIT STATS & SPENDING LIMIT */
            <div className="space-y-4">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
                <div className="rounded-3xl border border-neutral-200/80 bg-white p-4 sm:p-5 shadow-2xs">
                  <span className="text-xs font-bold text-neutral-500">Daily Limit</span>
                  <p className="mt-3 font-mono text-xl sm:text-2xl font-bold tracking-tight text-neutral-950">
                    ₹{(currentCard.dailyLimit || 200000).toLocaleString("en-IN")}
                  </p>
                  <p className="mt-1 text-[11px] font-medium text-teal-700">Max Allowed / Day</p>
                </div>

                <div className="rounded-3xl border border-neutral-200/80 bg-white p-4 sm:p-5 shadow-2xs">
                  <span className="text-xs font-bold text-neutral-500">Spent Today</span>
                  <p className="mt-3 font-mono text-xl sm:text-2xl font-bold tracking-tight text-neutral-950">
                    ₹{(currentCard.spentToday || 3299).toLocaleString("en-IN")}
                  </p>
                  <p className="mt-1 text-[11px] font-medium text-neutral-400">E-Commerce & POS</p>
                </div>

                <div className="rounded-3xl border border-neutral-200/80 bg-white p-4 sm:p-5 shadow-2xs">
                  <span className="text-xs font-bold text-neutral-500">Remaining Today</span>
                  <p className="mt-3 font-mono text-xl sm:text-2xl font-bold tracking-tight text-emerald-700">
                    ₹{(currentCard.remainingDailyLimit || 196701).toLocaleString("en-IN")}
                  </p>
                  <p className="mt-1 text-[11px] font-medium text-emerald-600">Available Cap</p>
                </div>

                <div className="rounded-3xl border border-neutral-200/80 bg-white p-4 sm:p-5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-neutral-500">Avg Monthly Spend</span>
                    <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-purple-50 text-purple-700">
                      <IconTrendingUp size={15} />
                    </span>
                  </div>
                  <p className="mt-3 font-mono text-xl sm:text-2xl font-bold tracking-tight text-neutral-950">
                    ₹{(currentCard.avgMonthlySpend || 32400).toLocaleString("en-IN")}
                  </p>
                  <p className="mt-1 text-[11px] font-medium text-purple-700">POS & ATM Average</p>
                </div>
              </div>

              {/* SPENDING LIMIT SLIDER */}
              <div className="rounded-3xl border border-neutral-200/80 bg-white p-5 sm:p-6 shadow-2xs">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-neutral-900 text-sm">Custom Daily Online Spending Limit</h4>
                    <p className="text-xs text-neutral-400">Adjust the active cap for online & POS payments</p>
                  </div>
                  <span className="font-mono text-lg font-bold text-teal-700">
                    ₹{spendingLimit.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="mt-4">
                  <input
                    type="range"
                    min="10000"
                    max="500000"
                    step="10000"
                    value={spendingLimit}
                    onChange={(e) => setSpendingLimit(Number(e.target.value))}
                    className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-[#14b8a6]"
                  />
                  <div className="flex justify-between text-[11px] text-neutral-400 mt-1 font-mono">
                    <span>₹10,000</span>
                    <span>₹2,50,000</span>
                    <span>₹5,00,000</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECURITY CONTROLS & INSTANT FREEZE (APPLIES TO BOTH CARDS) */}
          <div className="rounded-3xl border border-neutral-200/80 bg-white p-5 sm:p-6 shadow-2xs space-y-4">
            <h4 className="text-sm font-bold text-neutral-900">Security & Channel Controls</h4>

            {/* FREEZE / UNFREEZE BANNER */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl bg-neutral-50 p-4 border border-neutral-200/60">
              <div className="flex items-center gap-3.5">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
                    currentCard.status === "Active"
                      ? "bg-teal-100/80 text-teal-800"
                      : "bg-rose-100 text-rose-600"
                  }`}
                >
                  {currentCard.status === "Active" ? <IconLockOpen size={22} /> : <IconLock size={22} />}
                </div>
                <div>
                  <h5 className="font-bold text-neutral-900 text-xs sm:text-sm">Instant Card Lock</h5>
                  <p className="text-[11px] text-neutral-500">
                    {currentCard.status === "Active"
                      ? "Card is active & unlocked for purchases"
                      : "Card is temporarily frozen. All transactions blocked."}
                  </p>
                </div>
              </div>

              <button
                onClick={toggleCardLock}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition shadow-xs cursor-pointer ${
                  currentCard.status === "Active"
                    ? "bg-rose-600 text-white hover:bg-rose-700"
                    : "bg-emerald-600 text-white hover:bg-emerald-700"
                }`}
              >
                {currentCard.status === "Active" ? "Freeze Card Now" : "Unfreeze Card"}
              </button>
            </div>

            {/* TOGGLE PERMISSIONS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div
                onClick={() => toggleCardFeature("onlineTx")}
                className="cursor-pointer rounded-2xl border border-neutral-200/80 bg-white p-4 shadow-2xs hover:border-neutral-300 transition"
              >
                <div className="flex items-center justify-between">
                  <IconShoppingBag size={20} className="text-neutral-700" />
                  <span
                    className={`h-4 w-4 rounded-full border-2 ${
                      currentCard.onlineTx
                        ? "bg-[#14b8a6] border-[#14b8a6]"
                        : "bg-neutral-200 border-neutral-300"
                    }`}
                  />
                </div>
                <p className="mt-3 text-xs font-bold text-neutral-900">E-Commerce</p>
                <p className="text-[11px] text-neutral-400 mt-0.5">
                  {currentCard.onlineTx ? "Enabled" : "Disabled"}
                </p>
              </div>

              <div
                onClick={() => toggleCardFeature("contactless")}
                className="cursor-pointer rounded-2xl border border-neutral-200/80 bg-white p-4 shadow-2xs hover:border-neutral-300 transition"
              >
                <div className="flex items-center justify-between">
                  <IconWifi size={20} className="text-neutral-700 rotate-90" />
                  <span
                    className={`h-4 w-4 rounded-full border-2 ${
                      currentCard.contactless
                        ? "bg-[#14b8a6] border-[#14b8a6]"
                        : "bg-neutral-200 border-neutral-300"
                    }`}
                  />
                </div>
                <p className="mt-3 text-xs font-bold text-neutral-900">Contactless NFC</p>
                <p className="text-[11px] text-neutral-400 mt-0.5">
                  {currentCard.contactless ? "Enabled" : "Disabled"}
                </p>
              </div>

              <div
                onClick={() => toggleCardFeature("international")}
                className="cursor-pointer rounded-2xl border border-neutral-200/80 bg-white p-4 shadow-2xs hover:border-neutral-300 transition"
              >
                <div className="flex items-center justify-between">
                  <IconWorld size={20} className="text-neutral-700" />
                  <span
                    className={`h-4 w-4 rounded-full border-2 ${
                      currentCard.international
                        ? "bg-[#14b8a6] border-[#14b8a6]"
                        : "bg-neutral-200 border-neutral-300"
                    }`}
                  />
                </div>
                <p className="mt-3 text-xs font-bold text-neutral-900">International</p>
                <p className="text-[11px] text-neutral-400 mt-0.5">
                  {currentCard.international ? "Enabled (0% Forex)" : "Disabled"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PIN CHANGE MODAL (WITH CLICK OUTSIDE TO CLOSE) */}
      <AnimatePresence>
        {showPinModal && (
          <div
            onClick={() => setShowPinModal(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs cursor-pointer"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl border border-neutral-200 text-center cursor-default"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-700 mb-3">
                <IconKey size={24} />
              </div>
              <h3 className="text-lg font-bold text-neutral-900">Set New Card PIN</h3>
              <p className="text-xs text-neutral-400 mt-1">Enter a new 4-digit security PIN for ATM and POS</p>

              <form onSubmit={handlePinChange} className="mt-5 space-y-4">
                <input
                  type="password"
                  maxLength={4}
                  placeholder="••••"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  className="w-36 text-center font-mono text-2xl font-bold tracking-[0.5em] rounded-xl border border-neutral-200 bg-neutral-50 py-2.5 outline-none focus:border-neutral-950 focus:bg-white"
                  required
                />

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 rounded-xl bg-neutral-950 py-2.5 text-xs font-bold text-white shadow-md hover:bg-neutral-800 transition cursor-pointer"
                  >
                    Save PIN
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPinModal(false)}
                    className="rounded-xl border border-neutral-200 px-4 py-2.5 text-xs font-bold text-neutral-700 hover:bg-neutral-50 transition cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* PAY CREDIT CARD BILL MODAL (WITH CLICK OUTSIDE TO CLOSE) */}
      <AnimatePresence>
        {showPayBillModal && (
          <div
            onClick={() => setShowPayBillModal(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs cursor-pointer"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-neutral-200 cursor-default space-y-4"
            >
              <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-800">
                    <IconReceipt size={20} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-neutral-950">Pay Credit Card Bill</h3>
                    <p className="text-xs text-neutral-400">Quantum Black Elite Credit Card</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowPayBillModal(false)}
                  className="rounded-xl p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 cursor-pointer"
                >
                  <IconX size={18} />
                </button>
              </div>

              <div className="rounded-2xl bg-neutral-50 p-4 border border-neutral-100 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Total Billed Outstanding:</span>
                  <span className="font-mono font-bold text-neutral-950 text-base">
                    ₹{(currentCard.amountToPay || 42850).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Payment Due Date:</span>
                  <span className="font-semibold text-amber-800">{currentCard.dueDate || "Oct 15, 2026"}</span>
                </div>
                <div className="flex justify-between border-t border-neutral-200/60 pt-2">
                  <span className="text-neutral-500">Pay From Account:</span>
                  <span className="font-semibold text-neutral-900">{primarySavings.name} (₹{primarySavings.balance.toLocaleString("en-IN")})</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={handlePayCreditCardBill}
                  className="flex-1 rounded-2xl bg-gradient-to-r from-neutral-900 to-neutral-950 py-3 text-xs font-bold text-white shadow-md hover:shadow-lg transition cursor-pointer"
                >
                  Pay ₹{(currentCard.amountToPay || 42850).toLocaleString("en-IN")} Now
                </button>
                <button
                  type="button"
                  onClick={() => setShowPayBillModal(false)}
                  className="rounded-2xl border border-neutral-200 px-4 py-3 text-xs font-bold text-neutral-700 hover:bg-neutral-50 transition cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
