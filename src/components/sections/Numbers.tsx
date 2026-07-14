"use client";

import { motion } from "motion/react";

const STATS: [string, string, string][] = [
  ["1.9", "s", "Fastest pit stop of the season, all four corners"],
  ["312", "km/h", "Peak speed through the Nordwall kink, flat out"],
  ["0.02", "s", "Championship margin, decided at the final corner"],
  ["47", "crew", "Engineers and mechanics who never see the podium"],
];

export default function Numbers() {
  return (
    <section className="bg-carbon py-32 text-chalk">
      <div className="mx-auto max-w-6xl px-6">
        <p className="font-mono text-[11px] tracking-[0.4em] text-signal uppercase">
          04 / The margins
        </p>
        <div className="mt-14 grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map(([value, unit, label], i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="border-t border-chalk/15 pt-6"
            >
              <p className="font-display text-[clamp(3.5rem,6vw,5.5rem)]">
                {value}
                <span className="ml-1 text-[0.35em] text-signal">{unit}</span>
              </p>
              <p className="mt-3 max-w-[24ch] text-sm leading-relaxed text-silver">
                {label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
