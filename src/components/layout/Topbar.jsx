import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  IconBell,
  IconSearch,
  IconChevronDown,
  IconCalendar,
  IconSun,
  IconSunset,
  IconMoon,
  IconSunHigh,
  IconArrowRight,
  IconReceipt,
  IconCreditCard,
  IconWallet,
  IconUser,
  IconSettings,
  IconLayoutDashboard,
  IconChartPie,
  IconSend,
  IconX,
  IconLogout,
  IconShieldCheck,
  IconLock,
  IconMenu2,
} from "@tabler/icons-react";
import { transactions, accountsData, cardsData, beneficiaries } from "../../data/bankingData";

const appPages = [
  { label: "Dashboard", path: "/dashboard", category: "Pages", icon: IconLayoutDashboard },
  { label: "Accounts & Vaults", path: "/accounts", category: "Pages", icon: IconWallet },
  { label: "Transactions History", path: "/transactions", category: "Pages", icon: IconReceipt },
  { label: "Cards & Security", path: "/cards", category: "Pages", icon: IconCreditCard },
  { label: "Payments & Transfers", path: "/payments", category: "Pages", icon: IconSend },
  { label: "Analytics & Spending", path: "/analytics", category: "Pages", icon: IconChartPie },
  { label: "Profile & KYC", path: "/profile", category: "Pages", icon: IconUser },
  { label: "Settings & 2FA", path: "/settings", category: "Pages", icon: IconSettings },
];

export default function Topbar({ onOpenMobileMenu }) {
  const navigate = useNavigate();
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef(null);
  const searchContainerRef = useRef(null);
  const profileDropdownRef = useRef(null);
  const notificationsRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Keyboard shortcut Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
        setIsSearchOpen(true);
      }
      if (e.key === "Escape") {
        setIsSearchOpen(false);
        setShowProfileDropdown(false);
        setShowNotifications(false);
        setSearchQuery("");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Click outside to close search, notifications, and profile dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(e.target)) {
        setShowProfileDropdown(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getGreeting = () => {
    const hour = currentDateTime.getHours();
    if (hour >= 5 && hour < 12) {
      return { text: "Good morning, Rohith", icon: IconSun, emoji: "☀️" };
    } else if (hour >= 12 && hour < 17) {
      return { text: "Good afternoon, Rohith", icon: IconSunHigh, emoji: "🌤️" };
    } else if (hour >= 17 && hour < 21) {
      return { text: "Good evening, Rohith", icon: IconSunset, emoji: "🌇" };
    } else {
      return { text: "Good night, Rohith", icon: IconMoon, emoji: "🌙" };
    }
  };

  const greeting = getGreeting();

  const formattedDate = currentDateTime.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const formattedTime = currentDateTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  // Real-time comprehensive search filter
  const query = searchQuery.trim().toLowerCase();

  const matchedPages = query
    ? appPages.filter((p) => p.label.toLowerCase().includes(query))
    : [];

  const matchedTransactions = query
    ? transactions.filter(
        (t) =>
          t.name.toLowerCase().includes(query) ||
          t.category.toLowerCase().includes(query) ||
          t.ref.toLowerCase().includes(query)
      )
    : [];

  const matchedAccounts = query
    ? accountsData.filter(
        (a) =>
          a.name.toLowerCase().includes(query) ||
          a.type.toLowerCase().includes(query) ||
          a.accountNumber.includes(query)
      )
    : [];

  const matchedCards = query
    ? cardsData.filter(
        (c) =>
          c.tier.toLowerCase().includes(query) ||
          c.type.toLowerCase().includes(query)
      )
    : [];

  const matchedBeneficiaries = query
    ? beneficiaries.filter(
        (b) =>
          b.name.toLowerCase().includes(query) ||
          b.nickname.toLowerCase().includes(query) ||
          b.bank.toLowerCase().includes(query)
      )
    : [];

  const totalResults =
    matchedPages.length +
    matchedTransactions.length +
    matchedAccounts.length +
    matchedCards.length +
    matchedBeneficiaries.length;

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-neutral-200/80 bg-white/95 px-3 py-2.5 sm:py-3.5 backdrop-blur-md sm:px-6 lg:px-8">
      {/* LEFT: MOBILE HAMBURGER & GREETING */}
      <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-neutral-200 bg-white shadow-2xs hover:bg-neutral-50 active:scale-95 cursor-pointer text-neutral-800"
          aria-label="Open Navigation Menu"
        >
          <IconMenu2 size={20} stroke={2} />
        </button>

        {/* LOGO ON MOBILE */}
        <div className="lg:hidden flex items-center justify-center shrink-0">
          <QuantumIcon className="h-8 w-8 shrink-0 drop-shadow-[0_2px_8px_rgba(20,184,166,0.35)]" />
        </div>

        <div className="flex flex-col min-w-0">
          <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-neutral-400">
            <span className="flex items-center gap-1.5">
              <IconCalendar size={13} className="text-neutral-400" />
              {formattedDate}
            </span>
            <span className="h-1 w-1 rounded-full bg-neutral-300" />
            <span className="font-mono text-[11px] text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded-md">
              {formattedTime}
            </span>
          </div>

          <h1 className="mt-0.5 text-sm sm:text-lg lg:text-xl font-bold tracking-tight text-neutral-950 flex items-center gap-1.5 truncate">
            <span className="truncate">{greeting.text}</span>
            <span className="text-base shrink-0">{greeting.emoji}</span>
          </h1>
        </div>
      </div>

      {/* SEARCH & ACTIONS */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* INTERACTIVE SEARCH INPUT & DROPDOWN */}
        <div ref={searchContainerRef} className="relative">
          <div className="flex items-center gap-1.5 sm:gap-2 rounded-xl border border-neutral-200 bg-[#fafafa] px-2.5 sm:px-3.5 py-1.5 transition-all focus-within:border-neutral-950 focus-within:bg-white focus-within:ring-2 focus-within:ring-neutral-200">
            <IconSearch size={16} className="text-neutral-400 shrink-0" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onFocus={() => setIsSearchOpen(true)}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              placeholder="Search..."
              className="w-[100px] xs:w-[130px] sm:w-[200px] lg:w-[260px] bg-transparent py-0.5 sm:py-1 text-xs sm:text-sm outline-none placeholder:text-neutral-400"
            />
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery("")}
                className="text-neutral-400 hover:text-neutral-700 cursor-pointer"
              >
                <IconX size={14} />
              </button>
            ) : (
              <kbd className="hidden md:inline-block rounded-md border border-neutral-200 bg-white px-1.5 py-0.5 text-[10px] font-mono text-neutral-400 shadow-2xs">
                ⌘K
              </kbd>
            )}
          </div>

          {/* SEARCH RESULTS DROPDOWN POPOVER */}
          {isSearchOpen && searchQuery.trim() && (
            <div className="absolute right-0 mt-2 w-[340px] sm:w-[420px] max-h-[460px] overflow-y-auto rounded-2xl border border-neutral-200 bg-white p-3 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 no-scrollbar">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-neutral-100 px-2 text-xs">
                <span className="font-bold text-neutral-900">
                  Search Results ({totalResults})
                </span>
                <span className="text-[11px] text-neutral-400">
                  for "{searchQuery}"
                </span>
              </div>

              {totalResults === 0 ? (
                <div className="py-8 text-center text-xs text-neutral-400">
                  <IconSearch size={24} className="mx-auto mb-2 text-neutral-300" />
                  <p className="font-semibold text-neutral-700">No matches found</p>
                  <p className="text-[11px] mt-0.5">Try searching by merchant name, page, account, or category</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {/* PAGES */}
                  {matchedPages.length > 0 && (
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 px-2 mb-1">
                        Pages & Navigation
                      </p>
                      <div className="space-y-1">
                        {matchedPages.map((page) => {
                          const Icon = page.icon;
                          return (
                            <button
                              key={page.path}
                              onClick={() => {
                                navigate(page.path);
                                setIsSearchOpen(false);
                                setSearchQuery("");
                              }}
                              className="w-full flex items-center justify-between p-2 rounded-xl text-left hover:bg-neutral-50 transition"
                            >
                              <div className="flex items-center gap-2.5">
                                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-neutral-100 text-neutral-800">
                                  <Icon size={16} />
                                </div>
                                <span className="text-xs font-semibold text-neutral-900">{page.label}</span>
                              </div>
                              <IconArrowRight size={13} className="text-neutral-400" />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* TRANSACTIONS */}
                  {matchedTransactions.length > 0 && (
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 px-2 mb-1">
                        Transactions
                      </p>
                      <div className="space-y-1">
                        {matchedTransactions.slice(0, 4).map((tx) => (
                          <button
                            key={tx.id}
                            onClick={() => {
                              navigate("/transactions");
                              setIsSearchOpen(false);
                              setSearchQuery("");
                            }}
                            className="w-full flex items-center justify-between p-2 rounded-xl text-left hover:bg-neutral-50 transition"
                          >
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-bold text-neutral-900 truncate">{tx.name}</p>
                              <p className="text-[10px] text-neutral-400">{tx.category} • {tx.date}</p>
                            </div>
                            <span
                              className={`text-xs font-bold font-mono ml-2 shrink-0 ${
                                tx.type === "credit" ? "text-teal-700" : "text-neutral-900"
                              }`}
                            >
                              {tx.type === "credit" ? "+" : "-"}₹{tx.amount.toLocaleString("en-IN")}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ACCOUNTS & CARDS */}
                  {(matchedAccounts.length > 0 || matchedCards.length > 0) && (
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 px-2 mb-1">
                        Accounts & Cards
                      </p>
                      <div className="space-y-1">
                        {matchedAccounts.map((acc) => (
                          <button
                            key={acc.id}
                            onClick={() => {
                              navigate("/accounts");
                              setIsSearchOpen(false);
                              setSearchQuery("");
                            }}
                            className="w-full flex items-center justify-between p-2 rounded-xl text-left hover:bg-neutral-50 transition"
                          >
                            <div>
                              <p className="text-xs font-bold text-neutral-900">{acc.name}</p>
                              <p className="text-[10px] text-neutral-400 font-mono">{acc.accountNumber}</p>
                            </div>
                            <span className="text-xs font-bold font-mono text-teal-700">
                              {acc.symbol}{acc.balance.toLocaleString("en-IN")}
                            </span>
                          </button>
                        ))}

                        {matchedCards.map((card) => (
                          <button
                            key={card.id}
                            onClick={() => {
                              navigate("/cards");
                              setIsSearchOpen(false);
                              setSearchQuery("");
                            }}
                            className="w-full flex items-center justify-between p-2 rounded-xl text-left hover:bg-neutral-50 transition"
                          >
                            <div>
                              <p className="text-xs font-bold text-neutral-900">{card.tier}</p>
                              <p className="text-[10px] text-neutral-400">{card.type} Card</p>
                            </div>
                            <span className="text-[11px] font-semibold text-neutral-500">
                              {card.cardNumber}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* BENEFICIARIES */}
                  {matchedBeneficiaries.length > 0 && (
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 px-2 mb-1">
                        Beneficiaries & Payees
                      </p>
                      <div className="space-y-1">
                        {matchedBeneficiaries.map((b) => (
                          <button
                            key={b.id}
                            onClick={() => {
                              navigate("/payments");
                              setIsSearchOpen(false);
                              setSearchQuery("");
                            }}
                            className="w-full flex items-center justify-between p-2 rounded-xl text-left hover:bg-neutral-50 transition"
                          >
                            <div className="flex items-center gap-2">
                              <div
                                className={`flex h-6 w-6 items-center justify-center rounded-lg text-white font-bold text-[10px] ${b.color}`}
                              >
                                {b.avatar}
                              </div>
                              <div>
                                <p className="text-xs font-bold text-neutral-900">{b.name}</p>
                                <p className="text-[10px] text-neutral-400">{b.bank} • {b.upiId}</p>
                              </div>
                            </div>
                            <span className="text-[11px] font-bold text-teal-700">Pay →</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="relative" ref={notificationsRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200 bg-white transition hover:bg-neutral-50 hover:border-neutral-300 active:scale-95 shadow-2xs cursor-pointer"
          >
            <IconBell size={18} stroke={1.7} className="text-neutral-700" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#14b8a6]" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-neutral-200 bg-white p-4 shadow-xl z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <h4 className="text-xs font-bold text-neutral-900">Notifications (2)</h4>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-[11px] text-teal-600 hover:underline cursor-pointer"
                >
                  Mark all read
                </button>
              </div>
              <div className="mt-3 space-y-2.5">
                <div className="flex gap-2.5 rounded-xl bg-teal-50/60 p-2.5">
                  <div className="h-2 w-2 mt-1.5 rounded-full bg-[#14b8a6] shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-neutral-900">Amount Received: ₹68,000</p>
                    <p className="text-[11px] text-neutral-500 mt-0.5">Payment received from Arjun Mehta.</p>
                  </div>
                </div>
                <div className="flex gap-2.5 rounded-xl bg-neutral-50 p-2.5">
                  <div className="h-2 w-2 mt-1.5 rounded-full bg-neutral-400 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-neutral-900">Electricity Bill Due</p>
                    <p className="text-[11px] text-neutral-500 mt-0.5">BESCOM bill ₹2,840 due in 3 days.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Profile Pill & Interactive Dropdown */}
        <div className="relative" ref={profileDropdownRef}>
          <button
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            className={`flex items-center gap-2.5 rounded-xl border p-1.5 pr-3 transition active:scale-95 shadow-2xs cursor-pointer ${
              showProfileDropdown
                ? "border-neutral-900 bg-neutral-100 ring-2 ring-neutral-200"
                : "border-neutral-200 bg-white hover:bg-neutral-50 hover:border-neutral-300"
            }`}
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-tr from-neutral-800 to-neutral-950 text-xs font-bold text-white shadow-2xs">
              RN
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-semibold text-neutral-900 leading-tight">Rohith</p>
            </div>
            <IconChevronDown
              size={13}
              className={`text-neutral-400 hidden sm:block transition-transform duration-200 ${
                showProfileDropdown ? "rotate-180 text-neutral-900" : ""
              }`}
            />
          </button>

          <AnimatePresence>
            {showProfileDropdown && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-72 sm:w-80 rounded-3xl border border-neutral-200/90 bg-white p-3 shadow-2xl z-50 overflow-hidden text-neutral-900"
              >
                {/* Header User Preview */}
                <div className="rounded-2xl bg-neutral-50 p-3.5 border border-neutral-100 mb-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-neutral-950 font-extrabold text-sm text-white shadow-sm">
                      RN
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-sm font-bold text-neutral-950 truncate">Rohith Naidu</h4>
                        <span className="rounded bg-teal-100 px-1.5 py-0.2 text-[9px] font-bold text-teal-800">
                          Verified
                        </span>
                      </div>
                      <p className="text-xs text-neutral-400 truncate">rohith.naidu@quantumbank.com</p>
                    </div>
                  </div>
                </div>

                {/* Quick Menu Options */}
                <div className="space-y-0.5">
                  <button
                    onClick={() => {
                      setShowProfileDropdown(false);
                      navigate("/profile");
                    }}
                    className="w-full flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950 transition cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <IconUser size={16} className="text-neutral-500" />
                      <span>View & Edit Profile</span>
                    </div>
                    <span className="text-[10px] text-neutral-400">KYC Level 3</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowProfileDropdown(false);
                      navigate("/cards");
                    }}
                    className="w-full flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950 transition cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <IconCreditCard size={16} className="text-neutral-500" />
                      <span>Cards & Security Vault</span>
                    </div>
                    <span className="text-[10px] text-teal-700 font-bold">2 Active</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowProfileDropdown(false);
                      navigate("/analytics");
                    }}
                    className="w-full flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950 transition cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <IconChartPie size={16} className="text-neutral-500" />
                      <span>Financial Analytics</span>
                    </div>
                    <span className="text-[10px] text-emerald-600 font-bold">Score 840</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowProfileDropdown(false);
                      navigate("/transactions");
                    }}
                    className="w-full flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950 transition cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <IconReceipt size={16} className="text-neutral-500" />
                      <span>Statements & Reports</span>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setShowProfileDropdown(false);
                      navigate("/settings");
                    }}
                    className="w-full flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950 transition cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <IconSettings size={16} className="text-neutral-500" />
                      <span>Security & Preferences</span>
                    </div>
                    <span className="text-[10px] text-teal-700 font-bold">2FA Active</span>
                  </button>
                </div>

                {/* Divider */}
                <div className="my-1.5 border-t border-neutral-100" />

                {/* Sign Out / Lock Session Button */}
                <button
                  onClick={() => {
                    setShowProfileDropdown(false);
                    navigate("/profile");
                  }}
                  className="w-full flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                >
                  <IconLogout size={16} />
                  <span>Lock Session / Sign Out</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}

function QuantumIcon({ className = "h-8 w-8 shrink-0" }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M24 3L41.5 13.5V34.5L24 45L6.5 34.5V13.5L24 3Z"
        fill="#14b8a6"
      />
      <path
        d="M24 9.5L36 16.5V31.5L24 38.5L12 31.5V16.5L24 9.5Z"
        fill="none"
        stroke="white"
        strokeWidth="2.4"
      />
      <circle cx="24" cy="24" r="4.5" fill="white" />
    </svg>
  );
}

