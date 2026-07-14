"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

/* Closing plate: the call-to-action wordmark rushes in from the right
   as the section scrolls through, one last burst of speed. */
export default function Coda() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["18%", "0%"]);

  return (
    <section
      id="join"
      ref={ref}
      className="flex min-h-screen flex-col justify-between overflow-hidden bg-signal pt-36 pb-8 text-chalk"
    >
      <div className="px-5 sm:px-8">
        <p className="font-mono text-[11px] tracking-[0.4em] uppercase">
          05 / Next season
        </p>
        <motion.h2
          style={{ x }}
          className="font-display mt-6 text-[clamp(4rem,15vw,14rem)] whitespace-nowrap"
        >
          Join the grid
        </motion.h2>
        <div className="mt-10 flex flex-wrap items-center gap-5">
          <a
            href="#top"
            className="bg-carbon px-8 py-4 font-mono text-xs tracking-[0.25em] uppercase transition-colors hover:bg-chalk hover:text-carbon"
          >
            Partner with Apex
          </a>
          <a
            href="#season"
            className="border border-chalk/50 px-8 py-4 font-mono text-xs tracking-[0.25em] uppercase transition-colors hover:bg-chalk hover:text-signal"
          >
            Rewatch the season
          </a>
        </div>
      </div>

      <footer className="mt-24 px-5 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-chalk/30 pt-5 font-mono text-[10px] tracking-[0.3em] uppercase">
          <span>© 2026 Apex Racing Works</span>
          <span className="hidden sm:inline">Car Nº 27 · Grid slot 3</span>
          <span>Lights out in 94 days</span>
        </div>
      </footer>
    </section>
  );
}
