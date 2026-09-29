import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import {
  IconTrendingUp,
  IconShieldCheck,
  IconTarget,
  IconAlertCircle,
  IconSparkles,
  IconCreditCard,
  IconReceipt,
  IconArrowUpRight,
  IconArrowDownLeft,
} from "@tabler/icons-react";
import { categoryData, chartData } from "../data/bankingData";

export default function Analytics() {
  return (
    <div className="mx-auto max-w-[1600px] space-y-6">
      {/* HEADER */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-950">
            Financial Intelligence & Analytics
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400">
            Deep dive into your cash flow trends, budget health, and category spending
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-2xl bg-teal-50 px-3.5 py-1.5 border border-teal-200 text-xs font-bold text-teal-800">
          <IconSparkles size={16} className="text-teal-600" />
          Quantum AI Financial Advisor Active
        </div>
      </div>

      {/* HEALTH SCORE, CREDIT SCORE, MONTHLY SPENDS & QUICK METRICS */}
      <div className="grid gap-3.5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {/* 1. FINANCIAL HEALTH SCORE */}
        <div className="rounded-3xl border border-neutral-200/80 bg-white p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-500">Financial Health Score</span>
            <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
              Optimal
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-950">840</h3>
            <span className="text-xs text-neutral-400">/ 900</span>
          </div>
          <div className="mt-3 h-2 w-full rounded-full bg-neutral-100 overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-teal-500 to-emerald-400 w-[93%]" />
          </div>
          <p className="mt-2 text-[11px] text-neutral-500">
            Top tier score with consistent financial stability.
          </p>
        </div>

        {/* 2. CREDIT SCORE (CIBIL / EXPERIAN) */}
        <div className="rounded-3xl border border-neutral-200/80 bg-white p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-500">Credit Score (CIBIL)</span>
            <span className="rounded-md bg-teal-100 px-2 py-0.5 text-[10px] font-bold text-teal-800">
              Excellent
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-teal-800 font-mono">810</h3>
            <span className="text-xs text-neutral-400">/ 900</span>
          </div>
          <div className="mt-3 h-2 w-full rounded-full bg-neutral-100 overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-teal-600 to-teal-400 w-[90%]" />
          </div>
          <p className="mt-2 text-[11px] text-neutral-500">
            0 missed payments · 8.57% credit utilization.
          </p>
        </div>

        {/* 3. MONTHLY SPENDS */}
        <div className="rounded-3xl border border-neutral-200/80 bg-white p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-500">Monthly Spends</span>
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-neutral-100 text-neutral-700">
              <IconCreditCard size={14} />
            </span>
          </div>
          <h3 className="mt-3 text-2xl sm:text-3xl font-extrabold text-neutral-950 font-mono">
            ₹48,000
          </h3>
          <p className="mt-2 text-xs text-emerald-600 font-semibold">
            ₹12,000 under ₹60k budget
          </p>
          <p className="text-[11px] text-neutral-400 mt-0.5">
            Shopping, dining & utility bills
          </p>
        </div>

        {/* 4. AVERAGE MONTHLY SAVINGS */}
        <div className="rounded-3xl border border-neutral-200/80 bg-white p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-500">Avg Monthly Savings</span>
            <IconTrendingUp size={18} className="text-teal-600" />
          </div>
          <h3 className="mt-3 text-2xl sm:text-3xl font-extrabold text-neutral-950 font-mono">
            ₹36,500
          </h3>
          <p className="mt-2 text-xs text-emerald-600 font-semibold">
            +18.6% vs 6-month avg
          </p>
          <p className="text-[11px] text-neutral-400 mt-0.5">
            Auto-diverted into 6.85% vault
          </p>
        </div>

        {/* 5. INVESTMENT GROWTH RATE */}
        <div className="rounded-3xl border border-neutral-200/80 bg-white p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-500">Investment Growth</span>
            <IconTarget size={18} className="text-purple-600" />
          </div>
          <h3 className="mt-3 text-2xl sm:text-3xl font-extrabold text-purple-700 font-mono">
            +14.2% p.a.
          </h3>
          <p className="mt-2 text-xs text-neutral-500">
            Valuation: <span className="font-bold text-neutral-900 font-mono">₹5,42,850</span>
          </p>
          <p className="text-[11px] text-neutral-400 mt-0.5">
            SIPs & High-Yield Term Deposits
          </p>
        </div>
      </div>

      {/* CHARTS ROW */}
      <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
        {/* MONTHLY CASH FLOW BAR CHART */}
        <div className="rounded-3xl border border-neutral-200/80 bg-white p-6 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-neutral-950 text-base">Monthly Cash Flow Comparison</h3>
              <p className="text-xs text-neutral-400">Received Income vs Total Spending vs Savings</p>
            </div>
            <div className="flex items-center gap-3 text-xs font-medium text-neutral-600">
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-sm bg-[#14b8a6]" /> Received
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-sm bg-neutral-800" /> Spent
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-sm bg-[#8b5cf6]" /> Saved
              </span>
            </div>
          </div>

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#737373" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#a3a3a3" }} tickFormatter={(v) => `₹${v/1000}k`} />
                <Tooltip
                  cursor={{ fill: "#fafafa" }}
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-xl border border-neutral-200 bg-white p-3 shadow-xl">
                          <p className="text-xs font-bold text-neutral-900 mb-2 border-b pb-1">{label} 2026</p>
                          {payload.map((p, i) => (
                            <div key={i} className="flex justify-between gap-3 text-xs py-0.5">
                              <span className="text-neutral-500">{p.name}:</span>
                              <span className="font-mono font-bold text-neutral-900">
                                ₹{Number(p.value).toLocaleString("en-IN")}
                              </span>
                            </div>
                          ))}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="received" name="Received" fill="#14b8a6" radius={[6, 6, 0, 0]} />
                <Bar dataKey="expense" name="Expenses" fill="#262626" radius={[6, 6, 0, 0]} />
                <Bar dataKey="savings" name="Savings" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CATEGORY BREAKDOWN PIE CHART */}
        <div className="rounded-3xl border border-neutral-200/80 bg-white p-6 shadow-2xs flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-neutral-950 text-base">Expense By Category</h3>
            <p className="text-xs text-neutral-400">Total monthly expenditure: ₹31,500</p>

            <div className="my-2 h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val, name, item) => [`${val}% (${item.payload.amount})`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-neutral-100">
            {categoryData.map((cat) => (
              <div key={cat.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                  <span className="font-medium text-neutral-700">{cat.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-neutral-900 font-mono">{cat.amount}</span>
                  <span className="text-neutral-400 font-mono text-[11px]">({cat.value}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BUDGET GOALS */}
      <div className="rounded-3xl border border-neutral-200/80 bg-white p-6 shadow-2xs">
        <h3 className="font-bold text-neutral-950 text-base mb-4">Monthly Spending Budgets & Limits</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { cat: "Shopping", spent: 10500, budget: 15000, color: "bg-teal-500", pct: 70 },
            { cat: "Bills & Utilities", spent: 7850, budget: 9000, color: "bg-blue-500", pct: 87 },
            { cat: "Food & Dining", spent: 3780, budget: 8000, color: "bg-amber-500", pct: 47 },
            { cat: "Transport", spent: 2520, budget: 5000, color: "bg-purple-500", pct: 50 },
          ].map((b) => (
            <div key={b.cat} className="rounded-2xl border border-neutral-200/80 p-4 bg-neutral-50/50">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-neutral-900">{b.cat}</span>
                <span className="font-mono text-neutral-500">{b.pct}% spent</span>
              </div>
              <div className="mt-2.5 h-2 w-full rounded-full bg-neutral-200 overflow-hidden">
                <div className={`h-full rounded-full ${b.color}`} style={{ width: `${b.pct}%` }} />
              </div>
              <div className="mt-2 flex justify-between text-[11px] font-mono text-neutral-400">
                <span>₹{b.spent.toLocaleString("en-IN")}</span>
                <span>Cap: ₹{b.budget.toLocaleString("en-IN")}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
