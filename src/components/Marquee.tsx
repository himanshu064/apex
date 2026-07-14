"use client";

import { motion } from "motion/react";

/* Endless timing-board ticker between sections. */
export default function Marquee({
  items,
  dark = false,
}: {
  items: string[];
  dark?: boolean;
}) {
  const line = items.join("  /  ") + "  /  ";
  return (
    <div
      aria-hidden
      className={`overflow-hidden border-y py-3 font-mono text-xs tracking-[0.3em] uppercase ${
        dark
          ? "border-chalk/15 bg-carbon text-silver"
          : "border-carbon/15 bg-chalk text-graphite"
      }`}
    >
      <motion.div
        className="flex w-max whitespace-pre"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 28, ease: "linear" }}
      >
        <span>{line.repeat(4)}</span>
        <span>{line.repeat(4)}</span>
      </motion.div>
    </div>
  );
}
