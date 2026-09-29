import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  IconArrowUpRight,
  IconArrowDownLeft,
  IconPlus,
  IconReceipt,
} from "@tabler/icons-react";

const actions = [
  {
    title: "Send",
    path: "/payments",
    icon: IconArrowUpRight,
  },
  {
    title: "Request",
    path: "/payments",
    icon: IconArrowDownLeft,
  },
  {
    title: "Add money",
    path: "/accounts",
    icon: IconPlus,
  },
  {
    title: "Pay bills",
    path: "/payments",
    icon: IconReceipt,
  },
];

export default function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-2xs">
      <div className="flex items-center justify-between">
        <h3 className="font-bold tracking-tight text-neutral-950">Quick Actions</h3>
        <span className="text-xs text-neutral-400">Payments & Transfers</span>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-2.5">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <motion.button
              key={action.title}
              onClick={() => navigate(action.path)}
              whileHover={{
                y: -3,
              }}
              whileTap={{
                scale: 0.95,
              }}
              className="group flex flex-col items-center gap-2 rounded-xl p-2 transition hover:bg-neutral-50"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50 transition group-hover:border-neutral-950 group-hover:bg-neutral-950 group-hover:text-white group-hover:shadow-md">
                <Icon size={18} stroke={1.8} />
              </div>

              <span className="text-[11px] font-semibold text-neutral-700 group-hover:text-neutral-950">
                {action.title}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
