"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { damping: 25, stiffness: 300, mass: 0.5 });
  const ringY = useSpring(y, { damping: 25, stiffness: 300, mass: 0.5 });

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    setEnabled(isFinePointer);
    if (!isFinePointer) return;

    document.documentElement.classList.add("custom-cursor-active");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as HTMLElement;
      setHovering(!!target.closest("a, button, [data-cursor-hover]"));
    };
    const down = () => setClicking(true);
    const up = () => setClicking(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* Small dot - follows instantly */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[90] h-2 w-2 rounded-full bg-brand-cyan mix-blend-difference"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      />
      {/* Glow ring - trails smoothly */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[90] rounded-full border border-brand-cyan/60"
        animate={{
          width: hovering ? 56 : clicking ? 24 : 36,
          height: hovering ? 56 : clicking ? 24 : 36,
          opacity: hovering ? 0.9 : 0.5,
        }}
        transition={{ duration: 0.2 }}
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          boxShadow: "0 0 20px rgba(6,182,212,0.35)",
        }}
      />
    </>
  );
}
