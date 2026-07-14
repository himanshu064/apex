"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

/* The award-site staple: a tall scroll region whose sticky viewport
   translates a train of circuit chapters horizontally. Each chapter draws
   its track outline as you arrive. */

type Round = {
  round: string;
  name: string;
  tagline: string;
  length: string;
  turns: string;
  lap: string;
  path: string;
};

const ROUNDS: Round[] = [
  {
    round: "R 01",
    name: "Silverpine",
    tagline: "Old forest, new tarmac. The season opens under the trees.",
    length: "5.2 km",
    turns: "14 turns",
    lap: "1:24.301",
    path: "M60 200 L60 90 Q60 60 90 60 L250 60 Q280 60 280 90 L280 120 Q280 150 250 150 L170 150 Q140 150 140 180 L140 210 Q140 240 170 240 L300 240 Q330 240 330 270 L330 300 Q330 330 300 330 L90 330 Q60 330 60 300 Z",
  },
  {
    round: "R 07",
    name: "Azure Coast",
    tagline: "Nineteen corners squeezed between the harbour and the cliffs.",
    length: "3.3 km",
    turns: "19 turns",
    lap: "1:11.892",
    path: "M50 120 Q50 90 80 90 L150 90 Q180 90 180 120 L180 140 Q180 170 210 170 L280 170 Q310 170 310 200 L310 250 Q310 280 280 280 L240 280 Q210 280 210 310 L210 320 Q210 350 180 350 L110 350 Q80 350 80 320 L80 290 Q80 260 110 260 L130 260 Q160 260 160 230 L160 220 Q160 190 130 190 L80 190 Q50 190 50 160 Z",
  },
  {
    round: "R 14",
    name: "Nordwall",
    tagline: "Nine corners, full throttle for 82 percent of the lap.",
    length: "6.8 km",
    turns: "9 turns",
    lap: "1:39.410",
    path: "M40 260 L40 120 Q40 80 80 80 L200 80 Q240 80 240 120 L240 160 Q240 200 280 200 L300 200 Q340 200 340 240 L340 300 Q340 340 300 340 L80 340 Q40 340 40 300 Z",
  },
  {
    round: "R 22",
    name: "Mirage Valley",
    tagline: "The finale, run at night, in the desert, for everything.",
    length: "5.9 km",
    turns: "16 turns",
    lap: "1:31.077",
    path: "M70 320 Q40 320 40 290 L40 250 Q40 220 70 220 L110 220 Q140 220 140 190 L140 130 Q140 100 170 100 L290 100 Q320 100 320 130 L320 170 Q320 200 290 200 L250 200 Q220 200 220 230 L220 260 Q220 290 250 290 L280 290 Q310 290 310 320 Q310 350 280 350 L100 350 Q70 350 70 320 Z",
  },
];

function CircuitCard({ r, index }: { r: Round; index: number }) {
  return (
    <article className="relative flex h-full w-[88vw] shrink-0 flex-col justify-center border-l border-chalk/10 px-8 sm:w-[62vw] sm:px-14">
      <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 font-display text-[38vh] text-chalk/[0.045]">
        0{index + 1}
      </span>

      <p className="font-mono text-[11px] tracking-[0.4em] text-signal uppercase">
        {r.round}
      </p>
      <h3 className="font-display mt-3 text-[clamp(3rem,7vw,6.5rem)] text-chalk">
        {r.name}
      </h3>
      <p className="mt-4 max-w-sm text-base leading-relaxed text-silver">
        {r.tagline}
      </p>

      <div className="mt-8 flex items-end justify-between gap-8">
        <motion.svg
          viewBox="0 0 380 420"
          className="h-44 w-auto sm:h-56"
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.6 }}
        >
          <motion.path
            d={r.path}
            fill="none"
            stroke="#efefea"
            strokeWidth={7}
            strokeLinejoin="round"
            variants={{
              hidden: { pathLength: 0, opacity: 0.4 },
              visible: {
                pathLength: 1,
                opacity: 1,
                transition: { duration: 1.6, ease: "easeInOut" },
              },
            }}
          />
          <motion.circle
            r={9}
            fill="#e10600"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            cx={r.path.split(" ")[0].slice(1)}
            cy={r.path.split(" ")[1]}
          />
        </motion.svg>

        <dl className="grid gap-3 text-right font-mono text-xs tracking-[0.15em] text-silver uppercase">
          <div>
            <dt className="text-[10px] text-silver/60">Length</dt>
            <dd className="text-chalk">{r.length}</dd>
          </div>
          <div>
            <dt className="text-[10px] text-silver/60">Layout</dt>
            <dd className="text-chalk">{r.turns}</dd>
          </div>
          <div>
            <dt className="text-[10px] text-silver/60">Fastest lap</dt>
            <dd className="text-signal">{r.lap}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}

export default function Season() {
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxX, setMaxX] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Measure how far the train actually overflows the viewport, so the
  // travel ends exactly on the last chapter at any screen width.
  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      setMaxX(Math.max(0, trackRef.current.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const x = useTransform(scrollYProgress, [0, 1], [0, -maxX]);

  return (
    <section id="season" ref={ref} className="relative h-[420vh] bg-carbon">
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <div className="flex items-center justify-between px-5 pt-20 sm:px-8">
          <p className="font-mono text-[11px] tracking-[0.4em] text-signal uppercase">
            02 / The season
          </p>
          <p className="font-mono text-[11px] tracking-[0.4em] text-silver uppercase">
            Scroll ↓ to travel →
          </p>
        </div>

        <motion.div ref={trackRef} style={{ x }} className="flex min-h-0 flex-1">
          <div className="flex h-full w-[30vw] shrink-0 items-center pl-8 sm:pl-14">
            <h2 className="font-display text-[clamp(3rem,8vw,8rem)] leading-[0.9] text-chalk">
              Four
              <br />
              <span className="text-signal">fronts.</span>
            </h2>
          </div>
          {ROUNDS.map((r, i) => (
            <CircuitCard key={r.round} r={r} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
