"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

/* Pinned storytelling: the creed stays fixed while scrolling floods each
   word with ink, one after another, like a timing screen lighting up. */

const CREED =
  "Speed is not bravery. Speed is preparation so complete that bravery becomes unnecessary. We rebuild the car every night so the driver can be calm at three hundred.".split(
    " ",
  );

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const color = useTransform(progress, range, ["#9b9b93", "#0f0f0d"]);
  return (
    <motion.span style={{ opacity, color }} className="inline-block">
      {children}&nbsp;
    </motion.span>
  );
}

export default function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section id="manifesto" ref={ref} className="relative h-[280vh] bg-chalk">
      <div className="sticky top-0 flex h-screen items-center">
        <div className="mx-auto max-w-5xl px-6">
          <p className="mb-8 font-mono text-[11px] tracking-[0.4em] text-signal uppercase">
            01 / The creed
          </p>
          <p
            className="font-display text-[clamp(1.9rem,5.2vw,4.6rem)]"
            style={{ lineHeight: 1.06 }}
          >
            {CREED.map((word, i) => {
              const start = (i / CREED.length) * 0.9;
              return (
                <Word
                  key={i}
                  progress={scrollYProgress}
                  range={[start, start + 0.09]}
                >
                  {word}
                </Word>
              );
            })}
          </p>
        </div>
      </div>
    </section>
  );
}
