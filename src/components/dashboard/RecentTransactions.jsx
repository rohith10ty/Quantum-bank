import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  IconArrowRight,
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
} from "@tabler/icons-react";
import { transactions } from "../../data/bankingData";

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

export default function RecentTransactions() {
  return (
    <div className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-2xs">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold tracking-tight text-neutral-950">
            Recent Transactions
          </h3>
          <p className="mt-0.5 text-xs text-neutral-400">Latest debits, credits, and salary deposits</p>
        </div>

        <Link
          to="/transactions"
          className="flex items-center gap-1 text-xs font-semibold text-teal-700 hover:text-teal-800 transition"
        >
          View all
          <IconArrowRight size={14} />
        </Link>
      </div>

      <div className="mt-4 divide-y divide-neutral-100">
        {transactions.slice(0, 5).map((transaction, index) => {
          const IconComponent = iconMap[transaction.icon] || IconUser;
          const isCredit = transaction.type === "credit";

          return (
            <motion.div
              key={transaction.id}
              initial={{
                opacity: 0,
                x: -8,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: 0.05 + index * 0.04,
              }}
              className="flex items-center justify-between py-3 transition hover:bg-neutral-50/70 rounded-xl px-2 -mx-2"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-bold text-sm ${
                    isCredit
                      ? "bg-teal-50 text-teal-700"
                      : "bg-neutral-100 text-neutral-800"
                  }`}
                >
                  <IconComponent size={19} stroke={1.8} />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-neutral-900">
                    {transaction.name}
                  </p>

                  <p className="mt-0.5 truncate text-[11px] text-neutral-400">
                    {transaction.category} · {transaction.date}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p
                  className={`ml-3 whitespace-nowrap text-sm font-bold font-mono ${
                    isCredit ? "text-teal-700" : "text-neutral-900"
                  }`}
                >
                  {isCredit ? "+" : "-"}₹
                  {Math.abs(transaction.amount).toLocaleString("en-IN")}
                </p>
                <span className="text-[10px] text-neutral-400 block font-sans">{transaction.status}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
