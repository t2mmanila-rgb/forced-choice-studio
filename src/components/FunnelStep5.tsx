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
        // User cancelled or fallback
      }
    }

    // Fallback: Open WhatsApp with prefilled message
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
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 bg-emerald-50 text-emerald-700 border border-emerald-200">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{config.step5.badgeText || "OFFICIAL PASS"}</span>
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight mb-1">
          {config.step5.title}
        </h2>
        <p className="text-sm text-slate-500 max-w-xs mx-auto">
          {config.step5.subtitle}
        </p>
      </div>

      {/* The Printable / Downloadable Boarding Pass / Date Card */}
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 15, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="w-full bg-white rounded-3xl p-6 sm:p-7 border-2 border-slate-200/90 shadow-2xl relative overflow-hidden mb-8"
      >
        {/* Top Decorative Header */}
        <div className="flex items-center justify-between border-b border-dashed border-slate-200 pb-4 mb-5">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{config.step1.emoji || "💖"}</span>
            <div>
              <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                STATUS
              </span>
              <p className="font-extrabold text-xs sm:text-sm text-emerald-600 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> 100% CONFIRMED
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
              PASS ID
            </span>
            <p className="font-mono text-xs font-bold text-slate-700">
              #YES-{Math.floor(100000 + Math.random() * 900000)}
            </p>
          </div>
        </div>

        {/* Question Title */}
        <div className="mb-5">
          <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
            ORIGINAL PROPOSAL
          </span>
          <h3 className="font-bold text-base sm:text-lg text-slate-900 leading-snug">
            "{config.step1.title}"
          </h3>
        </div>

        {/* Selected Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 mb-5">
          <div className="flex items-start gap-2.5">
            <div className="p-2 rounded-xl bg-white shadow-xs text-slate-600 border border-slate-100 flex-shrink-0">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase">
                SCHEDULED TIME
              </span>
              <p className="font-bold text-xs sm:text-sm text-slate-800">
                {chosenTime?.emoji} {chosenTime?.title}
              </p>
              {chosenTime?.description && (
                <p className="text-[11px] text-slate-500">
                  {chosenTime.description}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="p-2 rounded-xl bg-white shadow-xs text-slate-600 border border-slate-100 flex-shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase">
                PLANNED ACTIVITY
              </span>
              <p className="font-bold text-xs sm:text-sm text-slate-800">
                {chosenActivity?.emoji} {chosenActivity?.title}
              </p>
              {chosenActivity?.description && (
                <p className="text-[11px] text-slate-500">
                  {chosenActivity.description}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Footer Seal */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-100 pt-3">
          <span>Non-transferable • Zero cancellations allowed</span>
          <span className="font-mono">YesPlan Verified ✨</span>
        </div>

        {/* Decorative Ticket Punch Out notches */}
        <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-100 border-r border-slate-300" />
        <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-100 border-l border-slate-300" />
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
          className="flex-1 py-3.5 px-5 rounded-full font-semibold bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 flex items-center justify-center gap-2 shadow-xs cursor-pointer transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>{downloading ? "Saving..." : "Download Pass"}</span>
        </motion.button>
      </div>

      <div className="mt-4 flex items-center gap-4">
        <button
          type="button"
          onClick={handleCopySummary}
          className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? "Copied summary!" : "Copy text recap"}</span>
        </button>

        <span className="text-slate-300">•</span>

        <button
          type="button"
          onClick={onReset}
          className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer underline transition-colors"
        >
          Start over
        </button>
      </div>
    </div>
  );
};
