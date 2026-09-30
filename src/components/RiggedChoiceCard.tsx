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
    cardBg: string;
    cardBorder: string;
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
      // Trigger horizontal shake and humorous tooltip
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
            animate={{ opacity: 1, y: -42, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
            className="absolute left-1/2 -translate-x-1/2 top-0 z-30 pointer-events-none whitespace-nowrap bg-rose-600 text-white font-semibold text-xs sm:text-sm px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5"
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{tooltipText}</span>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-rose-600 rotate-45" />
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
                boxShadow: "0 0 12px rgba(244, 63, 94, 0.4)",
              }
            : isSelected
            ? { scale: [1, 1.03, 1] }
            : { scale: 1 }
        }
        transition={{ duration: isShaking ? 0.4 : 0.2 }}
        whileHover={{ scale: isShaking ? 1 : 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 relative overflow-hidden flex flex-col justify-between ${
          isSelected
            ? themeClasses.activeBorder
            : `${themeClasses.cardBg} ${themeClasses.cardBorder} hover:border-slate-300 hover:shadow-md`
        }`}
      >
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2.5">
            {card.emoji && (
              <span className="text-2xl sm:text-3xl leading-none select-none">
                {card.emoji}
              </span>
            )}
            <h4 className="font-bold text-sm sm:text-base leading-snug">
              {card.title}
            </h4>
          </div>

          <div className="flex-shrink-0">
            {isSelected ? (
              <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-sm">
                <Check className="w-4 h-4" />
              </div>
            ) : isRiggedMode && isTarget ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                <Sparkles className="w-3 h-3" /> Best Pick
              </span>
            ) : null}
          </div>
        </div>

        {card.description && (
          <p className="text-xs sm:text-sm text-slate-500 line-clamp-2 mt-0.5">
            {card.description}
          </p>
        )}
      </motion.button>
    </div>
  );
};
