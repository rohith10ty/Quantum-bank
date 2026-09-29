import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  IconSearch,
  IconDownload,
  IconFilter,
  IconArrowDownLeft,
  IconArrowUpRight,
  IconBrandApple,
  IconBriefcase,
  IconDeviceTv,
  IconBrandAmazon,
  IconUser,
  IconTrendingUp,
  IconReceipt,
  IconCup,
  IconCode,
  IconCar,
  IconX,
  IconCheck,
  IconShare,
  IconPrinter,
  IconFileText,
  IconChartLine,
  IconCalendar,
} from "@tabler/icons-react";
import { transactions } from "../data/bankingData";

const iconMap = {
  Apple: IconBrandApple,
  Salary: IconBriefcase,
  Netflix: IconDeviceTv,
  Amazon: IconBrandAmazon,
  User: IconUser,
  Invest: IconTrendingUp,
  Utility: IconReceipt,
  Coffee: IconCup,
  Code: IconCode,
  Car: IconCar,
};

// ONLY 3 CATEGORIES AS REQUESTED
const categories = ["All", "Credits", "Debits"];

export default function Transactions() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTx, setSelectedTx] = useState(null);
  const [showMonthStatementModal, setShowMonthStatementModal] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchesSearch =
        tx.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.ref.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (selectedCategory === "All") return true;
      if (selectedCategory === "Credits") return tx.type === "credit";
      if (selectedCategory === "Debits") return tx.type === "debit";
      return true;
    });
  }, [searchQuery, selectedCategory]);

  const handleExportCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Reference,Date,Merchant,Category,Type,Amount,Status"]
        .concat(
          transactions.map(
            (t) =>
              `${t.ref},${t.date},"${t.name}",${t.category},${t.type},${t.amount},${t.status}`
          )
        )
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "quantum_september_2026_statement.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setToastMessage("Exported September 2026 statement to CSV!");
    setTimeout(() => setToastMessage(""), 3500);
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

      {/* TOP STATS BANNER: 4 CARDS (MATCHES DASHBOARD FIGURES) */}
      <div className="grid grid-cols-2 gap-3.5 lg:grid-cols-4">
        {/* 1. TOTAL INFLOW */}
        <div className="rounded-2xl border border-neutral-200/80 bg-white p-4 sm:p-5 shadow-2xs hover:border-neutral-300 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-500">Total Inflow</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
              <IconArrowDownLeft size={18} stroke={2} />
            </div>
          </div>
          <p className="mt-3 text-2xl sm:text-3xl font-extrabold text-teal-700 font-mono tracking-tight">
            +₹1,88,000
          </p>
          <p className="mt-1 text-xs text-neutral-400">Total Credits this month</p>
        </div>

        {/* 2. TOTAL OUTFLOW */}
        <div className="rounded-2xl border border-neutral-200/80 bg-white p-4 sm:p-5 shadow-2xs hover:border-neutral-300 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-500">Total Outflow</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-neutral-100 text-neutral-800">
              <IconArrowUpRight size={18} stroke={2} />
            </div>
          </div>
          <p className="mt-3 text-2xl sm:text-3xl font-extrabold text-neutral-950 font-mono tracking-tight">
            -₹48,000
          </p>
          <p className="mt-1 text-xs text-neutral-400">Across Shopping & Expenses</p>
        </div>

        {/* 3. THIS MONTH SALARY */}
        <div className="rounded-2xl border border-neutral-200/80 bg-white p-4 sm:p-5 shadow-2xs hover:border-neutral-300 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-500">This Month Salary</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
              <IconBriefcase size={18} stroke={2} />
            </div>
          </div>
          <p className="mt-3 text-2xl sm:text-3xl font-extrabold text-neutral-950 font-mono tracking-tight">
            ₹1,40,000
          </p>
          <p className="mt-1 text-xs text-emerald-600 font-medium">Credited Sep 01 · Primary Employer</p>
        </div>

        {/* 4. THIS MONTH INVESTED */}
        <div className="rounded-2xl border border-neutral-200/80 bg-white p-4 sm:p-5 shadow-2xs hover:border-neutral-300 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-500">This Month Invested</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
              <IconChartLine size={18} stroke={2} />
            </div>
          </div>
          <p className="mt-3 text-2xl sm:text-3xl font-extrabold text-neutral-950 font-mono tracking-tight">
            ₹25,000
          </p>
          <p className="mt-1 text-xs text-teal-700 font-medium">Mutual Funds SIP & Wealth Lock</p>
        </div>
      </div>

      {/* FILTER, SEARCH BAR & STATEMENT OPTION */}
      <div className="rounded-2xl border border-neutral-200/80 bg-white p-4 sm:p-5 shadow-2xs space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <IconSearch size={17} className="absolute left-3.5 top-3 text-neutral-400" />
            <input
              type="text"
              placeholder="Search by merchant, ref ID, category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2.5 pl-10 pr-4 text-xs sm:text-sm font-medium outline-none focus:border-neutral-950 focus:bg-white"
            />
          </div>

          {/* Statement Action Buttons */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={() => setShowMonthStatementModal(true)}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-neutral-200/80 bg-white px-3.5 py-2.5 text-xs sm:text-sm font-bold text-neutral-800 shadow-2xs hover:bg-neutral-50 transition active:scale-95 cursor-pointer"
            >
              <IconFileText size={16} className="text-teal-700" />
              Full Month Statement
            </button>

            <button
              onClick={handleExportCSV}
              className="flex items-center justify-center gap-1.5 rounded-xl bg-neutral-950 px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-xs hover:bg-neutral-800 transition active:scale-95 cursor-pointer"
            >
              <IconDownload size={16} />
              Export Statement (.CSV)
            </button>
          </div>
        </div>

        {/* ONLY ALL, CREDITS, DEBITS FILTERS */}
        <div className="flex items-center gap-2 pt-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition cursor-pointer ${
                selectedCategory === cat
                  ? "bg-neutral-950 text-white shadow-xs"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* TRANSACTIONS TABLE */}
      <div className="overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-2xs">
        <div className="p-4 sm:p-5 border-b border-neutral-100 flex items-center justify-between">
          <h3 className="font-bold text-neutral-950 text-base">
            Transaction Activity ({filteredTransactions.length})
          </h3>
          <span className="text-xs text-neutral-400">Click any transaction for digital receipt</span>
        </div>

        <div className="divide-y divide-neutral-100">
          {filteredTransactions.map((tx, idx) => {
            const IconComponent = iconMap[tx.icon] || IconUser;
            const isCredit = tx.type === "credit";

            return (
              <motion.div
                key={tx.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.02 }}
                onClick={() => setSelectedTx(tx)}
                className="group flex cursor-pointer items-center justify-between p-4 sm:px-6 transition hover:bg-neutral-50/80"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl font-bold ${
                      isCredit
                        ? "bg-teal-50 text-teal-700"
                        : "bg-neutral-100 text-neutral-800 group-hover:bg-neutral-200"
                    }`}
                  >
                    <IconComponent size={20} stroke={1.8} />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-neutral-900 group-hover:text-teal-700 transition">
                      {tx.name}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 mt-0.5 text-[11px] text-neutral-400">
                      <span>{tx.date}</span>
                      <span>•</span>
                      <span className="font-mono">{tx.ref}</span>
                      <span>•</span>
                      <span className="rounded bg-neutral-100 px-1.5 py-0.5 text-neutral-600 font-medium">
                        {tx.method}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right ml-4 shrink-0">
                  <p
                    className={`text-sm sm:text-base font-extrabold font-mono ${
                      isCredit ? "text-teal-700" : "text-neutral-950"
                    }`}
                  >
                    {isCredit ? "+" : "-"}₹{tx.amount.toLocaleString("en-IN")}
                  </p>
                  <span className="inline-block rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 mt-0.5">
                    {tx.status}
                  </span>
                </div>
              </motion.div>
            );
          })}

          {filteredTransactions.length === 0 && (
            <div className="p-12 text-center text-neutral-400">
              <IconFilter size={32} className="mx-auto mb-2 text-neutral-300" />
              <p className="font-semibold text-neutral-700 text-sm">No transactions match your filter</p>
              <p className="text-xs mt-1">Try switching to 'All' or clearing search</p>
            </div>
          )}
        </div>
      </div>

      {/* FULL MONTH STATEMENT MODAL */}
      <AnimatePresence>
        {showMonthStatementModal && (
          <div
            onClick={() => setShowMonthStatementModal(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs cursor-pointer"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-2xl rounded-3xl bg-white p-6 sm:p-7 shadow-2xl border border-neutral-200 cursor-default"
            >
              {/* STATEMENT HEADER */}
              <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-50 text-teal-700 font-extrabold text-sm">
                    QB
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-neutral-950">Full Monthly Statement</h3>
                    <p className="text-xs text-neutral-400">Statement Period: September 01, 2026 – September 30, 2026</p>
                  </div>
                </div>

                <button
                  onClick={() => setShowMonthStatementModal(false)}
                  className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 cursor-pointer"
                >
                  <IconX size={20} />
                </button>
              </div>

              {/* STATEMENT SUMMARY CARDS */}
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="rounded-2xl bg-neutral-50 p-3 border border-neutral-100">
                  <span className="text-[11px] text-neutral-500 font-medium block">Opening Balance</span>
                  <span className="font-mono font-bold text-neutral-900 text-sm sm:text-base">₹2,05,657.00</span>
                </div>
                <div className="rounded-2xl bg-teal-50/60 p-3 border border-teal-100">
                  <span className="text-[11px] text-teal-800 font-medium block">Total Inflows</span>
                  <span className="font-mono font-bold text-teal-800 text-sm sm:text-base">+₹1,88,000.00</span>
                </div>
                <div className="rounded-2xl bg-neutral-50 p-3 border border-neutral-100">
                  <span className="text-[11px] text-neutral-500 font-medium block">Total Outflows</span>
                  <span className="font-mono font-bold text-neutral-900 text-sm sm:text-base">-₹48,000.00</span>
                </div>
                <div className="rounded-2xl bg-teal-50/60 p-3 border border-teal-100">
                  <span className="text-[11px] text-teal-800 font-medium block">Closing Balance</span>
                  <span className="font-mono font-bold text-teal-900 text-sm sm:text-base">₹3,45,657.00</span>
                </div>
              </div>

              {/* MONTH BREAKDOWN STATS */}
              <div className="my-4 space-y-2 text-xs">
                <div className="flex justify-between py-2 border-b border-neutral-100">
                  <span className="text-neutral-500">Monthly Salary Credited</span>
                  <span className="font-mono font-bold text-neutral-900">₹1,40,000.00 (TechCorp Global)</span>
                </div>
                <div className="flex justify-between py-2 border-b border-neutral-100">
                  <span className="text-neutral-500">Other Inflows / Consulting</span>
                  <span className="font-mono font-bold text-neutral-900">₹48,000.00</span>
                </div>
                <div className="flex justify-between py-2 border-b border-neutral-100">
                  <span className="text-neutral-500">Systematic Mutual Fund SIP</span>
                  <span className="font-mono font-bold text-teal-700">₹25,000.00 (Auto-debit 5th)</span>
                </div>
                <div className="flex justify-between py-2 border-b border-neutral-100">
                  <span className="text-neutral-500">Lifestyle & E-Commerce Spend</span>
                  <span className="font-mono font-bold text-neutral-900">₹23,000.00</span>
                </div>
              </div>

              {/* MODAL ACTIONS */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => {
                    handleExportCSV();
                    setShowMonthStatementModal(false);
                  }}
                  className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-neutral-950 py-3 text-xs font-bold text-white shadow-md hover:bg-neutral-800 transition cursor-pointer"
                >
                  <IconDownload size={15} />
                  Download Statement (.CSV)
                </button>
                <button
                  onClick={() => {
                    setShowMonthStatementModal(false);
                    setToastMessage("Generated official e-Statement PDF for September 2026!");
                    setTimeout(() => setToastMessage(""), 3500);
                  }}
                  className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-neutral-200 bg-white py-3 text-xs font-bold text-neutral-800 shadow-2xs hover:bg-neutral-50 transition cursor-pointer"
                >
                  <IconPrinter size={15} />
                  Print / Save PDF
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* RECEIPT MODAL */}
      <AnimatePresence>
        {selectedTx && (
          <div
            onClick={() => setSelectedTx(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs cursor-pointer"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md rounded-3xl bg-white p-6 sm:p-7 shadow-2xl border border-neutral-200 cursor-default"
            >
              <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#14b8a6]" />
                  <h3 className="text-sm font-bold tracking-wider text-neutral-400 uppercase">
                    Quantum Digital Receipt
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedTx(null)}
                  className="rounded-lg p-1 text-neutral-400 hover:bg-neutral-100 cursor-pointer"
                >
                  <IconX size={20} />
                </button>
              </div>

              <div className="my-6 text-center">
                <p className="text-xs font-medium text-neutral-400">Total Transaction Amount</p>
                <h2
                  className={`text-3xl font-extrabold font-mono mt-1 ${
                    selectedTx.type === "credit" ? "text-teal-700" : "text-neutral-950"
                  }`}
                >
                  {selectedTx.type === "credit" ? "+" : "-"}₹
                  {selectedTx.amount.toLocaleString("en-IN")}
                </h2>
                <span className="inline-block mt-2 rounded-full bg-emerald-100 px-3 py-0.5 text-xs font-bold text-emerald-800">
                  ✓ {selectedTx.status} & Settled
                </span>
              </div>

              <div className="rounded-2xl bg-neutral-50 p-4 space-y-2.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Merchant / Beneficiary:</span>
                  <span className="font-bold text-neutral-900">{selectedTx.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Category:</span>
                  <span className="font-semibold text-neutral-900">{selectedTx.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Payment Instrument:</span>
                  <span className="font-semibold text-neutral-900">{selectedTx.method}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Timestamp:</span>
                  <span className="font-semibold text-neutral-900">{selectedTx.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Ref / UTR Number:</span>
                  <span className="font-mono font-bold text-neutral-900">{selectedTx.ref}</span>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => {
                    setSelectedTx(null);
                    setToastMessage("Receipt PDF downloaded to device!");
                    setTimeout(() => setToastMessage(""), 3000);
                  }}
                  className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-neutral-950 py-3 text-xs font-bold text-white shadow-md hover:bg-neutral-800 transition cursor-pointer"
                >
                  <IconPrinter size={15} />
                  Print Receipt
                </button>
                <button
                  onClick={() => {
                    setSelectedTx(null);
                    setToastMessage("Transaction details copied to clipboard!");
                    setTimeout(() => setToastMessage(""), 3000);
                  }}
                  className="flex items-center gap-1.5 rounded-xl border border-neutral-200 px-4 py-3 text-xs font-bold text-neutral-700 hover:bg-neutral-50 transition cursor-pointer"
                >
                  <IconShare size={15} />
                  Share
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
