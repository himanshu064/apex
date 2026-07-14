"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

/* Poster hero: the wordmark is text-masked over an animated livery
   gradient, and the whole plate parallaxes up + fades as you scroll on. */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex h-[100svh] flex-col justify-between overflow-hidden bg-chalk"
    >
      <motion.div
        style={{ y, opacity }}
        className="flex flex-1 flex-col items-center justify-center px-4"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-4 font-mono text-[11px] tracking-[0.4em] text-signal uppercase"
        >
          The independent racing works · est. 2019
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-masked bg-livery text-center text-[clamp(6rem,26vw,24rem)]"
        >
          Apex
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.9 }}
          className="mt-6 max-w-md text-center text-lg leading-relaxed text-graphite"
        >
          Twenty-two races. Four continents. One number that matters: the gap,
          in hundredths, between us and everyone else.
        </motion.p>
      </motion.div>

      {/* timing board footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 1 }}
        className="flex flex-wrap items-center justify-between gap-3 border-t border-carbon/15 px-5 py-4 font-mono text-[10px] tracking-[0.3em] text-graphite uppercase sm:px-8"
      >
        <span>Car Nº 27</span>
        <span className="hidden sm:inline">Top speed 312 km/h</span>
        <span className="hidden md:inline">Pit stop 1.9 s</span>
        <span className="flex items-center gap-2 text-signal">
          Scroll to grid
          <motion.span
            animate={{ x: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.4 }}
          >
            →
          </motion.span>
        </span>
      </motion.div>
    </section>
  );
}
