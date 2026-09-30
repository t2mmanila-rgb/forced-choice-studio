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
    <div className="flex flex-col items-center justify-between px-4 py-6 sm:py-8 min-h-[480px] w-full max-w-xl mx-auto select-none">
      <div className="w-full text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white shadow-sm border border-slate-100 mb-3 text-2xl">
          <Compass className="w-6 h-6 text-slate-700" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight mb-2">
          {config.title}
        </h2>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          {config.subtitle}
        </p>
      </div>

      {/* Grid of activities */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
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
              cardBg: "bg-white/80",
              cardBorder: "border-slate-200/80",
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
            : "bg-slate-200 text-slate-400 cursor-not-allowed"
        }`}
      >
        <span>Seal the Plan & View Pass</span>
        <ArrowRight className="w-4 h-4" />
      </motion.button>
    </div>
  );
};
