import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import BalanceCard from "../components/dashboard/BalanceCard";
import StatsCards from "../components/dashboard/StatsCards";
import QuickActions from "../components/dashboard/QuickActions";
import BankCard from "../components/dashboard/BankCard";
import SpendingChart from "../components/dashboard/SpendingChart";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import { cardsData } from "../data/bankingData";

export default function Dashboard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="mx-auto max-w-[1600px] p-2 sm:p-4 lg:p-6"
    >
      <div className="grid gap-5 xl:grid-cols-[1fr_380px]">
        {/* LEFT AREA */}
        <div className="min-w-0 space-y-5">
          <StatsCards />

          <SpendingChart />

          <RecentTransactions />
        </div>

        {/* RIGHT AREA */}
        <div className="space-y-5">
          <BalanceCard />

          <QuickActions />

          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-sm font-bold text-neutral-900">My Cards</h3>

              <Link
                to="/cards"
                className="text-xs font-semibold text-teal-700 hover:text-teal-900 transition hover:underline"
              >
                Manage ({cardsData.length}) →
              </Link>
            </div>

            {/* RENDER BOTH CARDS (DEBIT & CREDIT) WITH 3D WOBBLE & FLIP EFFECT */}
            <div className="space-y-5">
              {cardsData.map((card) => (
                <BankCard key={card.id} card={card} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
