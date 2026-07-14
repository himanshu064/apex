"use client";

import { motion } from "motion/react";

const links = [
  { href: "#manifesto", label: "Creed" },
  { href: "#season", label: "Season" },
  { href: "#works", label: "Works" },
];

export default function Nav() {
  return (
    <motion.header
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-1 z-50 mix-blend-difference"
    >
      <nav className="flex items-center justify-between px-5 py-4 text-chalk sm:px-8">
        <a href="#top" className="font-display text-2xl leading-none">
          APEX<span className="text-signal">.</span>
        </a>
        <div className="hidden gap-7 font-mono text-[11px] tracking-[0.25em] uppercase sm:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-signal">
              {l.label}
            </a>
          ))}
        </div>
        <a
          href="#join"
          className="border border-chalk/40 px-4 py-2 font-mono text-[11px] tracking-[0.25em] uppercase hover:border-signal hover:text-signal"
        >
          Join the grid
        </a>
      </nav>
    </motion.header>
  );
}
