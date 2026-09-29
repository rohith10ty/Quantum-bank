import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  IconCopy,
  IconCheck,
  IconArrowUpRight,
  IconFileText,
  IconBuildingBank,
  IconShieldCheck,
  IconTrendingUp,
  IconLock,
  IconChartPie,
  IconX,
  IconCalendar,
  IconPigMoney,
} from "@tabler/icons-react";
import { accountsData } from "../data/bankingData";

export default function Accounts() {
  const [accounts, setAccounts] = useState(accountsData);
  const [copiedId, setCopiedId] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [transferState, setTransferState] = useState({
    from: "acc_1",
    to: "acc_2",
    amount: "",
  });
  const [toastMessage, setToastMessage] = useState("");

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  const handleTransfer = (e) => {
    e.preventDefault();
    const amountNum = parseFloat(transferState.amount);
    if (!amountNum || amountNum <= 0) return;

    setAccounts((prev) =>
      prev.map((acc) => {
        if (acc.id === transferState.from) {
          return { ...acc, balance: acc.balance - amountNum };
        }
        if (acc.id === transferState.to) {
          return { ...acc, balance: acc.balance + amountNum };
        }
        return acc;
      })
    );

    setShowTransferModal(false);
    setTransferState({ from: "acc_1", to: "acc_2", amount: "" });
    showToast(`Transferred ₹${amountNum.toLocaleString("en-IN")} successfully!`);
  };

  const totalNetWorthINR = accounts.reduce((sum, acc) => {
    if (acc.currency === "INR") return sum + acc.balance;
    if (acc.currency === "USD") return sum + acc.balance * 85.5;
    return sum;
  }, 0);

  return (
    <div className="mx-auto max-w-[1600px] space-y-6">
      {/* TOAST FEEDBACK */}
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

      {/* TOP OVERVIEW BANNER */}
      <div className="relative overflow-hidden rounded-3xl bg-[#0b0b0b] p-6 sm:p-8 text-white shadow-xl">
        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-[#14b8a6]/20 px-3 py-1 text-xs font-semibold text-[#5eead4] border border-[#14b8a6]/30">
                Total Net Worth
              </span>
              <span className="flex items-center gap-1 text-xs text-neutral-400">
                <IconShieldCheck size={14} className="text-teal-400" /> DICGC & SEBI Regulated
              </span>
            </div>

            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight">
              ₹{totalNetWorthINR.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-neutral-400">
              Aggregated portfolio balance across your Savings, Fixed Deposit & Mutual Fund SIP accounts
            </p>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowTransferModal(true)}
              className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs sm:text-sm font-bold text-neutral-950 shadow-md transition hover:bg-neutral-100 active:scale-95 cursor-pointer"
            >
              <IconArrowUpRight size={16} stroke={2.2} />
              Transfer Between Accounts
            </button>

            <button
              onClick={() => showToast("e-Statement generated and sent to rohith.naidu@quantumbank.com")}
              className="flex items-center gap-2 rounded-xl bg-white/10 px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-white border border-white/15 transition hover:bg-white/20 active:scale-95 cursor-pointer"
            >
              <IconFileText size={16} />
              e-Statement
            </button>
          </div>
        </div>
      </div>

      {/* ACCOUNTS & INVESTMENTS GRID */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-neutral-950">Active Accounts & Portfolio</h3>
          <span className="text-xs text-neutral-500 font-medium">3 Accounts Active</span>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {accounts.map((acc, idx) => (
            <motion.div
              key={acc.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className="group relative flex flex-col justify-between rounded-2xl border border-neutral-200/80 bg-white p-5 sm:p-6 shadow-2xs hover:shadow-md transition-all hover:border-neutral-300 min-h-[310px]"
            >
              {/* TOP HEADER */}
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-100 text-neutral-900 group-hover:bg-[#14b8a6] group-hover:text-white transition-colors">
                      {acc.id === "acc_1" && <IconBuildingBank size={22} />}
                      {acc.id === "acc_2" && <IconLock size={22} />}
                      {acc.id === "acc_3" && <IconChartPie size={22} />}
                    </div>

                    <div>
                      <h4 className="font-bold text-neutral-900 text-sm sm:text-base leading-tight">
                        {acc.name}
                      </h4>
                      <p className="text-xs text-neutral-400 font-mono mt-1">
                        {acc.accountNumber}
                      </p>
                    </div>
                  </div>

                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] sm:text-[11px] font-bold text-emerald-700 whitespace-nowrap">
                    {acc.status}
                  </span>
                </div>

                {/* BALANCE & STATS BREAKDOWN */}
                <div className="mt-5 space-y-2">
                  <div>
                    <p className="text-xs font-medium text-neutral-400">
                      {acc.id === "acc_3"
                        ? "Current Portfolio Value"
                        : acc.id === "acc_2"
                        ? "Deposited Principal"
                        : "Available Balance"}
                    </p>
                    <p className="mt-0.5 text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-950 font-mono">
                      {acc.symbol}
                      {acc.balance.toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>

                  {/* SAVINGS ACCOUNT EXTRA INFO */}
                  {acc.id === "acc_1" && (
                    <div className="rounded-xl bg-neutral-50 p-2.5 border border-neutral-100 space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-neutral-500">Interest (ROI):</span>
                        <span className="font-bold font-mono text-emerald-600">{acc.roi}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-neutral-500">Interest Payout:</span>
                        <span className="font-medium text-neutral-700">Quarterly Compounded</span>
                      </div>
                    </div>
                  )}

                  {/* FIXED DEPOSIT EXTRA INFO */}
                  {acc.id === "acc_2" && (
                    <div className="rounded-xl bg-neutral-50 p-2.5 border border-neutral-100 space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-neutral-500">Invested on:</span>
                        <span className="font-semibold text-neutral-800">{acc.investmentDate}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-neutral-500">Interest Rate (ROI):</span>
                        <span className="font-bold font-mono text-emerald-600">{acc.roi}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-neutral-500">Accrued Gain so far:</span>
                        <span className="font-bold font-mono text-teal-700">+₹{acc.accruedInterest.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-neutral-500">Maturity Value:</span>
                        <span className="font-bold font-mono text-neutral-900">₹{acc.maturityValue.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                      </div>
                    </div>
                  )}

                  {/* MUTUAL FUNDS EXTRA INFO */}
                  {acc.id === "acc_3" && (
                    <div className="rounded-xl bg-neutral-50 p-2.5 border border-neutral-100 space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-neutral-500">Monthly SIP:</span>
                        <span className="font-bold text-teal-800">₹25,000 / month</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-neutral-500">Total Profit / Return:</span>
                        <span className="font-bold font-mono text-emerald-600">+₹65,000 (+23.6%)</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-neutral-500">Annual ROI (CAGR):</span>
                        <span className="font-bold font-mono text-emerald-600">{acc.roi}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* FOOTER ROW: ALWAYS ALIGNED WITH VIEW DETAILS ON THE RIGHT */}
              <div className="mt-5 pt-3.5 border-t border-neutral-100 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {acc.id === "acc_1" && acc.upiId && (
                    <button
                      onClick={() => copyToClipboard(acc.upiId, `upi-${acc.id}`)}
                      className="flex items-center gap-1 rounded-lg bg-neutral-100 px-2 py-1 text-[11px] font-medium text-neutral-700 hover:bg-neutral-200 transition cursor-pointer"
                    >
                      {copiedId === `upi-${acc.id}` ? (
                        <IconCheck size={12} className="text-teal-600" />
                      ) : (
                        <IconCopy size={12} />
                      )}
                      UPI ID
                    </button>
                  )}

                  {acc.id === "acc_2" && (
                    <span className="flex items-center gap-1 rounded-lg bg-amber-50 px-2 py-1 text-[11px] font-semibold text-amber-700 border border-amber-200/60">
                      <IconCalendar size={12} />
                      Matures Nov 2027
                    </span>
                  )}

                  {acc.id === "acc_3" && (
                    <span className="flex items-center gap-1 rounded-lg bg-teal-50 px-2 py-1 text-[11px] font-semibold text-teal-700 border border-teal-200/60">
                      <IconTrendingUp size={12} />
                      Auto-Debit 5th
                    </span>
                  )}
                </div>

                <button
                  onClick={() => setSelectedAccount(acc)}
                  className="text-xs font-bold text-teal-700 hover:text-teal-900 transition hover:underline cursor-pointer ml-auto"
                >
                  View Details →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ACCOUNT DETAILS MODAL (COMPACT 2-COLUMN NO-SCROLL LAYOUT) */}
      <AnimatePresence>
        {selectedAccount && (
          <div
            onClick={() => setSelectedAccount(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs cursor-pointer"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-xl sm:max-w-2xl rounded-3xl bg-white p-6 shadow-2xl border border-neutral-200 cursor-default"
            >
              {/* MODAL HEADER */}
              <div className="flex items-center justify-between pb-3.5 border-b border-neutral-100">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-700 font-bold">
                    QB
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-neutral-900">{selectedAccount.name}</h3>
                    <p className="text-xs text-neutral-400">{selectedAccount.type}</p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedAccount(null)}
                  className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 cursor-pointer"
                >
                  <IconX size={20} />
                </button>
              </div>

              {/* MODAL CONTENT PER ACCOUNT TYPE */}
              <div className="mt-4 space-y-3">
                {/* 1. SAVINGS ACCOUNT DETAILS */}
                {selectedAccount.id === "acc_1" && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs sm:text-sm">
                      <div className="flex justify-between py-1.5 border-b border-neutral-100">
                        <span className="text-neutral-500">Account Number</span>
                        <span className="font-mono font-bold text-neutral-900">{selectedAccount.accountNumber}</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-neutral-100">
                        <span className="text-neutral-500">Interest (ROI)</span>
                        <span className="font-bold text-emerald-600 font-mono">{selectedAccount.roi || "6.85% p.a."}</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-neutral-100">
                        <span className="text-neutral-500">UPI Virtual Address</span>
                        <span className="font-semibold text-neutral-900">{selectedAccount.upiId}</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-neutral-100">
                        <span className="text-neutral-500">IFSC Code</span>
                        <span className="font-mono font-semibold text-neutral-900">{selectedAccount.ifsc}</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-neutral-100">
                        <span className="text-neutral-500">Branch Name</span>
                        <span className="font-semibold text-neutral-900">Quantum Central, BLR</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-neutral-100">
                        <span className="text-neutral-500">Nominee Registered</span>
                        <span className="font-semibold text-emerald-600">Yes (Kavita Rao)</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between rounded-2xl bg-teal-50/70 p-3.5 border border-teal-100/80 mt-2">
                      <div>
                        <span className="text-xs font-bold text-teal-950 block">Available Instant Balance</span>
                        <span className="text-[11px] text-teal-700">Quarterly Compounded Interest Payout</span>
                      </div>
                      <span className="font-mono font-extrabold text-teal-900 text-xl">
                        ₹{selectedAccount.balance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </>
                )}

                {/* 2. FIXED DEPOSIT (FD) DETAILS */}
                {selectedAccount.id === "acc_2" && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs sm:text-sm">
                      <div className="flex justify-between py-1.5 border-b border-neutral-100">
                        <span className="text-neutral-500">Deposit FD Number</span>
                        <span className="font-mono font-bold text-neutral-900">{selectedAccount.accountNumber}</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-neutral-100">
                        <span className="text-neutral-500">Tenure</span>
                        <span className="font-bold text-neutral-900 font-mono">3 Years</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-neutral-100">
                        <span className="text-neutral-500">Date of Investment</span>
                        <span className="font-semibold text-neutral-900">Nov 14, 2024</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-neutral-100">
                        <span className="text-neutral-500">Maturity Date</span>
                        <span className="font-semibold text-neutral-900">Nov 14, 2027</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-neutral-100">
                        <span className="text-neutral-500">Principal Deposited</span>
                        <span className="font-mono font-bold text-neutral-900">
                          ₹{(selectedAccount.principal || 500000).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-neutral-100">
                        <span className="text-neutral-500">Interest Rate (ROI)</span>
                        <span className="font-bold text-emerald-600 font-mono">7.80% p.a. (Quarterly)</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-neutral-100">
                        <span className="text-neutral-500">Gain Till Now</span>
                        <span className="font-mono font-bold text-teal-700">+₹77,697.00</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-neutral-100">
                        <span className="text-neutral-500">Current Valuation</span>
                        <span className="font-mono font-bold text-neutral-900">₹5,77,697.00</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between rounded-2xl bg-teal-50/70 p-3.5 border border-teal-100/80 mt-2">
                      <div>
                        <span className="text-xs font-bold text-teal-950 block">Total Value on Maturity (Nov 14, 2027)</span>
                        <span className="text-[11px] text-teal-700 font-medium">Total Profit: +₹1,30,426.00 (+26.09% Total ROI)</span>
                      </div>
                      <span className="font-mono font-extrabold text-teal-900 text-xl">₹6,30,426.00</span>
                    </div>

                    <div className="flex justify-between text-xs text-neutral-500 pt-1">
                      <span>Nominee Registered: <strong className="text-emerald-700">Yes (Kavita Rao)</strong></span>
                      <span>Status: <strong className="text-neutral-800">Locked / Accruing</strong></span>
                    </div>
                  </>
                )}

                {/* 3. MUTUAL FUNDS (SIP) DETAILS */}
                {selectedAccount.id === "acc_3" && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs sm:text-sm">
                      <div className="flex justify-between py-1.5 border-b border-neutral-100">
                        <span className="text-neutral-500">Mutual Fund Folio</span>
                        <span className="font-mono font-bold text-neutral-900">{selectedAccount.accountNumber}</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-neutral-100">
                        <span className="text-neutral-500">Monthly SIP Mandate</span>
                        <span className="font-bold text-teal-800 font-mono">₹25,000 / month</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-neutral-100">
                        <span className="text-neutral-500">Total Invested</span>
                        <span className="font-mono font-bold text-neutral-900">₹2,75,000.00</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-neutral-100">
                        <span className="text-neutral-500">Current Value</span>
                        <span className="font-mono font-bold text-teal-700">₹3,40,000.00</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-neutral-100">
                        <span className="text-neutral-500">Profit Gain Till Now</span>
                        <span className="font-mono font-bold text-emerald-600">+₹65,000.00 (+23.6%)</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-neutral-100">
                        <span className="text-neutral-500">Annual ROI (CAGR)</span>
                        <span className="font-bold text-emerald-600 font-mono">+16.4% p.a.</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between rounded-2xl bg-teal-50/70 p-3.5 border border-teal-100/80 mt-2">
                      <div>
                        <span className="text-xs font-bold text-teal-950 block">Projected 3-Year Target Value</span>
                        <span className="text-[11px] text-teal-700 font-medium">Auto-Debit Scheduled on 5th of every month</span>
                      </div>
                      <span className="font-mono font-extrabold text-teal-900 text-xl">₹11,85,000.00</span>
                    </div>

                    <div className="flex justify-between text-xs text-neutral-500 pt-1">
                      <span>Nominee Registered: <strong className="text-emerald-700">Yes (Kavita Rao)</strong></span>
                      <span>Auto-Debit: <strong className="text-teal-700">Active (5th of Month)</strong></span>
                    </div>
                  </>
                )}
              </div>

              {/* MODAL ACTIONS */}
              <div className="mt-4 pt-3 border-t border-neutral-100 flex gap-3">
                <button
                  onClick={() => {
                    setSelectedAccount(null);
                    setShowTransferModal(true);
                  }}
                  className="flex-1 rounded-xl bg-neutral-950 py-2.5 text-center text-xs font-bold text-white shadow-md hover:bg-neutral-800 transition cursor-pointer"
                >
                  Transfer Funds
                </button>
                <button
                  onClick={() => setSelectedAccount(null)}
                  className="rounded-xl border border-neutral-200 px-5 py-2.5 text-xs font-bold text-neutral-700 hover:bg-neutral-50 transition cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* TRANSFER MODAL */}
      <AnimatePresence>
        {showTransferModal && (
          <div
            onClick={() => setShowTransferModal(false)}
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
                <h3 className="text-lg font-bold text-neutral-900">Transfer Between Accounts</h3>
                <button
                  onClick={() => setShowTransferModal(false)}
                  className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-100 cursor-pointer"
                >
                  <IconX size={20} />
                </button>
              </div>

              <form onSubmit={handleTransfer} className="mt-5 space-y-4">
                <div>
                  <label className="text-xs font-bold text-neutral-700">From Account</label>
                  <select
                    value={transferState.from}
                    onChange={(e) => setTransferState({ ...transferState, from: e.target.value })}
                    className="mt-1.5 w-full rounded-xl border border-neutral-200 bg-neutral-50 p-3 text-xs sm:text-sm font-semibold text-neutral-900 outline-none focus:border-neutral-950 focus:bg-white cursor-pointer"
                  >
                    {accounts.map((acc) => (
                      <option key={acc.id} value={acc.id}>
                        {acc.name} ({acc.symbol}{acc.balance.toLocaleString("en-IN")})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-700">To Account</label>
                  <select
                    value={transferState.to}
                    onChange={(e) => setTransferState({ ...transferState, to: e.target.value })}
                    className="mt-1.5 w-full rounded-xl border border-neutral-200 bg-neutral-50 p-3 text-xs sm:text-sm font-semibold text-neutral-900 outline-none focus:border-neutral-950 focus:bg-white cursor-pointer"
                  >
                    {accounts
                      .filter((a) => a.id !== transferState.from)
                      .map((acc) => (
                        <option key={acc.id} value={acc.id}>
                          {acc.name} ({acc.symbol}{acc.balance.toLocaleString("en-IN")})
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-700">Transfer Amount (₹)</label>
                  <div className="relative mt-1.5">
                    <span className="absolute left-3.5 top-3 text-sm font-bold text-neutral-400">₹</span>
                    <input
                      type="number"
                      placeholder="e.g. 10000"
                      value={transferState.amount}
                      onChange={(e) => setTransferState({ ...transferState, amount: e.target.value })}
                      className="w-full rounded-xl border border-neutral-200 bg-white py-3 pl-8 pr-4 text-sm font-bold font-mono text-neutral-900 outline-none focus:border-neutral-950 focus:ring-2 focus:ring-neutral-200"
                      required
                    />
                  </div>
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 rounded-xl bg-gradient-to-tr from-neutral-900 to-neutral-950 py-3 text-xs font-bold text-white shadow-md hover:shadow-lg transition active:scale-98 cursor-pointer"
                  >
                    Confirm Instant Transfer
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowTransferModal(false)}
                    className="rounded-xl border border-neutral-200 px-4 py-3 text-xs font-bold text-neutral-700 hover:bg-neutral-50 transition cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
