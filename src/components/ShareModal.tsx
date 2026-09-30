"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppConfig } from "@/types";
import { TEMPLATES } from "@/lib/templates";
import { generateShareUrl } from "@/lib/urlState";
import {
  X,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  Link,
  Send,
  Layers,
} from "lucide-react";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: AppConfig;
  onSelectTemplate: (templateKey: string) => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  config,
  onSelectTemplate,
}) => {
  const [copied, setCopied] = useState(false);

  const directUrl = generateShareUrl(config, true);

  if (!isOpen) return null;

  const handleCopyDirect = () => {
    navigator.clipboard.writeText(directUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTestRecipient = () => {
    window.open(directUrl, "_blank");
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-100 relative max-h-[90vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center shadow-xs">
              <Send className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-slate-900">
                Share Your Funnel
              </h3>
              <p className="text-xs text-slate-500">
                Send to your recipient with zero backend or database required
              </p>
            </div>
          </div>

          {/* Standard Shareable Link Box */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Link className="w-3.5 h-3.5 text-rose-500" />
                <span>Shareable Recipient Link</span>
              </label>
              <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Ready to Send
              </span>
            </div>

            <div className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-2xl border-2 border-slate-200 focus-within:border-rose-400 focus-within:ring-2 focus-within:ring-rose-100 transition-all">
              <input
                type="text"
                readOnly
                value={directUrl}
                className="flex-1 bg-transparent text-xs font-mono text-slate-700 outline-none truncate select-all px-2"
              />
              <button
                type="button"
                onClick={handleCopyDirect}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer flex-shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              onClick={handleCopyDirect}
              className="py-3.5 px-4 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer transform hover:scale-[1.01]"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Recipient Link</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleTestRecipient}
              className="py-3.5 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Test Recipient View</span>
            </button>
          </div>

          {/* Quick Preset Templates Switcher */}
          <div className="border-t border-slate-100 pt-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-slate-400" />
                Quick Preset Templates
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {Object.entries(TEMPLATES).map(([key, t]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => onSelectTemplate(key)}
                  className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                    config.id === key
                      ? "border-rose-500 bg-rose-50/50 ring-2 ring-rose-200"
                      : "border-slate-200 hover:border-slate-300 bg-white"
                  }`}
                >
                  <span className="text-2xl">{t.step1.emoji}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-slate-900 truncate">
                      {t.title}
                    </p>
                    <p className="text-[10px] text-slate-400">Rigged Choice</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
