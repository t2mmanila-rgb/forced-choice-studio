"use client";

import React, { useState } from "react";
import { AppConfig } from "@/types";
import { TEMPLATES } from "@/lib/templates";
import { generateShareUrl } from "@/lib/urlState";
import {
  Heart,
  Share2,
  Copy,
  Check,
  Eye,
  Edit3,
  RotateCcw,
  Sparkles,
  Smartphone,
  Monitor,
} from "lucide-react";

interface HeaderProps {
  mode: "builder" | "play";
  onModeChange: (mode: "builder" | "play") => void;
  config: AppConfig;
  onSelectTemplate: (templateKey: string) => void;
  onOpenShareModal: () => void;
  onResetDefaults: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  mode,
  onModeChange,
  config,
  onSelectTemplate,
  onOpenShareModal,
  onResetDefaults,
}) => {
  const [copied, setCopied] = useState(false);

  const handleQuickCopy = () => {
    const url = generateShareUrl(config, true);
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="h-16 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between z-30 sticky top-0">
      {/* Brand & Tagline */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-500 to-pink-500 text-white flex items-center justify-center shadow-sm shadow-rose-200">
          <Heart className="w-5 h-5 fill-current" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-slate-900 tracking-tight text-base sm:text-lg">
              YesPlan
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
              Studio
            </span>
          </div>
          <p className="text-[10px] text-slate-400 hidden sm:block">
            Forced Choice Interactive Funnels
          </p>
        </div>
      </div>

      {/* Center: Mode Switcher */}
      <div className="flex items-center bg-slate-100 p-1 rounded-full border border-slate-200/80">
        <button
          type="button"
          onClick={() => onModeChange("builder")}
          className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
            mode === "builder"
              ? "bg-white text-slate-900 shadow-xs"
              : "text-slate-500 hover:text-slate-900"
          }`}
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Builder / Studio</span>
          <span className="sm:hidden">Studio</span>
        </button>

        <button
          type="button"
          onClick={() => onModeChange("play")}
          className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
            mode === "play"
              ? "bg-rose-500 text-white shadow-xs"
              : "text-slate-500 hover:text-slate-900"
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Recipient Mode</span>
          <span className="sm:hidden">Play</span>
        </button>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Template Selector dropdown */}
        <select
          value={config.id in TEMPLATES ? config.id : ""}
          onChange={(e) => {
            if (e.target.value) onSelectTemplate(e.target.value);
          }}
          className="text-xs font-semibold py-1.5 px-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 outline-none hover:bg-slate-100 hidden md:block cursor-pointer"
        >
          <option value="" disabled>
            ✨ Choose Template
          </option>
          {Object.entries(TEMPLATES).map(([key, t]) => (
            <option key={key} value={key}>
              {t.title}
            </option>
          ))}
        </select>

        {/* Quick Copy Link */}
        <button
          type="button"
          onClick={handleQuickCopy}
          className="p-2 sm:px-3 sm:py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          title="Quick Copy Share Link"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-500" />
              <span className="hidden sm:inline text-emerald-600">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-slate-500" />
              <span className="hidden sm:inline">Copy Link</span>
            </>
          )}
        </button>

        {/* Share Modal Button */}
        <button
          type="button"
          onClick={onOpenShareModal}
          className="py-1.5 px-3 sm:px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Share</span>
        </button>

        {/* Reset button */}
        <button
          type="button"
          onClick={onResetDefaults}
          className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          title="Reset to Template Defaults"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
