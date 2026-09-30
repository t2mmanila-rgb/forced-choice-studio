"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppConfig, FunnelSelections } from "@/types";
import { THEMES } from "@/lib/themes";
import { FunnelStep1 } from "./FunnelStep1";
import { FunnelStep2 } from "./FunnelStep2";
import { FunnelStep3 } from "./FunnelStep3";
import { FunnelStep4 } from "./FunnelStep4";
import { FunnelStep5 } from "./FunnelStep5";

interface FunnelContainerProps {
  config: AppConfig;
  isBuilderPreview?: boolean;
}

export const FunnelContainer: React.FC<FunnelContainerProps> = ({
  config,
  isBuilderPreview = false,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selections, setSelections] = useState<FunnelSelections>({
    step3OptionId: config.step3.options[0]?.id || null,
    step4OptionId:
      config.step4.mode === "rigged"
        ? config.step4.targetId
        : config.step4.options[0]?.id || null,
  });

  const theme = THEMES[config.theme] || THEMES["pastel-romance"];

  const handleStep1Yes = () => setCurrentStep(2);
  const handleStep2Continue = () => setCurrentStep(3);
  const handleStep3Continue = () => setCurrentStep(4);
  const handleStep4Continue = () => setCurrentStep(5);
  const handleReset = () => {
    setCurrentStep(1);
    setSelections({
      step3OptionId: config.step3.options[0]?.id || null,
      step4OptionId:
        config.step4.mode === "rigged"
          ? config.step4.targetId
          : config.step4.options[0]?.id || null,
    });
  };

  const pageVariants = {
    initial: { opacity: 0, x: 20, scale: 0.98 },
    animate: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: -20, scale: 0.98 },
  };

  return (
    <div
      className={`min-h-full w-full flex flex-col items-center justify-between p-4 sm:p-6 bg-gradient-to-br ${theme.bgGradient} transition-colors duration-500`}
    >
      {/* Top Step Progress Bar / Pills */}
      <div className="w-full max-w-md mx-auto mb-4 flex items-center justify-between gap-1.5 px-2">
        {[1, 2, 3, 4, 5].map((step) => {
          const isPassed = step < currentStep;
          const isCurrent = step === currentStep;
          const currentPillClass =
            config.theme === "pastel-romance"
              ? "bg-rose-500 shadow-xs"
              : config.theme === "electric-fun"
              ? "bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)]"
              : "bg-emerald-400 shadow-xs";

          return (
            <button
              key={step}
              type="button"
              disabled={!isBuilderPreview && step > currentStep}
              onClick={() => isBuilderPreview && setCurrentStep(step)}
              className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                isCurrent
                  ? currentPillClass
                  : isPassed
                  ? "bg-slate-400/80"
                  : "bg-slate-300/40"
              } ${isBuilderPreview ? "cursor-pointer hover:opacity-80" : "cursor-default"}`}
              title={`Step ${step}`}
            />
          );
        })}
      </div>

      {isBuilderPreview && (
        <div className={`mb-2 text-[11px] font-semibold px-3 py-1 rounded-full border shadow-xs ${theme.chipBg}`}>
          Builder Preview • Step {currentStep} of 5 (click bars above to jump)
        </div>
      )}

      {/* Main Funnel Step Content */}
      <div className="w-full flex-1 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <FunnelStep1
                config={config.step1}
                themeId={config.theme}
                onYes={handleStep1Yes}
              />
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step2"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <FunnelStep2
                config={config.step2}
                themeId={config.theme}
                onContinue={handleStep2Continue}
              />
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="step3"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <FunnelStep3
                config={config.step3}
                themeId={config.theme}
                selectedId={selections.step3OptionId}
                onSelect={(id) =>
                  setSelections((prev) => ({ ...prev, step3OptionId: id }))
                }
                onContinue={handleStep3Continue}
              />
            </motion.div>
          )}

          {currentStep === 4 && (
            <motion.div
              key="step4"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <FunnelStep4
                config={config.step4}
                themeId={config.theme}
                selectedId={selections.step4OptionId}
                onSelect={(id) =>
                  setSelections((prev) => ({ ...prev, step4OptionId: id }))
                }
                onContinue={handleStep4Continue}
              />
            </motion.div>
          )}

          {currentStep === 5 && (
            <motion.div
              key="step5"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <FunnelStep5
                config={config}
                selections={selections}
                onReset={handleReset}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Tiny footer branding */}
      <div className="mt-4 text-[11px] text-slate-400 font-mono flex items-center gap-1.5 opacity-70">
        <span>Powered by YesPlan</span>
        <span>•</span>
        <span>Rejection is Hilariously Impossible</span>
      </div>
    </div>
  );
};
