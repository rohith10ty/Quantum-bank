import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { motion } from "motion/react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function DashboardLayout() {
  const [desktopOpen, setDesktopOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 1024 : true
  );

  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);
      if (desktop) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-[#f6f6f4] relative overflow-x-hidden">
      {/* SIDEBAR (DESKTOP FIXED + MOBILE DRAWER) */}
      <Sidebar
        open={desktopOpen}
        setOpen={setDesktopOpen}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* MAIN CONTENT SCREEN */}
      <motion.div
        animate={{
          paddingLeft: isDesktop ? (desktopOpen ? 260 : 72) : 0,
        }}
        transition={{
          duration: 0.25,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="min-h-screen flex flex-col w-full max-w-full overflow-x-hidden"
      >
        <Topbar onOpenMobileMenu={() => setMobileOpen(true)} />

        <main className="flex-1 p-3 sm:p-4 lg:p-6 w-full max-w-full overflow-x-hidden">
          <Outlet />
        </main>
      </motion.div>
    </div>
  );
}
