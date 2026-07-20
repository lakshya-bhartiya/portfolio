"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen({ name = "Lakshya Bhartiya" }: { name?: string }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const start = Date.now();
    const duration = 1400;
    const raf = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (pct < 100) requestAnimationFrame(raf);
      else setTimeout(() => setDone(true), 250);
    };
    const id = requestAnimationFrame(raf);
    return () => cancelAnimationFrame(id);
  }, []);

  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-base"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
        >
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="h-16 w-16 rounded-2xl bg-brand-gradient flex items-center justify-center font-display font-bold text-xl text-white mb-6"
          >
            {initials}
          </motion.div>

          <div className="overflow-hidden">
            <motion.p
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="font-display text-lg md:text-xl text-ink tracking-wide"
            >
              {name}
            </motion.p>
          </div>

          <div className="mt-8 h-[2px] w-48 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-brand-gradient"
              style={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
          <p className="mt-3 text-xs text-ink-dim font-mono">{progress}%</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
