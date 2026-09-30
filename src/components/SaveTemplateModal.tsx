"use client";

import React, { useState, useEffect } from "react";
import { AppConfig, UserProfile } from "@/types";
import { THEMES } from "@/lib/themes";
import { TEMPLATES } from "@/lib/templates";
import { isStandardTemplate } from "@/lib/authStorage";
import {
  Bookmark,
  X,
  Sparkles,
  ShieldCheck,
  FolderHeart,
  Edit2,
  Copy,
  Check,
} from "lucide-react";

interface SaveTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: AppConfig;
  user: UserProfile | null;
  onSave: (title: string, description: string, asNew: boolean) => void;
}

export const SaveTemplateModal: React.FC<SaveTemplateModalProps> = ({
  isOpen,
  onClose,
  config,
  user,
  onSave,
}) => {
  const isStandard = isStandardTemplate(config.id);
  const isExistingUserTemplate = !isStandard && Boolean(config.id && config.id.startsWith("user_tmpl_"));

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  // Determine initial title when modal opens
  useEffect(() => {
    if (isOpen) {
      if (isStandard) {
        // Standard template: suggest a customized name
        const baseName = config.title || TEMPLATES[config.id]?.title || "Funnel";
        setTitle(`${baseName} (Custom)`);
      } else {
        // Already a custom template: keep existing title
        setTitle(config.title || config.step1?.title || "My Custom Template");
      }
      setDescription("");
      setError("");
    }
  }, [isOpen, config, isStandard]);

  if (!isOpen) return null;

  const baseStandardKey = config.baseTemplateId || (isStandard ? config.id : null);
  const baseStandard = baseStandardKey && TEMPLATES[baseStandardKey] ? TEMPLATES[baseStandardKey] : null;
  const currentTheme = THEMES[config.theme] || THEMES["pastel-romance"];

  const handleConfirmSave = (asNew: boolean) => {
    const cleanTitle = title.trim();
    if (!cleanTitle) {
      setError("Please provide a name or title for your template");
      return;
    }
    onSave(cleanTitle, description.trim(), asNew);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-100 bg-gradient-to-r from-rose-50/70 via-pink-50/50 to-amber-50/70 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-500 text-white flex items-center justify-center shadow-sm">
              <Bookmark className="w-5 h-5 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                  {isExistingUserTemplate ? "Save Template Changes" : "Save as New Template"}
                </h3>
                <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Personal Library
                </span>
              </div>
              <p className="text-xs text-slate-500">
                {user ? `Saving to profile @${user.name}` : "Saving to your browser library"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-white/80 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Safety Notice Callout */}
          <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200/90 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-emerald-900 leading-relaxed">
              <strong>Standard templates remain safe & unchanged.</strong>{" "}
              {isStandard
                ? "Your customized wording and choices will be saved as a brand-new template under your profile."
                : "You can update this saved template directly or save it as a separate new copy."}
            </div>
          </div>

          {/* Template Title Input */}
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
              Template Title / Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError("");
              }}
              placeholder="e.g. Anniversary Dinner Date for Maya"
              className="w-full px-4 py-3 text-sm font-semibold border-2 border-slate-200 rounded-2xl outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-all text-slate-900 bg-white"
              autoFocus
            />
            {error && <p className="text-xs text-rose-600 font-semibold mt-1">{error}</p>}
            <p className="text-[11px] text-slate-400 mt-1">
              This name will appear in "My Saved Templates" and in the template selector.
            </p>
          </div>

          {/* Optional Description / Notes */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Notes or Description <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. With teleporting button & candlelit dinner trap"
              className="w-full px-4 py-2.5 text-xs font-medium border border-slate-200 rounded-xl outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-100 transition-all text-slate-800 bg-white"
            />
          </div>

          {/* Quick Overview Summary */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
            <div className="font-bold text-slate-700 flex items-center justify-between">
              <span>Template Snapshot</span>
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Preview
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
              <div className="bg-white p-2 rounded-xl border border-slate-200/60">
                <span className="text-slate-400 block text-[10px] uppercase">Base Foundation:</span>
                <span className="font-bold text-slate-800 truncate block">
                  {baseStandard ? `${baseStandard.step1.emoji} ${baseStandard.title}` : "Guided Custom"}
                </span>
              </div>

              <div className="bg-white p-2 rounded-xl border border-slate-200/60">
                <span className="text-slate-400 block text-[10px] uppercase">Visual Theme:</span>
                <span className="font-bold text-slate-800 truncate block">
                  {currentTheme.name}
                </span>
              </div>
            </div>

            <div className="bg-white p-2.5 rounded-xl border border-slate-200/60">
              <span className="text-slate-400 block text-[10px] uppercase">Opening Question:</span>
              <p className="font-semibold text-slate-800 italic truncate">
                "{config.step1.title}"
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/90 flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-slate-600 hover:text-slate-900 text-xs font-bold transition-colors cursor-pointer text-center"
          >
            Cancel
          </button>

          <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-2">
            {isExistingUserTemplate ? (
              <>
                <button
                  type="button"
                  onClick={() => handleConfirmSave(true)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  title="Save as a separate new copy"
                >
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>Save as New Copy</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleConfirmSave(false)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-sm shadow-rose-200 transition-all cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Update Template</span>
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => handleConfirmSave(true)}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white text-xs font-extrabold flex items-center justify-center gap-2 shadow-md shadow-rose-200 transition-all cursor-pointer transform hover:scale-[1.02]"
              >
                <FolderHeart className="w-4 h-4" />
                <span>Save to My Profile 💾</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
