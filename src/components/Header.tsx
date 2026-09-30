"use client";

import React, { useState } from "react";
import { AppConfig, UserProfile } from "@/types";
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
  ChevronDown,
  Bookmark,
  LogIn,
  LogOut,
} from "lucide-react";

interface HeaderProps {
  mode: "builder" | "play";
  onModeChange: (mode: "builder" | "play") => void;
  config: AppConfig;
  onSelectTemplate: (templateKey: string) => void;
  onOpenShareModal: () => void;
  onResetDefaults: () => void;
  onOpenWizard?: () => void;
  user: UserProfile | null;
  onOpenLogin: (reason?: string) => void;
  onLogout: () => void;
  onSaveTemplate: () => void;
  isSaved?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  mode,
  onModeChange,
  config,
  onSelectTemplate,
  onOpenShareModal,
  onResetDefaults,
  onOpenWizard,
  user,
  onOpenLogin,
  onLogout,
  onSaveTemplate,
  isSaved,
}) => {
  const [copied, setCopied] = useState(false);

  const handleQuickCopy = () => {
    const url = generateShareUrl(config, true);
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentTemplate = TEMPLATES[config.id] || TEMPLATES["romantic-date"];

  return (
    <header className="h-16 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between z-30 sticky top-0 select-none">
      {/* Brand & Active Template Pill */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2.5">
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

        {/* Quick Template Switcher Dropdown */}
        <div className="hidden lg:flex items-center relative">
          <div className="flex items-center gap-1.5 pl-3 border-l border-slate-200 text-xs">
            <span className="text-slate-400 font-medium">Template:</span>
            <select
              value={config.id in TEMPLATES ? config.id : "romantic-date"}
              onChange={(e) => onSelectTemplate(e.target.value)}
              className="font-bold text-slate-800 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 rounded-xl px-2.5 py-1 outline-none cursor-pointer text-xs"
            >
              {Object.entries(TEMPLATES).map(([key, t]) => (
                <option key={key} value={key}>
                  {t.step1.emoji} {t.title}
                </option>
              ))}
            </select>
          </div>
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
        {/* Custom Wizard Launcher */}
        {onOpenWizard && (
          <button
            type="button"
            onClick={onOpenWizard}
            className="flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Custom Wizard</span>
            <span className="sm:hidden">Wizard</span>
          </button>
        )}

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

        {/* Save Template Button */}
        <button
          type="button"
          onClick={onSaveTemplate}
          className={`py-1.5 px-3 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ${
            isSaved
              ? "bg-emerald-50 text-emerald-700 border-emerald-300"
              : "border-slate-200 hover:bg-slate-50 text-slate-700"
          }`}
          title="Save customization to your browser library"
        >
          {isSaved ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Saved</span>
            </>
          ) : (
            <>
              <Bookmark className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Save</span>
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

        {/* User Session Profile / Sign In */}
        {user ? (
          <div className="flex items-center gap-1.5 pl-1.5 border-l border-slate-200">
            <div
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800"
              title={`Logged in as ${user.name}`}
            >
              <span>{user.avatarEmoji || "👤"}</span>
              <span className="hidden md:inline max-w-[85px] truncate">{user.name}</span>
            </div>
            <button
              type="button"
              onClick={onLogout}
              className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => onOpenLogin("Sign in to create, customize, and save templates")}
            className="flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </button>
        )}

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
