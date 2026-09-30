"use client";

import React from "react";
import { motion } from "framer-motion";
import { Step4Config, ThemeId } from "@/types";
import { THEMES } from "@/lib/themes";
import { RiggedChoiceCard } from "./RiggedChoiceCard";
import { ArrowRight, Compass } from "lucide-react";

interface FunnelStep4Props {
  config: Step4Config;
  themeId: ThemeId;
  selectedId: string | null;
  onSelect: (id: string) => void;
  onContinue: () => void;
}

export const FunnelStep4: React.FC<FunnelStep4Props> = ({
  config,
  themeId,
  selectedId,
  onSelect,
  onContinue,
}) => {
  const theme = THEMES[themeId] || THEMES["pastel-romance"];
  const isRigged = config.mode === "rigged";

  return (
    <div className="flex flex-col items-center justify-between px-4 py-4 sm:py-6 min-h-[440px] w-full max-w-xl mx-auto select-none">
      <div className="w-full text-center mb-5">
        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl shadow-md mb-2.5 text-2xl ${theme.iconBg}`}>
          <Compass className="w-6 h-6" />
        </div>
        <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight mb-1.5 ${theme.headingText}`}>
          {config.title}
        </h2>
        <p className={`text-xs sm:text-sm max-w-md mx-auto ${theme.mutedText}`}>
          {config.subtitle}
        </p>
      </div>

      {/* Grid of activities */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {config.options.map((opt) => (
          <RiggedChoiceCard
            key={opt.id}
            card={opt}
            isSelected={selectedId === opt.id}
            isTarget={config.targetId === opt.id}
            isRiggedMode={isRigged}
            rejectionPhrases={config.rejectionPhrases}
            themeClasses={{
              activeBorder: theme.activeCardBorder,
              inactiveCardBg: theme.inactiveCardBg,
              activeTitleText: theme.activeTitleText,
              activeDescText: theme.activeDescText,
              inactiveTitleText: theme.inactiveTitleText,
              inactiveDescText: theme.inactiveDescText,
            }}
            onSelect={onSelect}
          />
        ))}
      </div>

      {/* Continue Button */}
      <motion.button
        type="button"
        disabled={!selectedId}
        whileHover={selectedId ? { scale: 1.03 } : {}}
        whileTap={selectedId ? { scale: 0.98 } : {}}
        onClick={onContinue}
        className={`w-full py-4 rounded-full font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
          selectedId
            ? `${theme.primaryButton} shadow-lg`
            : "bg-slate-300/40 text-slate-500 cursor-not-allowed"
        }`}
      >
        <span>Seal the Plan & View Pass</span>
        <ArrowRight className="w-4 h-4" />
      </motion.button>
    </div>
  );
};
