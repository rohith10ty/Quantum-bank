import React, { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { chartData } from "../../data/bankingData";

const metricConfigs = {
  received: {
    label: "Amount Received",
    color: "#14b8a6",
    gradientId: "receivedGrad",
  },
  sent: {
    label: "Amount Sent",
    color: "#0ea5e9",
    gradientId: "sentGrad",
  },
  expense: {
    label: "Expenses",
    color: "#f43f5e", // Changed from black to vibrant coral rose to prevent mixing with dark button
    gradientId: "expenseGrad",
  },
  investments: {
    label: "Investments",
    color: "#f59e0b",
    gradientId: "investGrad",
  },
};

export default function SpendingChart() {
  const [activeMetrics, setActiveMetrics] = useState([
    "received",
    "sent",
    "expense",
    "investments",
  ]);

  const toggleMetric = (key) => {
    if (activeMetrics.includes(key)) {
      if (activeMetrics.length > 1) {
        setActiveMetrics(activeMetrics.filter((m) => m !== key));
      }
    } else {
      setActiveMetrics([...activeMetrics, key]);
    }
  };

  return (
    <div className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-2xs">
      {/* HEADER & 4 METRIC TOGGLES */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold tracking-tight text-neutral-950">
              Financial Overview & Comparison
            </h3>
            <span className="rounded-full bg-teal-50 px-2.5 py-0.5 text-[10px] font-bold text-teal-800 border border-teal-200/50">
              2026 Year Overview
            </span>
          </div>
          <p className="mt-0.5 text-xs text-neutral-400">
            Jan – Sep (Recorded Active) • Oct – Dec (Upcoming Months)
          </p>
        </div>

        {/* 4 METRIC TOGGLE BUTTONS */}
        <div className="flex flex-wrap items-center gap-1.5">
          {Object.entries(metricConfigs).map(([key, config]) => {
            const isActive = activeMetrics.includes(key);
            return (
              <button
                key={key}
                onClick={() => toggleMetric(key)}
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                  isActive
                    ? "bg-neutral-900 text-white shadow-xs"
                    : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200 hover:text-neutral-800"
                }`}
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: config.color }}
                />
                {config.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* CHART */}
      <div className="mt-6 h-[290px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
            <defs>
              <linearGradient id="receivedGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#14b8a6" stopOpacity={0.0} />
              </linearGradient>

              <linearGradient id="sentGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.22} />
                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.0} />
              </linearGradient>

              <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.18} />
                <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.0} />
              </linearGradient>

              <linearGradient id="investGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f0f0f0"
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 11,
                fill: "#737373",
                fontWeight: 500,
              }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 11,
                fill: "#a3a3a3",
              }}
              tickFormatter={(value) => `₹${value / 1000}k`}
            />

            <Tooltip
              cursor={{
                stroke: "#d4d4d4",
                strokeDasharray: "4 4",
              }}
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const hasData = payload.some((p) => p.value !== null && p.value !== undefined);
                  return (
                    <div className="rounded-xl border border-neutral-200 bg-white/95 p-3 shadow-xl backdrop-blur-md">
                      <p className="font-semibold text-neutral-900 text-xs mb-2 border-b border-neutral-100 pb-1">
                        {label} 2026 Overview
                      </p>
                      {hasData ? (
                        <div className="space-y-1.5">
                          {payload
                            .filter((p) => p.value !== null && p.value !== undefined)
                            .map((entry, index) => {
                              const config = metricConfigs[entry.dataKey];
                              return (
                                <div
                                  key={`item-${index}`}
                                  className="flex items-center justify-between gap-4 text-xs"
                                >
                                  <div className="flex items-center gap-1.5">
                                    <span
                                      className="h-2 w-2 rounded-full"
                                      style={{ backgroundColor: entry.color }}
                                    />
                                    <span className="text-neutral-600">
                                      {config ? config.label : entry.name}:
                                    </span>
                                  </div>
                                  <span className="font-bold text-neutral-900 font-mono">
                                    ₹{Number(entry.value).toLocaleString("en-IN")}
                                  </span>
                                </div>
                              );
                            })}
                        </div>
                      ) : (
                        <p className="text-xs text-neutral-400 italic">
                          Upcoming month • Projected data
                        </p>
                      )}
                    </div>
                  );
                }
                return null;
              }}
            />

            {activeMetrics.includes("received") && (
              <Area
                type="monotone"
                dataKey="received"
                name="Amount Received"
                stroke="#14b8a6"
                strokeWidth={2.5}
                fill="url(#receivedGrad)"
                connectNulls={false}
                animationDuration={1000}
              />
            )}

            {activeMetrics.includes("sent") && (
              <Area
                type="monotone"
                dataKey="sent"
                name="Amount Sent"
                stroke="#0ea5e9"
                strokeWidth={2}
                fill="url(#sentGrad)"
                connectNulls={false}
                animationDuration={1100}
              />
            )}

            {activeMetrics.includes("expense") && (
              <Area
                type="monotone"
                dataKey="expense"
                name="Expenses"
                stroke="#f43f5e"
                strokeWidth={2.2}
                fill="url(#expenseGrad)"
                connectNulls={false}
                animationDuration={1200}
              />
            )}

            {activeMetrics.includes("investments") && (
              <Area
                type="monotone"
                dataKey="investments"
                name="Investments"
                stroke="#f59e0b"
                strokeWidth={2}
                fill="url(#investGrad)"
                connectNulls={false}
                animationDuration={1300}
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
