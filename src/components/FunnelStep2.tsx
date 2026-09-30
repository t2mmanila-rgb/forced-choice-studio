"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Step2Config, ThemeId } from "@/types";
import { THEMES } from "@/lib/themes";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

interface FunnelStep2Props {
  config: Step2Config;
  themeId: ThemeId;
  onContinue: () => void;
}

export const FunnelStep2: React.FC<FunnelStep2Props> = ({
  config,
  themeId,
  onContinue,
}) => {
  const theme = THEMES[themeId] || THEMES["pastel-romance"];

  useEffect(() => {
    // Gentle recurring sparkle confetti on load
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.5 },
      });
    } catch {
      // ignore
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center px-4 py-8 sm:py-12 min-h-[460px] w-full max-w-lg mx-auto select-none">
      {/* Animated Celebration Icon */}
      <motion.div
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        className="relative mb-6"
      >
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-white shadow-xl flex items-center justify-center text-5xl sm:text-6xl border border-white/80">
          {config.emoji || "🥂"}
        </div>
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute -top-2 -right-2 bg-emerald-500 text-white p-1.5 rounded-full shadow-md"
        >
          <CheckCircle2 className="w-5 h-5" />
        </motion.div>
      </motion.div>

      {/* Verified Badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border bg-white/70 shadow-sm"
      >
        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        <span>Decision Recorded & Irreversible</span>
      </motion.div>

      {/* Main Title */}
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3 text-slate-800 leading-tight"
      >
        {config.title}
      </motion.h2>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-sm sm:text-base text-slate-600 mb-8 max-w-sm"
      >
        {config.subtitle}
      </motion.p>

      {/* Primary Continue Button */}
      <motion.button
        type="button"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.98 }}
        onClick={onContinue}
        className={`font-bold px-8 py-4 rounded-full text-base flex items-center gap-2.5 transition-all shadow-lg cursor-pointer ${theme.primaryButton}`}
      >
        <span>{config.buttonText}</span>
        <ArrowRight className="w-5 h-5" />
      </motion.button>
    </div>
  );
};
