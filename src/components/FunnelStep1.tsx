"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Step1Config, ThemeId } from "@/types";
import { THEMES } from "@/lib/themes";
import { EvasiveButton } from "./EvasiveButton";
import { Heart, Sparkles, AlertTriangle, XCircle } from "lucide-react";

interface FunnelStep1Props {
  config: Step1Config;
  themeId: ThemeId;
  onYes: () => void;
}

export const FunnelStep1: React.FC<FunnelStep1Props> = ({ config, themeId, onYes }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [evasionCount, setEvasionCount] = useState(0);
  const [isBamboozled, setIsBamboozled] = useState(false);
  const [shrinkScale, setShrinkScale] = useState(1);
  const [showEscapeModal, setShowEscapeModal] = useState(false);

  const theme = THEMES[themeId] || THEMES["pastel-romance"];

  // Yes button scale growth calculation
  const yesScale = config.yesGrowthFactor
    ? config.evasionBehavior === "shrink"
      ? 1 + (1 - shrinkScale) * 1.5
      : 1 + Math.min(evasionCount * 0.1, 1.2)
    : 1;

  const handleEvade = () => {
    setEvasionCount((prev) => prev + 1);

    if (config.evasionBehavior === "shrink") {
      setShrinkScale((prev) => Math.max(0.05, prev - 0.25));
    } else if (config.evasionBehavior === "bamboozle") {
      setIsBamboozled((prev) => !prev);
    }
  };

  const handleYesClick = () => {
    // Fire confetti celebration
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#f43f5e", "#ec4899", "#8b5cf6", "#f59e0b", "#10b981"],
      });
    } catch {
      // ignore
    }
    onYes();
  };

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center justify-center text-center px-4 py-8 sm:py-12 min-h-[460px] w-full max-w-lg mx-auto overflow-hidden select-none"
    >
      {/* Animated Emoji Badge */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center text-4xl sm:text-5xl mb-6 shadow-inner bg-white/70 border border-white/60"
      >
        {config.emoji || "💖"}
      </motion.div>

      {/* Main Title & Subtitle */}
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3 text-slate-800 leading-tight"
      >
        {config.title}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-sm sm:text-base text-slate-600 mb-8 max-w-sm"
      >
        {config.subtitle}
      </motion.p>

      {/* Dual Button Arena */}
      <div className="relative w-full max-w-md h-28 flex items-center justify-center gap-4">
        {/* Positive "Yes" Button */}
        <motion.button
          type="button"
          onClick={handleYesClick}
          animate={{ scale: yesScale }}
          whileHover={{ scale: yesScale * 1.05 }}
          whileTap={{ scale: yesScale * 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className={`z-20 font-bold px-7 py-3.5 rounded-full transition-all flex items-center gap-2 cursor-pointer ${theme.primaryButton}`}
        >
          <Heart className="w-5 h-5 fill-current" />
          <span>{isBamboozled ? config.noText : config.yesText}</span>
        </motion.button>

        {/* Evasive "No" Button */}
        <div className="z-10">
          <EvasiveButton
            text={config.noText}
            behavior={config.evasionBehavior}
            sensitivity={config.sensitivity}
            containerRef={containerRef}
            onEvade={handleEvade}
            isBamboozled={isBamboozled}
            shrinkScale={shrinkScale}
            className={theme.secondaryButton}
          />
        </div>
      </div>

      {/* Discreet 10-attempt Escape Hatch */}
      {evasionCount >= 10 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 z-20"
        >
          <button
            type="button"
            onClick={() => setShowEscapeModal(true)}
            className="text-xs text-slate-400 hover:text-slate-600 underline underline-offset-4 transition-colors"
          >
            Okay okay, I give up, let me actually say no
          </button>
        </motion.div>
      )}

      {/* Server Refusal Modal */}
      <AnimatePresence>
        {showEscapeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center shadow-2xl border border-slate-100 relative"
            >
              <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <span className="inline-block px-3 py-1 bg-rose-50 text-rose-600 text-xs font-mono font-bold rounded-full mb-3 border border-rose-200">
                HTTP 500 INTERNAL ERROR
              </span>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Server Refuses Rejection
              </h3>
              <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                The universe, the server, and this application have formed a strict union:
                rejection packets are immediately dropped by the firewall. There is only one valid response! 😉
              </p>
              <button
                type="button"
                onClick={() => {
                  setShowEscapeModal(false);
                  handleYesClick();
                }}
                className={`w-full py-3 rounded-full font-bold text-sm ${theme.primaryButton}`}
              >
                Fine, I choose YES! 🥰
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
