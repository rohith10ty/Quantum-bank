import React from "react";
import { motion } from "motion/react";
import {
  IconArrowDownLeft,
  IconArrowUpRight,
  IconReceipt2,
  IconChartLine,
} from "@tabler/icons-react";

const stats = [
  {
    title: "Amount Received",
    value: "₹1,88,000",
    change: "+14.5%",
    icon: IconArrowDownLeft,
    badgeColor: "text-[#0f766e] bg-teal-50",
  },
  {
    title: "Amount Sent",
    value: "₹48,000",
    change: "-2.4%",
    icon: IconArrowUpRight,
    badgeColor: "text-blue-700 bg-blue-50",
  },
  {
    title: "Expenses",
    value: "₹31,500",
    change: "-4.2%",
    icon: IconReceipt2,
    badgeColor: "text-neutral-700 bg-neutral-100",
  },
  {
    title: "Investments",
    value: "₹42,850",
    change: "+7.1%",
    icon: IconChartLine,
    badgeColor: "text-amber-700 bg-amber-50",
  },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-2 gap-3.5 xl:grid-cols-4">
      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
          <motion.div
            key={item.title}
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.04 + index * 0.05,
              duration: 0.35,
            }}
            whileHover={{
              y: -3,
            }}
            className="rounded-2xl border border-neutral-200/80 bg-white p-4 sm:p-5 transition-all hover:shadow-[0_12px_30px_rgba(0,0,0,0.05)] hover:border-neutral-300"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 text-neutral-800">
                <Icon size={19} stroke={1.8} />
              </div>

              <span className={`rounded-md px-2 py-0.5 text-[10px] font-semibold ${item.badgeColor}`}>
                {item.change}
              </span>
            </div>

            <p className="mt-4 text-xs font-medium text-neutral-400">{item.title}</p>

            <p className="mt-1 text-xl sm:text-2xl font-bold tracking-tight text-neutral-950">
              {item.value}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}
