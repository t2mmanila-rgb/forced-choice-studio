"use client";

import React, { useState } from "react";
import { AppConfig, EvasionBehavior, ThemeId, ChoiceCard, UserProfile, SavedTemplateRecord } from "@/types";
import { THEMES } from "@/lib/themes";
import { TEMPLATES } from "@/lib/templates";
import {
  Sparkles,
  Palette,
  Zap,
  Target,
  Layers,
  Plus,
  Trash2,
  ChevronDown,
  Info,
  Check,
  ArrowRight,
  Flame,
  Lock,
  FolderHeart,
  Clock,
  Bookmark,
} from "lucide-react";

interface BuilderSidebarProps {
  config: AppConfig;
  onChange: (newConfig: AppConfig) => void;
  onSelectTemplate: (templateKey: string) => void;
  onOpenWizard?: () => void;
  user: UserProfile | null;
  onOpenLogin: (reason?: string) => void;
  savedTemplates: SavedTemplateRecord[];
  onSelectSavedTemplate: (record: SavedTemplateRecord) => void;
  onDeleteSavedTemplate: (id: string) => void;
  onOpenSaveModal?: () => void;
}


type TabType = "templates" | "theme" | "evasion" | "rigging" | "cards";

export const BuilderSidebar: React.FC<BuilderSidebarProps> = ({
  config,
  onChange,
  onSelectTemplate,
  onOpenWizard,
  user,
  onOpenLogin,
  savedTemplates,
  onSelectSavedTemplate,
  onDeleteSavedTemplate,
  onOpenSaveModal,
}) => {

  const [activeTab, setActiveTab] = useState<TabType>("templates");
  const [newPhrase, setNewPhrase] = useState("");
  const [stepCopyOpen, setStepCopyOpen] = useState<number | null>(1);

  const updateConfig = (updater: (prev: AppConfig) => AppConfig) => {
    onChange(updater(config));
  };

  const handleAddPhrase = () => {
    if (!newPhrase.trim()) return;
    updateConfig((prev) => ({
      ...prev,
      step4: {
        ...prev.step4,
        rejectionPhrases: [...prev.step4.rejectionPhrases, newPhrase.trim()],
      },
    }));
    setNewPhrase("");
  };

  const handleRemovePhrase = (index: number) => {
    updateConfig((prev) => ({
      ...prev,
      step4: {
        ...prev.step4,
        rejectionPhrases: prev.step4.rejectionPhrases.filter((_, i) => i !== index),
      },
    }));
  };

  const handleAddActivityCard = () => {
    const newCard: ChoiceCard = {
      id: `act-${Date.now()}`,
      title: "New Activity",
      description: "Fun times guaranteed",
      emoji: "✨",
    };
    updateConfig((prev) => ({
      ...prev,
      step4: {
        ...prev.step4,
        options: [...prev.step4.options, newCard],
      },
    }));
  };

  const handleRemoveActivityCard = (id: string) => {
    updateConfig((prev) => ({
      ...prev,
      step4: {
        ...prev.step4,
        options: prev.step4.options.filter((o) => o.id !== id),
        targetId: prev.step4.targetId === id ? prev.step4.options[0]?.id || "" : prev.step4.targetId,
      },
    }));
  };

  const handleAddTimeCard = () => {
    const newCard: ChoiceCard = {
      id: `time-${Date.now()}`,
      title: "New Time Slot",
      description: "Convenient window",
      emoji: "⏰",
    };
    updateConfig((prev) => ({
      ...prev,
      step3: {
        ...prev.step3,
        options: [...prev.step3.options, newCard],
      },
    }));
  };

  const handleRemoveTimeCard = (id: string) => {
    updateConfig((prev) => ({
      ...prev,
      step3: {
        ...prev.step3,
        options: prev.step3.options.filter((o) => o.id !== id),
      },
    }));
  };

  return (
    <div className="w-full h-full bg-white border-r border-slate-200 flex flex-col overflow-hidden text-slate-800">
      {/* Step Navigation Tabs Bar */}
      <div className="flex border-b border-slate-200 bg-slate-50/90 p-1.5 gap-1 select-none overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab("templates")}
          className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === "templates"
              ? "bg-slate-900 text-white shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>1. Templates</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("theme")}
          className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === "theme"
              ? "bg-slate-900 text-white shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          <span>2. Theme & Copy</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("evasion")}
          className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === "evasion"
              ? "bg-slate-900 text-white shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          <span>3. Evasion</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("rigging")}
          className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === "rigging"
              ? "bg-slate-900 text-white shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
          }`}
        >
          <Target className="w-3.5 h-3.5" />
          <span>4. Rigging</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("cards")}
          className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === "cards"
              ? "bg-slate-900 text-white shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>5. Cards</span>
        </button>
      </div>

      {/* Tab Panels */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        {/* ===================== TAB 1: PRESET TEMPLATES (FIRST STEP) ===================== */}
        {activeTab === "templates" && (
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 text-xs font-black flex items-center justify-center">
                  1
                </span>
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                  Choose a Starting Template
                </h3>
              </div>
              <p className="text-xs text-slate-500 mb-4">
                Select a pre-configured scenario. You can customize the theme, questions, and rigged logic right after!
              </p>
            </div>

            {/* Custom Guided Template Creator Launcher */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 via-rose-500/10 to-pink-500/10 border-2 border-dashed border-rose-300 flex flex-col gap-3 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-500 text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-xs sm:text-sm text-slate-900">
                    Custom Template Wizard
                  </h4>
                  <p className="text-[11px] text-slate-600">
                    Step-by-step custom guide with smart suggestions
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (!user) {
                    onOpenLogin("Sign in to create your own custom templates");
                  } else if (onOpenWizard) {
                    onOpenWizard();
                  }
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-pink-500 hover:from-amber-600 hover:to-pink-600 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer transform hover:scale-[1.01]"
              >
                {!user && <Lock className="w-3.5 h-3.5" />}
                <span>Launch Guided Creator ✨</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {Object.entries(TEMPLATES).map(([key, t]) => {
                const isSelected = config.id === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => onSelectTemplate(key)}
                    className={`p-4 rounded-2xl border text-left transition-all relative flex flex-col gap-2 cursor-pointer ${
                      isSelected
                        ? "border-rose-500 bg-rose-50/40 ring-2 ring-rose-200 shadow-md"
                        : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/80 bg-white"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl leading-none">{t.step1.emoji}</span>
                        <div>
                          <h4 className="font-bold text-sm text-slate-900">
                            {t.title}
                          </h4>
                          <span className="text-[11px] font-semibold text-rose-600 uppercase tracking-wider">
                            {t.step4.mode === "rigged" ? "Rigged Single Path" : "Free Choice"}
                          </span>
                        </div>
                      </div>

                      {isSelected && (
                        <div className="w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-xs">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </div>

                    <p className="text-xs text-slate-500 italic bg-white/70 p-2.5 rounded-xl border border-slate-100">
                      "{t.step1.title}"
                    </p>

                    <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-400">
                      <span>Evasion: <strong>{t.step1.evasionBehavior}</strong></span>
                      <span>•</span>
                      <span>Default Theme: <strong>{THEMES[t.theme]?.name}</strong></span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* ================= My Saved Templates Section ================= */}
            <div className="pt-4 border-t border-slate-200">
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-1.5">
                  <FolderHeart className="w-4 h-4 text-rose-500" />
                  <h4 className="font-extrabold text-xs text-slate-800 uppercase tracking-wider">
                    My Saved Templates
                  </h4>
                </div>
                {user && (
                  <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                    {savedTemplates.length} saved
                  </span>
                )}
              </div>

              {/* Save Current Template Button */}
              {user && onOpenSaveModal && (
                <button
                  type="button"
                  onClick={onOpenSaveModal}
                  className="w-full mb-3 py-2 px-3 rounded-xl bg-gradient-to-r from-rose-500/10 via-pink-500/10 to-amber-500/10 hover:from-rose-500/20 hover:to-amber-500/20 border border-rose-200 text-rose-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs"
                >
                  <Bookmark className="w-3.5 h-3.5 fill-current" />
                  <span>Save Current Template with Name 💾</span>
                </button>
              )}

              {!user ? (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
                  <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center mx-auto">
                    <Lock className="w-4 h-4" />
                  </div>
                  <p className="text-xs text-slate-600 font-medium">
                    Sign in to save customizations and access your personal template library.
                  </p>
                  <button
                    type="button"
                    onClick={() => onOpenLogin("Sign in to save and access your personal template library")}
                    className="px-4 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
                  >
                    Sign In
                  </button>
                </div>
              ) : savedTemplates.length === 0 ? (
                <div className="p-4 rounded-2xl bg-slate-50 border border-dashed border-slate-200 text-center">
                  <p className="text-xs text-slate-500">
                    No saved templates yet. Customize any template or use the wizard, then click <strong>Save Template</strong> above!
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {savedTemplates.map((item) => {
                    const isCurrent = config.id === item.id;
                    const baseKey = item.baseTemplateId || item.config.baseTemplateId;
                    const baseName = baseKey && TEMPLATES[baseKey] ? TEMPLATES[baseKey].title : null;

                    return (
                      <div
                        key={item.id}
                        className={`p-3 bg-white rounded-xl border transition-all flex items-center justify-between gap-2 shadow-2xs ${
                          isCurrent
                            ? "border-rose-300 ring-2 ring-rose-100 bg-rose-50/20"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => onSelectSavedTemplate(item)}
                          className="flex-1 text-left min-w-0 cursor-pointer"
                        >
                          <div className="flex items-center gap-1.5">
                            <span className="text-base">{item.config.step1.emoji || "✨"}</span>
                            <span className="text-xs font-bold text-slate-900 truncate">
                              {item.title}
                            </span>
                            {isCurrent && (
                              <span className="text-[9px] font-extrabold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded-full border border-emerald-200">
                                Active
                              </span>
                            )}
                          </div>
                          {item.description && (
                            <p className="text-[11px] text-slate-500 italic truncate mt-0.5">
                              {item.description}
                            </p>
                          )}
                          <div className="flex items-center gap-2 mt-0.5 text-[10px] text-slate-400">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {new Date(item.updatedAt).toLocaleDateString()}
                            </span>
                            {baseName && (
                              <span>• Based on: {baseName}</span>
                            )}
                          </div>
                        </button>

                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => onSelectSavedTemplate(item)}
                            className={`px-2.5 py-1 text-[11px] font-bold rounded-lg cursor-pointer transition-colors ${
                              isCurrent
                                ? "text-emerald-700 bg-emerald-50 border border-emerald-200"
                                : "text-slate-700 bg-slate-100 hover:bg-slate-200"
                            }`}
                          >
                            {isCurrent ? "Active" : "Load"}
                          </button>
                          <button
                            type="button"
                            onClick={() => onDeleteSavedTemplate(item.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                            title="Delete saved template"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>


            <div className="pt-2">
              <button
                type="button"
                onClick={() => setActiveTab("theme")}
                className="w-full py-3.5 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <span>Continue to Theme & Copy</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ===================== TAB 2: THEME & COPY ===================== */}
        {activeTab === "theme" && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-800 text-xs font-black flex items-center justify-center">
                  2
                </span>
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                  Select Visual Style
                </h3>
              </div>
              <p className="text-xs text-slate-500 mb-3">
                Watch the preview canvas adapt instantly to the distinct aesthetic.
              </p>

              <div className="grid grid-cols-1 gap-3">
                {Object.values(THEMES).map((th) => {
                  const isSelected = config.theme === th.id;
                  return (
                    <button
                      key={th.id}
                      type="button"
                      onClick={() => updateConfig((prev) => ({ ...prev, theme: th.id }))}
                      className={`p-3.5 rounded-2xl border text-left flex items-start justify-between transition-all cursor-pointer ${
                        isSelected
                          ? "border-rose-500 ring-2 ring-rose-200 bg-rose-50/40 shadow-sm"
                          : "border-slate-200 hover:border-slate-300 bg-white"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                            th.id === "pastel-romance"
                              ? "bg-rose-400 text-white"
                              : th.id === "electric-fun"
                              ? "bg-purple-950 text-cyan-300 border border-cyan-400"
                              : "bg-black text-emerald-400 border border-zinc-700"
                          }`}
                        >
                          {th.id === "pastel-romance" ? "💖" : th.id === "electric-fun" ? "⚡" : "⬛"}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                              {th.name}
                            </h4>
                            <span className="text-[10px] text-slate-400 font-medium">
                              ({th.subtitle})
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            {th.description}
                          </p>
                        </div>
                      </div>

                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center flex-shrink-0 mt-1">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step Copy Customizer Accordions */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                Funnel Copy & Headers (All 5 Steps)
              </label>

              <div className="space-y-2.5">
                {/* Step 1 Accordion */}
                <div className="border border-slate-200 rounded-2xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setStepCopyOpen(stepCopyOpen === 1 ? null : 1)}
                    className="w-full p-3.5 bg-slate-50 hover:bg-slate-100 flex items-center justify-between font-bold text-xs text-slate-800 text-left transition-colors"
                  >
                    <span>Step 1: The Pitch Question</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        stepCopyOpen === 1 ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {stepCopyOpen === 1 && (
                    <div className="p-4 space-y-3 bg-white border-t border-slate-200">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                          Question Title
                        </label>
                        <input
                          type="text"
                          value={config.step1.title}
                          onChange={(e) =>
                            updateConfig((prev) => ({
                              ...prev,
                              step1: { ...prev.step1, title: e.target.value },
                            }))
                          }
                          className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:border-rose-400"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                          Subtitle / Micro-copy
                        </label>
                        <input
                          type="text"
                          value={config.step1.subtitle}
                          onChange={(e) =>
                            updateConfig((prev) => ({
                              ...prev,
                              step1: { ...prev.step1, subtitle: e.target.value },
                            }))
                          }
                          className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:border-rose-400"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                            Yes Button Label
                          </label>
                          <input
                            type="text"
                            value={config.step1.yesText}
                            onChange={(e) =>
                              updateConfig((prev) => ({
                                ...prev,
                                step1: { ...prev.step1, yesText: e.target.value },
                              }))
                            }
                            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:border-rose-400"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                            No Button Label
                          </label>
                          <input
                            type="text"
                            value={config.step1.noText}
                            onChange={(e) =>
                              updateConfig((prev) => ({
                                ...prev,
                                step1: { ...prev.step1, noText: e.target.value },
                              }))
                            }
                            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:border-rose-400"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Step 2 Accordion */}
                <div className="border border-slate-200 rounded-2xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setStepCopyOpen(stepCopyOpen === 2 ? null : 2)}
                    className="w-full p-3.5 bg-slate-50 hover:bg-slate-100 flex items-center justify-between font-bold text-xs text-slate-800 text-left transition-colors"
                  >
                    <span>Step 2: Celebration & Affirmation</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        stepCopyOpen === 2 ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {stepCopyOpen === 2 && (
                    <div className="p-4 space-y-3 bg-white border-t border-slate-200">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                          Celebration Headline
                        </label>
                        <input
                          type="text"
                          value={config.step2.title}
                          onChange={(e) =>
                            updateConfig((prev) => ({
                              ...prev,
                              step2: { ...prev.step2, title: e.target.value },
                            }))
                          }
                          className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:border-rose-400"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                          Celebration Subtitle
                        </label>
                        <input
                          type="text"
                          value={config.step2.subtitle}
                          onChange={(e) =>
                            updateConfig((prev) => ({
                              ...prev,
                              step2: { ...prev.step2, subtitle: e.target.value },
                            }))
                          }
                          className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:border-rose-400"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                          Button Text
                        </label>
                        <input
                          type="text"
                          value={config.step2.buttonText}
                          onChange={(e) =>
                            updateConfig((prev) => ({
                              ...prev,
                              step2: { ...prev.step2, buttonText: e.target.value },
                            }))
                          }
                          className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:border-rose-400"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Step 3 Accordion */}
                <div className="border border-slate-200 rounded-2xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setStepCopyOpen(stepCopyOpen === 3 ? null : 3)}
                    className="w-full p-3.5 bg-slate-50 hover:bg-slate-100 flex items-center justify-between font-bold text-xs text-slate-800 text-left transition-colors"
                  >
                    <span>Step 3: Date & Time Header</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        stepCopyOpen === 3 ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {stepCopyOpen === 3 && (
                    <div className="p-4 space-y-3 bg-white border-t border-slate-200">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                          Header Title
                        </label>
                        <input
                          type="text"
                          value={config.step3.title}
                          onChange={(e) =>
                            updateConfig((prev) => ({
                              ...prev,
                              step3: { ...prev.step3, title: e.target.value },
                            }))
                          }
                          className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:border-rose-400"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                          Subtitle
                        </label>
                        <input
                          type="text"
                          value={config.step3.subtitle}
                          onChange={(e) =>
                            updateConfig((prev) => ({
                              ...prev,
                              step3: { ...prev.step3, subtitle: e.target.value },
                            }))
                          }
                          className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:border-rose-400"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Step 4 Accordion */}
                <div className="border border-slate-200 rounded-2xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setStepCopyOpen(stepCopyOpen === 4 ? null : 4)}
                    className="w-full p-3.5 bg-slate-50 hover:bg-slate-100 flex items-center justify-between font-bold text-xs text-slate-800 text-left transition-colors"
                  >
                    <span>Step 4: Activity Header</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        stepCopyOpen === 4 ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {stepCopyOpen === 4 && (
                    <div className="p-4 space-y-3 bg-white border-t border-slate-200">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                          Header Title
                        </label>
                        <input
                          type="text"
                          value={config.step4.title}
                          onChange={(e) =>
                            updateConfig((prev) => ({
                              ...prev,
                              step4: { ...prev.step4, title: e.target.value },
                            }))
                          }
                          className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:border-rose-400"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                          Subtitle
                        </label>
                        <input
                          type="text"
                          value={config.step4.subtitle}
                          onChange={(e) =>
                            updateConfig((prev) => ({
                              ...prev,
                              step4: { ...prev.step4, subtitle: e.target.value },
                            }))
                          }
                          className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:border-rose-400"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Step 5 Accordion */}
                <div className="border border-slate-200 rounded-2xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setStepCopyOpen(stepCopyOpen === 5 ? null : 5)}
                    className="w-full p-3.5 bg-slate-50 hover:bg-slate-100 flex items-center justify-between font-bold text-xs text-slate-800 text-left transition-colors"
                  >
                    <span>Step 5: Pass Card & Summary</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        stepCopyOpen === 5 ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {stepCopyOpen === 5 && (
                    <div className="p-4 space-y-3 bg-white border-t border-slate-200">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                          Pass Title
                        </label>
                        <input
                          type="text"
                          value={config.step5.title}
                          onChange={(e) =>
                            updateConfig((prev) => ({
                              ...prev,
                              step5: { ...prev.step5, title: e.target.value },
                            }))
                          }
                          className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:border-rose-400"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                          Badge Label
                        </label>
                        <input
                          type="text"
                          value={config.step5.badgeText}
                          onChange={(e) =>
                            updateConfig((prev) => ({
                              ...prev,
                              step5: { ...prev.step5, badgeText: e.target.value },
                            }))
                          }
                          className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:border-rose-400"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================== TAB 3: EVASION ENGINE ===================== */}
        {activeTab === "evasion" && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-6 h-6 rounded-full bg-cyan-100 text-cyan-800 text-xs font-black flex items-center justify-center">
                  3
                </span>
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                  "No" Button Evasion Model
                </h3>
              </div>
              <p className="text-xs text-slate-500 mb-3">
                Configure how the unclickable rejection button behaves when approached.
              </p>

              <select
                value={config.step1.evasionBehavior}
                onChange={(e) =>
                  updateConfig((prev) => ({
                    ...prev,
                    step1: {
                      ...prev.step1,
                      evasionBehavior: e.target.value as EvasionBehavior,
                    },
                  }))
                }
                className="w-full px-3.5 py-2.5 text-xs font-semibold border border-slate-200 rounded-xl bg-white outline-none focus:border-rose-500 shadow-xs cursor-pointer"
              >
                <option value="teleport">Option 1: Teleport (Touch & Cursor Jump)</option>
                <option value="halo">Option 2: Hitbox Proximity Halo (Repulsive Vector)</option>
                <option value="shrink">Option 3: Decoy Shrink & Morph (No Shrinks / Yes Expands)</option>
                <option value="bamboozle">Option 4: Instant Bamboozle (Position & Text Swap)</option>
              </select>

              <div className="mt-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-600 flex items-start gap-2">
                <Info className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                <span>
                  {config.step1.evasionBehavior === "teleport" &&
                    "Button teleports to random bounded coordinates upon hover or touchstart."}
                  {config.step1.evasionBehavior === "halo" &&
                    "Radial repulsion physics pushes the button away whenever cursor enters the halo radius."}
                  {config.step1.evasionBehavior === "shrink" &&
                    "No button decreases scale by 25% on hover/touch until it disappears; Yes button balloons up."}
                  {config.step1.evasionBehavior === "bamboozle" &&
                    "Buttons swap places instantaneously on touch or hover, trapping the user into clicking Yes."}
                </span>
              </div>
            </div>

            {/* Sensitivity Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Proximity Sensitivity
                </label>
                <span className="text-xs font-mono font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">
                  {config.step1.sensitivity} px
                </span>
              </div>
              <input
                type="range"
                min={20}
                max={100}
                value={config.step1.sensitivity}
                onChange={(e) =>
                  updateConfig((prev) => ({
                    ...prev,
                    step1: { ...prev.step1, sensitivity: Number(e.target.value) },
                  }))
                }
                className="w-full accent-rose-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>20px (Stealthy)</span>
                <span>100px (Extra Sensitive)</span>
              </div>
            </div>

            {/* Yes Growth Factor Toggle */}
            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-xs text-slate-800">
                  "Yes" Button Growth Factor
                </h4>
                <p className="text-[11px] text-slate-500">
                  Enlarge the Yes button on every failed evasion attempt (+10% miss)
                </p>
              </div>
              <input
                type="checkbox"
                checked={config.step1.yesGrowthFactor}
                onChange={(e) =>
                  updateConfig((prev) => ({
                    ...prev,
                    step1: { ...prev.step1, yesGrowthFactor: e.target.checked },
                  }))
                }
                className="w-5 h-5 accent-rose-500 rounded cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* ===================== TAB 4: RIGGING ENGINE ===================== */}
        {activeTab === "rigging" && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-800 text-xs font-black flex items-center justify-center">
                  4
                </span>
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                  Step 4 Decision Rigging
                </h3>
              </div>
              <p className="text-xs text-slate-500 mb-3">
                Force the outcome by making other choices shake and throw hilarious excuses.
              </p>

              <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-2xl mb-4">
                <button
                  type="button"
                  onClick={() =>
                    updateConfig((prev) => ({
                      ...prev,
                      step4: { ...prev.step4, mode: "free" },
                    }))
                  }
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    config.step4.mode === "free"
                      ? "bg-white text-slate-900 shadow-xs"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Free Choice
                </button>
                <button
                  type="button"
                  onClick={() =>
                    updateConfig((prev) => ({
                      ...prev,
                      step4: { ...prev.step4, mode: "rigged" },
                    }))
                  }
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    config.step4.mode === "rigged"
                      ? "bg-rose-500 text-white shadow-xs"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Only One Path (Rigged)</span>
                </button>
              </div>
            </div>

            {/* Target Card Selection */}
            {config.step4.mode === "rigged" && (
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Designated "Target / Correct" Choice
                </label>
                <div className="space-y-2">
                  {config.step4.options.map((opt) => (
                    <label
                      key={opt.id}
                      className={`p-3 rounded-2xl border flex items-center gap-3 cursor-pointer transition-all ${
                        config.step4.targetId === opt.id
                          ? "border-rose-500 bg-rose-50/40 ring-1 ring-rose-200"
                          : "border-slate-200 hover:border-slate-300 bg-white"
                      }`}
                    >
                      <input
                        type="radio"
                        name="targetChoice"
                        value={opt.id}
                        checked={config.step4.targetId === opt.id}
                        onChange={() =>
                          updateConfig((prev) => ({
                            ...prev,
                            step4: { ...prev.step4, targetId: opt.id },
                          }))
                        }
                        className="accent-rose-500 w-4 h-4 cursor-pointer"
                      />
                      <span className="text-xl">{opt.emoji}</span>
                      <div className="flex-1">
                        <span className="font-bold text-xs text-slate-800 block">
                          {opt.title}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {opt.description}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Custom Rejection Phrases Manager */}
            {config.step4.mode === "rigged" && (
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Humorous Rejection Phrases
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    placeholder="e.g., Kitchen is closed!"
                    value={newPhrase}
                    onChange={(e) => setNewPhrase(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddPhrase()}
                    className="flex-1 px-3 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:border-rose-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddPhrase}
                    className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>

                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {config.step4.rejectionPhrases.map((phrase, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs text-slate-700"
                    >
                      <span className="truncate pr-2 font-medium">{phrase}</span>
                      <button
                        type="button"
                        onClick={() => handleRemovePhrase(idx)}
                        className="text-slate-400 hover:text-rose-500 transition-colors p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ===================== TAB 5: CARDS MANAGER ===================== */}
        {activeTab === "cards" && (
          <div className="space-y-6">
            {/* Step 3 Time Slots Manager */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Step 3 Time Options
                </label>
                <button
                  type="button"
                  onClick={handleAddTimeCard}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3 h-3" /> Add Time
                </button>
              </div>

              <div className="space-y-2">
                {config.step3.options.map((opt) => (
                  <div
                    key={opt.id}
                    className="p-3 bg-white rounded-2xl border border-slate-200 space-y-2"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={opt.emoji || "⏰"}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateConfig((prev) => ({
                            ...prev,
                            step3: {
                              ...prev.step3,
                              options: prev.step3.options.map((o) =>
                                o.id === opt.id ? { ...o, emoji: val } : o
                              ),
                            },
                          }));
                        }}
                        className="w-10 text-center py-1 text-sm border border-slate-200 rounded-lg outline-none"
                      />
                      <input
                        type="text"
                        value={opt.title}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateConfig((prev) => ({
                            ...prev,
                            step3: {
                              ...prev.step3,
                              options: prev.step3.options.map((o) =>
                                o.id === opt.id ? { ...o, title: val } : o
                              ),
                            },
                          }));
                        }}
                        className="flex-1 py-1 px-2.5 text-xs font-bold border border-slate-200 rounded-lg outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveTimeCard(opt.id)}
                        disabled={config.step3.options.length <= 1}
                        className="text-slate-400 hover:text-rose-500 disabled:opacity-30 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="Short description"
                      value={opt.description || ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateConfig((prev) => ({
                          ...prev,
                          step3: {
                            ...prev.step3,
                            options: prev.step3.options.map((o) =>
                              o.id === opt.id ? { ...o, description: val } : o
                            ),
                          },
                        }));
                      }}
                      className="w-full py-1 px-2.5 text-xs text-slate-500 border border-slate-200 rounded-lg outline-none"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Step 4 Activity Cards Manager */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Step 4 Activities
                </label>
                <button
                  type="button"
                  onClick={handleAddActivityCard}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3 h-3" /> Add Activity
                </button>
              </div>

              <div className="space-y-2">
                {config.step4.options.map((opt) => (
                  <div
                    key={opt.id}
                    className="p-3 bg-white rounded-2xl border border-slate-200 space-y-2"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={opt.emoji || "✨"}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateConfig((prev) => ({
                            ...prev,
                            step4: {
                              ...prev.step4,
                              options: prev.step4.options.map((o) =>
                                o.id === opt.id ? { ...o, emoji: val } : o
                              ),
                            },
                          }));
                        }}
                        className="w-10 text-center py-1 text-sm border border-slate-200 rounded-lg outline-none"
                      />
                      <input
                        type="text"
                        value={opt.title}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateConfig((prev) => ({
                            ...prev,
                            step4: {
                              ...prev.step4,
                              options: prev.step4.options.map((o) =>
                                o.id === opt.id ? { ...o, title: val } : o
                              ),
                            },
                          }));
                        }}
                        className="flex-1 py-1 px-2.5 text-xs font-bold border border-slate-200 rounded-lg outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveActivityCard(opt.id)}
                        disabled={config.step4.options.length <= 1}
                        className="text-slate-400 hover:text-rose-500 disabled:opacity-30 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="Short description"
                      value={opt.description || ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateConfig((prev) => ({
                          ...prev,
                          step4: {
                            ...prev.step4,
                            options: prev.step4.options.map((o) =>
                              o.id === opt.id ? { ...o, description: val } : o
                            ),
                          },
                        }));
                      }}
                      className="w-full py-1 px-2.5 text-xs text-slate-500 border border-slate-200 rounded-lg outline-none"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
