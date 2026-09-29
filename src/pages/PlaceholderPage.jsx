import React from "react";
import { motion } from "motion/react";

export default function PlaceholderPage({ title }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="p-5 sm:p-7 lg:p-8"
    >
      <div className="rounded-[22px] border border-neutral-200 bg-white p-8">
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#0f766e]">
          Quantum Bank
        </p>

        <h1 className="mt-2 text-3xl font-semibold tracking-[-0.045em]">
          {title}
        </h1>

        <p className="mt-2 text-sm text-neutral-400">
          This section will be designed next.
        </p>
      </div>
    </motion.div>
  );
}
