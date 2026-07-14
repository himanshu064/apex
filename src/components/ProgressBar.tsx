"use client";

import { motion, useScroll, useSpring } from "motion/react";

/* Signal-red race progress along the top edge, like a lap tracker. */
export default function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-signal"
    />
  );
}
