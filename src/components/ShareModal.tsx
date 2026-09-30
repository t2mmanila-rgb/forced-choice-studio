"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppConfig } from "@/types";
import { TEMPLATES } from "@/lib/templates";
import { generateShareUrl, createShortUrl } from "@/lib/urlState";
import {
  X,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  Link,
  Send,
  Layers,
  Scissors,
  Loader2,
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
  const [shortUrl, setShortUrl] = useState<string>("");
  const [isShortening, setIsShortening] = useState(false);
  const [shortCopied, setShortCopied] = useState(false);

  const directUrl = generateShareUrl(config, true);

  // Reset short url when config changes
  useEffect(() => {
    setShortUrl("");
  }, [config]);

  if (!isOpen) return null;

  const handleCopyDirect = () => {
    navigator.clipboard.writeText(directUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyShort = () => {
    if (!shortUrl) return;
    navigator.clipboard.writeText(shortUrl);
    setShortCopied(true);
    setTimeout(() => setShortCopied(false), 2000);
  };

  const handleCreateShortLink = async () => {
    setIsShortening(true);
    try {
      const short = await createShortUrl(directUrl);
      setShortUrl(short);
    } catch {
      setShortUrl(directUrl);
    } finally {
      setIsShortening(false);
    }
  };

  const handleTestRecipient = () => {
    window.open(shortUrl || directUrl, "_blank");
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
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
            className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-5">
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

          {/* Tiny / Short URL Feature */}
          <div className="mb-5 p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-rose-50 border border-amber-200/80">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Scissors className="w-4 h-4 text-amber-600" />
                Ultra-Short Share Link
              </span>
              <span className="text-[10px] font-bold text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-full">
                {shortUrl ? "Shortened!" : "Much Shorter Link"}
              </span>
            </div>

            {shortUrl ? (
              <div className="flex items-center gap-2 p-2 bg-white rounded-xl border border-amber-300 shadow-xs">
                <input
                  type="text"
                  readOnly
                  value={shortUrl}
                  className="flex-1 bg-transparent text-xs font-mono font-bold text-slate-800 outline-none truncate select-all"
                />
                <button
                  type="button"
                  onClick={handleCopyShort}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
                >
                  {shortCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Short</span>
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-3">
                <p className="text-[11px] text-slate-600">
                  Generate a compact ~25 character link easy to text or DM:
                </p>
                <button
                  type="button"
                  onClick={handleCreateShortLink}
                  disabled={isShortening}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer flex-shrink-0 disabled:opacity-50"
                >
                  {isShortening ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Shortening...</span>
                    </>
                  ) : (
                    <>
                      <Scissors className="w-3.5 h-3.5 text-amber-400" />
                      <span>Generate Short Link</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Direct Compact URL Box */}
          <div className="mb-6">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Direct Link ({directUrl.length} chars)
            </label>
            <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="p-2 rounded-xl bg-white text-slate-400 border border-slate-200/60">
                <Link className="w-4 h-4" />
              </div>
              <input
                type="text"
                readOnly
                value={directUrl}
                className="flex-1 bg-transparent text-xs font-mono text-slate-600 outline-none truncate select-all"
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
              onClick={shortUrl ? handleCopyShort : handleCopyDirect}
              className="py-3 px-4 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <Copy className="w-4 h-4" />
              <span>{shortUrl ? "Copy Short Link" : "Copy Recipient Link"}</span>
            </button>

            <button
              type="button"
              onClick={handleTestRecipient}
              className="py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
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
                  onClick={() => {
                    onSelectTemplate(key);
                    onClose();
                  }}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                    config.id === key
                      ? "border-rose-400 bg-rose-50/50 shadow-xs"
                      : "border-slate-200/80 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <span className="text-2xl">{t.step1.emoji}</span>
                  <div>
                    <h5 className="font-bold text-xs text-slate-800 line-clamp-1">
                      {t.title}
                    </h5>
                    <p className="text-[11px] text-slate-500 line-clamp-1">
                      {t.step4.mode === "rigged" ? "Rigged Choice" : "Free Choice"}
                    </p>
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
