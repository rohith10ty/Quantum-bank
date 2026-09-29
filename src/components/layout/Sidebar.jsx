import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import {
  IconLayoutDashboard,
  IconWallet,
  IconArrowsExchange,
  IconCreditCard,
  IconSend,
  IconChartPie,
  IconUser,
  IconSettings,
  IconLogout,
  IconX,
} from "@tabler/icons-react";

const links = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: IconLayoutDashboard,
  },
  {
    label: "Accounts",
    path: "/accounts",
    icon: IconWallet,
  },
  {
    label: "Transactions",
    path: "/transactions",
    icon: IconArrowsExchange,
  },
  {
    label: "Cards",
    path: "/cards",
    icon: IconCreditCard,
  },
  {
    label: "Payments",
    path: "/payments",
    icon: IconSend,
  },
  {
    label: "Analytics",
    path: "/analytics",
    icon: IconChartPie,
  },
];

const bottomLinks = [
  {
    label: "Profile",
    path: "/profile",
    icon: IconUser,
  },
  {
    label: "Settings",
    path: "/settings",
    icon: IconSettings,
  },
];

export default function Sidebar({ open, setOpen, mobileOpen, setMobileOpen }) {
  const navigate = useNavigate();

  return (
    <>
      {/* 1. DESKTOP SIDEBAR (FIXED ON LARGE SCREENS) */}
      <motion.aside
        onMouseEnter={() => setOpen?.(true)}
        onMouseLeave={() => setOpen?.(false)}
        animate={{
          width: open ? 260 : 72,
        }}
        transition={{
          duration: 0.25,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="hidden lg:flex fixed left-0 top-0 z-50 h-screen select-none flex-col justify-between overflow-hidden bg-[#0b0b0b] px-3 py-4 text-white border-r border-white/5 shadow-2xl"
      >
        {/* TOP: LOGO */}
        <div className="flex h-12 items-center">
          <NavLink
            to="/dashboard"
            className="flex h-11 w-full items-center overflow-hidden rounded-xl"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center">
              <QuantumIcon />
            </div>

            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -6 }}
                  transition={{ duration: 0.15 }}
                  className="ml-2 flex items-baseline gap-1 whitespace-nowrap overflow-hidden"
                >
                  <span className="text-[18px] font-bold tracking-tight text-white">
                    Quantum
                  </span>
                  <span className="text-[18px] font-light tracking-tight text-[#14b8a6]">
                    Bank
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </NavLink>
        </div>

        {/* MIDDLE: NAVIGATION LINKS */}
        <div className="mt-4 flex flex-1 flex-col justify-start overflow-y-auto overflow-x-hidden no-scrollbar">
          <nav className="flex flex-col gap-1.5">
            {links.map((item) => (
              <SidebarItem key={item.label} item={item} open={open} />
            ))}
          </nav>
        </div>

        {/* BOTTOM: SETTINGS, LOGOUT & PROFILE */}
        <div className="pt-3 border-t border-white/10">
          <div className="flex flex-col gap-1.5">
            {bottomLinks.map((item) => (
              <SidebarItem key={item.label} item={item} open={open} />
            ))}

            <button
              onClick={() => navigate("/login")}
              className="group relative flex h-10 w-full items-center rounded-xl px-3 text-neutral-400 transition-all duration-150 hover:bg-white/10 hover:text-rose-400 cursor-pointer"
            >
              <div className="flex h-6 w-6 shrink-0 items-center justify-center">
                <IconLogout size={19} stroke={1.8} />
              </div>

              <AnimatePresence>
                {open && (
                  <motion.span
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -6 }}
                    transition={{ duration: 0.15 }}
                    className="ml-3 whitespace-nowrap text-sm font-medium"
                  >
                    Logout
                  </motion.span>
                )}
              </AnimatePresence>

              {!open && (
                <div className="pointer-events-none absolute left-[64px] z-[100] hidden whitespace-nowrap rounded-lg bg-neutral-900 px-2.5 py-1.5 text-xs text-rose-400 shadow-xl border border-white/10 group-hover:block">
                  Logout
                </div>
              )}
            </button>
          </div>

          {/* USER PROFILE CARD */}
          <div className="mt-3">
            <NavLink
              to="/profile"
              className={`group relative flex h-11 w-full items-center rounded-xl border border-white/10 bg-white/[0.05] transition hover:bg-white/[0.09] ${
                open ? "px-2.5" : "justify-center px-0"
              }`}
            >
              <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-[#0f766e] to-[#14b8a6] text-xs font-bold text-white shadow-sm">
                RN
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#0b0b0b] bg-emerald-400" />
              </div>

              <AnimatePresence>
                {open && (
                  <motion.div
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -6 }}
                    transition={{ duration: 0.15 }}
                    className="min-w-0 flex-1 ml-2.5 overflow-hidden"
                  >
                    <p className="truncate text-xs font-semibold text-white">
                      Rohith Naidu
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {!open && (
                <div className="pointer-events-none absolute left-[64px] z-[100] hidden whitespace-nowrap rounded-lg bg-neutral-900 px-2.5 py-1.5 text-xs text-white shadow-xl border border-white/10 group-hover:block">
                  Rohith Naidu (Profile)
                </div>
              )}
            </NavLink>
          </div>
        </div>
      </motion.aside>

      {/* 2. MOBILE DRAWER SLIDEOUT & BACKDROP (FOR MOBILES & TABLETS) */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* BACKDROP OVERLAY */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen?.(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-xs cursor-pointer"
            />

            {/* SLIDING DRAWER PANEL */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 z-50 flex w-[280px] max-w-[85vw] flex-col justify-between overflow-y-auto bg-[#0b0b0b] p-5 text-white shadow-2xl border-r border-white/10"
            >
              <div>
                {/* DRAWER HEADER */}
                <div className="flex items-center justify-between pb-5 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <QuantumIcon />
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-bold tracking-tight text-white">Quantum</span>
                      <span className="text-xl font-light tracking-tight text-[#14b8a6]">Bank</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setMobileOpen?.(false)}
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-neutral-300 hover:bg-white/20 hover:text-white transition cursor-pointer"
                    aria-label="Close Navigation"
                  >
                    <IconX size={18} />
                  </button>
                </div>

                {/* NAVIGATION LINKS */}
                <nav className="mt-5 flex flex-col gap-1.5">
                  {links.map((item) => {
                    const Icon = item.icon;
                    return (
                      <NavLink
                        key={item.label}
                        to={item.path}
                        onClick={() => setMobileOpen?.(false)}
                        className={({ isActive }) =>
                          `flex h-11 items-center gap-3 rounded-2xl px-3.5 text-sm font-semibold transition-all ${
                            isActive
                              ? "bg-white text-neutral-950 shadow-md"
                              : "text-neutral-400 hover:bg-white/10 hover:text-white"
                          }`
                        }
                      >
                        {({ isActive }) => (
                          <>
                            <Icon
                              size={20}
                              stroke={isActive ? 2.2 : 1.7}
                              className={
                                isActive
                                  ? "!text-neutral-950"
                                  : "text-neutral-400 group-hover:text-white"
                              }
                            />
                            <span
                              className={
                                isActive
                                  ? "!text-neutral-950 font-bold"
                                  : "text-neutral-300"
                              }
                            >
                              {item.label}
                            </span>
                            {isActive && (
                              <span className="ml-auto h-2 w-2 rounded-full bg-[#14b8a6]" />
                            )}
                          </>
                        )}
                      </NavLink>
                    );
                  })}
                </nav>
              </div>

              {/* BOTTOM SECTION */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="flex flex-col gap-1.5">
                  {bottomLinks.map((item) => {
                    const Icon = item.icon;
                    return (
                      <NavLink
                        key={item.label}
                        to={item.path}
                        onClick={() => setMobileOpen?.(false)}
                        className={({ isActive }) =>
                          `flex h-10 items-center gap-3 rounded-xl px-3 text-sm font-medium transition-all ${
                            isActive
                              ? "bg-white text-neutral-950 font-semibold"
                              : "text-neutral-400 hover:bg-white/10 hover:text-white"
                          }`
                        }
                      >
                        {({ isActive }) => (
                          <>
                            <Icon
                              size={19}
                              className={
                                isActive
                                  ? "!text-neutral-950"
                                  : "text-neutral-400"
                              }
                            />
                            <span
                              className={
                                isActive
                                  ? "!text-neutral-950 font-bold"
                                  : "text-neutral-300"
                              }
                            >
                              {item.label}
                            </span>
                          </>
                        )}
                      </NavLink>
                    );
                  })}

                  <button
                    onClick={() => {
                      setMobileOpen?.(false);
                      navigate("/login");
                    }}
                    className="flex h-10 w-full items-center gap-3 rounded-xl px-3 text-sm font-medium text-rose-400 hover:bg-rose-500/10 transition cursor-pointer"
                  >
                    <IconLogout size={19} />
                    <span>Logout</span>
                  </button>
                </div>

                {/* USER PROFILE MINI CARD */}
                <NavLink
                  to="/profile"
                  onClick={() => setMobileOpen?.(false)}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-3 transition hover:bg-white/[0.1]"
                >
                  <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-[#0f766e] to-[#14b8a6] text-xs font-bold text-white shadow-sm">
                    RN
                    <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#0b0b0b] bg-emerald-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-white truncate">Rohith Naidu</p>
                    <p className="text-[10px] text-teal-400">Verified Account</p>
                  </div>
                </NavLink>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

function SidebarItem({ item, open }) {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        `group relative flex h-10 items-center rounded-xl px-3 transition-all duration-150 ${
          isActive
            ? "bg-white text-neutral-950 font-semibold shadow-sm"
            : "text-neutral-400 hover:bg-white/10 hover:text-white"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <div className="flex h-6 w-6 shrink-0 items-center justify-center">
            <Icon
              size={19}
              stroke={isActive ? 2.2 : 1.7}
              className={isActive ? "text-neutral-950" : "text-neutral-400 group-hover:text-white"}
            />
          </div>

          <AnimatePresence>
            {open && (
              <motion.span
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ duration: 0.15 }}
                className={`ml-3 whitespace-nowrap text-sm font-medium ${
                  isActive ? "text-neutral-950 font-semibold" : "text-neutral-300 group-hover:text-white"
                }`}
              >
                {item.label}
              </motion.span>
            )}
          </AnimatePresence>

          {/* Active emerald dot */}
          {isActive && open && (
            <span className="ml-auto mr-1 h-2 w-2 rounded-full bg-[#14b8a6]" />
          )}

          {!open && (
            <div className="pointer-events-none absolute left-[64px] z-[100] hidden whitespace-nowrap rounded-lg bg-neutral-900 px-2.5 py-1.5 text-xs text-white shadow-xl border border-white/10 group-hover:block">
              {item.label}
            </div>
          )}
        </>
      )}
    </NavLink>
  );
}

function QuantumIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      className="h-9 w-9 shrink-0 drop-shadow-[0_2px_8px_rgba(20,184,166,0.35)]"
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
