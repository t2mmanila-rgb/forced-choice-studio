"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Step1Config, ThemeId } from "@/types";
import { THEMES } from "@/lib/themes";
import { EvasiveButton } from "./EvasiveButton";
import { Heart, AlertTriangle } from "lucide-react";

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

  // Yes button scale growth calculation - safely capped so it never breaks layout
  const rawScale = config.yesGrowthFactor
    ? config.evasionBehavior === "shrink"
      ? 1 + (1 - shrinkScale) * 0.4
      : 1 + Math.min(evasionCount * 0.08, 0.35)
    : 1;
  const yesScale = Math.min(rawScale, 1.35);

  const handleEvade = () => {
    setEvasionCount((prev) => prev + 1);

    if (config.evasionBehavior === "shrink") {
      setShrinkScale((prev) => Math.max(0.1, prev - 0.22));
    } else if (config.evasionBehavior === "bamboozle") {
      setIsBamboozled((prev) => !prev);
    }
  };

  const handleYesClick = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#f43f5e", "#ec4899", "#8b5cf6", "#f59e0b", "#10b981", "#06b6d4"],
      });
    } catch {
      // ignore
    }
    onYes();
  };

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center justify-center text-center px-4 py-4 sm:py-8 w-full max-w-lg mx-auto select-none"
    >
      {/* Animated Emoji Badge */}
      <motion.div
        animate={{ scale: [1, 1.12, 1], rotate: [0, 4, -4, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className={`w-16 h-16 sm:w-20 sm:h-20 rounded-3xl flex items-center justify-center text-3xl sm:text-4xl mb-4 shadow-xl ${theme.iconBg}`}
      >
        {config.emoji || "💖"}
      </motion.div>

      {/* Main Title & Subtitle */}
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className={`text-xl sm:text-3xl font-extrabold tracking-tight mb-2 leading-tight ${theme.headingText}`}
      >
        {config.title}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className={`text-xs sm:text-sm mb-6 max-w-sm ${theme.mutedText}`}
      >
        {config.subtitle}
      </motion.p>

      {/* Dual Button Arena - always accessible and centered */}
      <div className="relative w-full max-w-md min-h-[110px] flex items-center justify-center gap-3 sm:gap-4 my-2 px-2">
        {/* Positive "Yes" Button (The one we WANT them to choose) */}
        <motion.button
          type="button"
          onClick={handleYesClick}
          animate={{ scale: yesScale }}
          whileHover={{ scale: yesScale * 1.05 }}
          whileTap={{ scale: yesScale * 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className={`z-20 font-black px-6 sm:px-8 py-3.5 sm:py-4 rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl flex-shrink-0 ${theme.primaryButton}`}
        >
          <Heart className="w-5 h-5 fill-current flex-shrink-0" />
          <span className="whitespace-nowrap text-sm sm:text-base">
            {isBamboozled ? config.noText : config.yesText}
          </span>
        </motion.button>

        {/* Evasive "No" Button */}
        <div className="z-10 flex-shrink-0">
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
          className="mt-4 z-20"
        >
          <button
            type="button"
            onClick={() => setShowEscapeModal(true)}
            className={`text-xs underline underline-offset-4 transition-colors opacity-70 hover:opacity-100 ${theme.mutedText}`}
          >
            Okay okay, I give up, let me actually say no
          </button>
        </motion.div>
      )}

      {/* Server Refusal Modal */}
      <AnimatePresence>
        {showEscapeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center shadow-2xl border border-slate-100 relative text-slate-900"
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
                className={`w-full py-3.5 rounded-full font-bold text-sm ${theme.primaryButton}`}
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
