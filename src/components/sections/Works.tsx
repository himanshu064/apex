"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

/* Editorial parallax plates. The "photographs" are abstract livery art
   built from layered gradients and racing stripes, each drifting at its
   own speed against the scroll. */

type Plate = {
  caption: string;
  note: string;
  art: string; // background-image stack
  speed: number; // parallax distance in px
  align: string;
};

const PLATES: Plate[] = [
  {
    caption: "The 27 in wind tunnel trim",
    note: "Fig. 01 — Aerodynamics",
    art: "linear-gradient(160deg, #efefea 0%, #efefea 10%, #0f0f0d 10%, #0f0f0d 44%, #e10600 44%, #e10600 58%, #1c1c19 58%, #1c1c19 88%, #9b9b93 88%)",
    speed: -90,
    align: "self-start",
  },
  {
    caption: "Sector 2, dusk, full commit",
    note: "Fig. 02 — On track",
    art: "linear-gradient(105deg, #0f0f0d 0%, #0f0f0d 30%, #7a0400 55%, #e10600 78%, #ff5c40 100%)",
    speed: 70,
    align: "self-end",
  },
  {
    caption: "1.9 seconds, twenty hands",
    note: "Fig. 03 — The stop",
    art: "linear-gradient(15deg, rgba(225,6,0,0.9), transparent 55%), repeating-linear-gradient(90deg, #0f0f0d 0 46px, #2a2a26 46px 92px)",
    speed: -50,
    align: "self-center",
  },
];

function ParallaxPlate({ p }: { p: Plate }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [p.speed, -p.speed]);

  return (
    <div ref={ref} className={`w-full max-w-xl ${p.align}`}>
      <motion.figure style={{ y }}>
        <div
          className="aspect-[4/3] w-full border border-carbon/15"
          style={{ backgroundImage: p.art }}
        />
        <figcaption className="mt-3 flex items-baseline justify-between gap-4">
          <span className="font-mono text-[10px] tracking-[0.3em] text-signal uppercase">
            {p.note}
          </span>
          <span className="text-sm text-graphite">{p.caption}</span>
        </figcaption>
      </motion.figure>
    </div>
  );
}

export default function Works() {
  return (
    <section id="works" className="relative bg-chalk py-36">
      <div className="mx-auto flex max-w-6xl flex-col gap-28 px-6">
        <div>
          <p className="font-mono text-[11px] tracking-[0.4em] text-signal uppercase">
            03 / The works
          </p>
          <h2 className="font-display mt-4 max-w-3xl text-[clamp(2.6rem,6.5vw,5.5rem)]">
            Built by hand, raced by the hundredth
          </h2>
        </div>
        {PLATES.map((p) => (
          <ParallaxPlate key={p.note} p={p} />
        ))}
      </div>
    </section>
  );
}
