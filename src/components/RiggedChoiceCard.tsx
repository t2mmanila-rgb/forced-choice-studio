"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChoiceCard } from "@/types";
import { Sparkles, Check, AlertCircle } from "lucide-react";

interface RiggedChoiceCardProps {
  card: ChoiceCard;
  isSelected: boolean;
  isTarget: boolean;
  isRiggedMode: boolean;
  rejectionPhrases: string[];
  themeClasses: {
    activeBorder: string;
    inactiveCardBg: string;
    activeTitleText: string;
    activeDescText: string;
    inactiveTitleText: string;
    inactiveDescText: string;
  };
  onSelect: (cardId: string) => void;
}

export const RiggedChoiceCard: React.FC<RiggedChoiceCardProps> = ({
  card,
  isSelected,
  isTarget,
  isRiggedMode,
  rejectionPhrases,
  themeClasses,
  onSelect,
}) => {
  const [isShaking, setIsShaking] = useState(false);
  const [tooltipText, setTooltipText] = useState<string | null>(null);

  const handleClick = () => {
    if (isRiggedMode && !isTarget) {
      setIsShaking(true);
      const randomPhrase =
        rejectionPhrases.length > 0
          ? rejectionPhrases[Math.floor(Math.random() * rejectionPhrases.length)]
          : "Not an option! 😉";
      setTooltipText(randomPhrase);

      setTimeout(() => setIsShaking(false), 500);
      setTimeout(() => setTooltipText(null), 2200);
      return;
    }

    onSelect(card.id);
  };

  return (
    <div className="relative group select-none">
      {/* Floating humorous rejection tooltip */}
      <AnimatePresence>
        {tooltipText && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: -44, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
            className="absolute left-1/2 -translate-x-1/2 top-0 z-30 pointer-events-none whitespace-nowrap bg-rose-600 text-white font-black text-xs sm:text-sm px-4 py-1.5 rounded-full shadow-2xl flex items-center gap-1.5 ring-2 ring-white/50"
          >
            <AlertCircle className="w-4 h-4" />
            <span>{tooltipText}</span>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-rose-600 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={handleClick}
        animate={
          isShaking
            ? {
                x: [-8, 8, -6, 6, -3, 3, 0],
                borderColor: ["#f43f5e", "#e11d48", "#f43f5e"],
                boxShadow: "0 0 16px rgba(244, 63, 94, 0.6)",
              }
            : isSelected
            ? { scale: [1, 1.03, 1] }
            : { scale: 1 }
        }
        transition={{ duration: isShaking ? 0.4 : 0.2 }}
        whileHover={{ scale: isShaking ? 1 : 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 relative overflow-hidden flex flex-col justify-between cursor-pointer ${
          isSelected
            ? themeClasses.activeBorder
            : themeClasses.inactiveCardBg
        }`}
      >
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2.5">
            {card.emoji && (
              <span className="text-2xl sm:text-3xl leading-none select-none">
                {card.emoji}
              </span>
            )}
            <h4
              className={`text-sm sm:text-base leading-snug transition-colors ${
                isSelected
                  ? themeClasses.activeTitleText
                  : themeClasses.inactiveTitleText
              }`}
            >
              {card.title}
            </h4>
          </div>

          <div className="flex-shrink-0">
            {isSelected ? (
              <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
            ) : isRiggedMode && isTarget ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-300 bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-500/50 shadow-xs">
                <Sparkles className="w-3 h-3 text-amber-400" /> Best Pick
              </span>
            ) : null}
          </div>
        </div>

        {card.description && (
          <p
            className={`text-xs sm:text-sm line-clamp-2 mt-0.5 transition-colors ${
              isSelected
                ? themeClasses.activeDescText
                : themeClasses.inactiveDescText
            }`}
          >
            {card.description}
          </p>
        )}
      </motion.button>
    </div>
  );
};
