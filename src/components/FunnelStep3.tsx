"use client";

import React from "react";
import { motion } from "framer-motion";
import { Step3Config, ThemeId } from "@/types";
import { THEMES } from "@/lib/themes";
import { ArrowRight, Check, Calendar } from "lucide-react";

interface FunnelStep3Props {
  config: Step3Config;
  themeId: ThemeId;
  selectedId: string | null;
  onSelect: (id: string) => void;
  onContinue: () => void;
}

export const FunnelStep3: React.FC<FunnelStep3Props> = ({
  config,
  themeId,
  selectedId,
  onSelect,
  onContinue,
}) => {
  const theme = THEMES[themeId] || THEMES["pastel-romance"];

  return (
    <div className="flex flex-col items-center justify-between px-4 py-6 sm:py-10 min-h-[460px] w-full max-w-lg mx-auto select-none">
      <div className="w-full text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white shadow-sm border border-slate-100 mb-3 text-2xl">
          <Calendar className="w-6 h-6 text-slate-700" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight mb-2">
          {config.title}
        </h2>
        <p className="text-sm text-slate-500 max-w-sm mx-auto">
          {config.subtitle}
        </p>
      </div>

      {/* Cards list */}
      <div className="w-full space-y-3 mb-8">
        {config.options.map((opt) => {
          const isSelected = selectedId === opt.id;
          return (
            <motion.button
              key={opt.id}
              type="button"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => onSelect(opt.id)}
              className={`w-full p-4 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between gap-4 cursor-pointer ${
                isSelected
                  ? theme.activeCardBorder
                  : "bg-white/80 border-slate-200/80 hover:border-slate-300 hover:bg-white"
              }`}
            >
              <div className="flex items-center gap-3.5">
                {opt.emoji && (
                  <span className="text-2xl sm:text-3xl leading-none">
                    {opt.emoji}
                  </span>
                )}
                <div>
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                    {opt.title}
                  </h4>
                  {opt.description && (
                    <p className="text-xs text-slate-500 mt-0.5">
                      {opt.description}
                    </p>
                  )}
                </div>
              </div>

              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                  isSelected
                    ? "bg-emerald-500 text-white shadow-sm"
                    : "border-2 border-slate-300 bg-white"
                }`}
              >
                {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
              </div>
            </motion.button>
          );
        })}
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
        <span>Lock In Time & Continue</span>
        <ArrowRight className="w-4 h-4" />
      </motion.button>
    </div>
  );
};
