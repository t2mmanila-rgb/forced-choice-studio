"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { AppConfig, FunnelSelections } from "@/types";
import { THEMES } from "@/lib/themes";
import { toPng } from "html-to-image";
import {
  Sparkles,
  Share2,
  Download,
  Calendar,
  MapPin,
  CheckCircle,
  Copy,
  Check,
} from "lucide-react";

interface FunnelStep5Props {
  config: AppConfig;
  selections: FunnelSelections;
  onReset: () => void;
}

export const FunnelStep5: React.FC<FunnelStep5Props> = ({
  config,
  selections,
  onReset,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

  const theme = THEMES[config.theme] || THEMES["pastel-romance"];

  const chosenTime =
    config.step3.options.find((o) => o.id === selections.step3OptionId) ||
    config.step3.options[0];
  const chosenActivity =
    config.step4.options.find((o) => o.id === selections.step4OptionId) ||
    config.step4.options[0];

  const summaryText = `🎉 IT'S OFFICIAL!\n\nQuestion: "${config.step1.title}"\nAnswer: YES! 💖\nWhen: ${chosenTime?.title} (${chosenTime?.description || ""})\nActivity: ${chosenActivity?.title} (${chosenActivity?.description || ""})\n\nLocked in via YesPlan / Forced Choice Studio ✨`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: config.title,
          text: summaryText,
          url: window.location.href,
        });
        return;
      } catch {
        // Fallback
      }
    }

    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      summaryText
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleCopySummary = () => {
    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        quality: 0.98,
        pixelRatio: 2,
      });
      const link = document.createElement("a");
      link.download = `date-pass-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to render card pass:", err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 py-6 sm:py-8 w-full max-w-lg mx-auto select-none">
      <div className="text-center mb-6">
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border ${theme.chipBg}`}>
          <Sparkles className="w-3.5 h-3.5" />
          <span>{config.step5.badgeText || "OFFICIAL PASS"}</span>
        </span>
        <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight mb-1 ${theme.headingText}`}>
          {config.step5.title}
        </h2>
        <p className={`text-sm max-w-xs mx-auto ${theme.mutedText}`}>
          {config.step5.subtitle}
        </p>
      </div>

      {/* The Printable / Downloadable Boarding Pass / Date Card */}
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 15, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className={`w-full rounded-3xl p-6 sm:p-7 border-2 shadow-2xl relative overflow-hidden mb-8 ${theme.passBg} ${theme.passBorder} ${theme.passText}`}
      >
        {/* Top Decorative Header */}
        <div className="flex items-center justify-between border-b border-dashed border-slate-300/40 pb-4 mb-5">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{config.step1.emoji || "💖"}</span>
            <div>
              <span className={`text-[10px] font-mono tracking-widest uppercase opacity-60 ${theme.passMutedText}`}>
                STATUS
              </span>
              <p className="font-extrabold text-xs sm:text-sm text-emerald-500 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> 100% CONFIRMED
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className={`text-[10px] font-mono tracking-widest uppercase opacity-60 ${theme.passMutedText}`}>
              PASS ID
            </span>
            <p className="font-mono text-xs font-bold">
              #YES-{Math.floor(100000 + Math.random() * 900000)}
            </p>
          </div>
        </div>

        {/* Question Title */}
        <div className="mb-5">
          <span className={`text-[10px] font-mono tracking-widest uppercase opacity-60 ${theme.passMutedText}`}>
            ORIGINAL PROPOSAL
          </span>
          <h3 className="font-bold text-base sm:text-lg leading-snug">
            "{config.step1.title}"
          </h3>
        </div>

        {/* Selected Details Grid */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl border mb-5 ${theme.passCardInner}`}>
          <div className="flex items-start gap-2.5">
            <div className={`p-2 rounded-xl shadow-xs flex-shrink-0 ${theme.iconBg}`}>
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <span className={`text-[10px] font-mono uppercase opacity-60 ${theme.passMutedText}`}>
                SCHEDULED TIME
              </span>
              <p className="font-bold text-xs sm:text-sm">
                {chosenTime?.emoji} {chosenTime?.title}
              </p>
              {chosenTime?.description && (
                <p className={`text-[11px] opacity-70 ${theme.passMutedText}`}>
                  {chosenTime.description}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <div className={`p-2 rounded-xl shadow-xs flex-shrink-0 ${theme.iconBg}`}>
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <span className={`text-[10px] font-mono uppercase opacity-60 ${theme.passMutedText}`}>
                PLANNED ACTIVITY
              </span>
              <p className="font-bold text-xs sm:text-sm">
                {chosenActivity?.emoji} {chosenActivity?.title}
              </p>
              {chosenActivity?.description && (
                <p className={`text-[11px] opacity-70 ${theme.passMutedText}`}>
                  {chosenActivity.description}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Footer Seal */}
        <div className={`flex items-center justify-between text-[11px] border-t border-slate-300/40 pt-3 opacity-70 ${theme.passMutedText}`}>
          <span>Non-transferable • Zero cancellations allowed</span>
          <span className="font-mono">YesPlan Verified ✨</span>
        </div>

        {/* Decorative Ticket Punch Out notches */}
        <div className={`absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-r ${theme.passTicketNotch}`} />
        <div className={`absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-l ${theme.passTicketNotch}`} />
      </motion.div>

      {/* Action Buttons */}
      <div className="w-full flex flex-col sm:flex-row gap-3">
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleShare}
          className={`flex-1 py-3.5 px-5 rounded-full font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md ${theme.primaryButton}`}
        >
          <Share2 className="w-4 h-4" />
          <span>{config.step5.confirmButtonText || "Send to Me"}</span>
        </motion.button>

        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleDownload}
          disabled={downloading}
          className={`flex-1 py-3.5 px-5 rounded-full font-semibold border flex items-center justify-center gap-2 shadow-xs cursor-pointer transition-colors ${theme.secondaryButton}`}
        >
          <Download className="w-4 h-4" />
          <span>{downloading ? "Saving..." : "Download Pass"}</span>
        </motion.button>
      </div>

      <div className="mt-4 flex items-center gap-4">
        <button
          type="button"
          onClick={handleCopySummary}
          className={`text-xs flex items-center gap-1 cursor-pointer transition-colors ${theme.mutedText} hover:opacity-100`}
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? "Copied summary!" : "Copy text recap"}</span>
        </button>

        <span className="opacity-30">•</span>

        <button
          type="button"
          onClick={onReset}
          className={`text-xs cursor-pointer underline transition-colors ${theme.mutedText} hover:opacity-100`}
        >
          Start over
        </button>
      </div>
    </div>
  );
};
