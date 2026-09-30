"use client";

import React, { useState, useEffect } from "react";
import { AppConfig, ChoiceCard, EvasionBehavior, ThemeId } from "@/types";
import { THEMES } from "@/lib/themes";
import { TEMPLATES } from "@/lib/templates";
import {
  ARCHETYPES,
  ArchetypeTopic,
  getSmartSuggestionsForTopic,
  buildConfigFromArchetype,
} from "@/lib/smartSuggestions";
import {
  Sparkles,
  X,
  ArrowRight,
  ArrowLeft,
  Check,
  Zap,
  Target,
  Award,
  Calendar,
  MessageCircle,
  HelpCircle,
  Wand2,
  RefreshCw,
  Plus,
  Trash2,
} from "lucide-react";

interface CustomTemplateWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (config: AppConfig) => void;
}

export const CustomTemplateWizard: React.FC<CustomTemplateWizardProps> = ({
  isOpen,
  onClose,
  onApply,
}) => {
  // Wizard navigation step (1 to 5)
  const [wizardStep, setWizardStep] = useState<number>(1);

  // Topic input & active suggestions archetype
  const [topicInput, setTopicInput] = useState<string>("Choose your favourite parent?");
  const [templateTitle, setTemplateTitle] = useState<string>("Choose your favourite parent?");
  const [selectedTheme, setSelectedTheme] = useState<ThemeId>("electric-fun");
  const [activeArchetype, setActiveArchetype] = useState<ArchetypeTopic>(
    ARCHETYPES["favourite-parent"]
  );


  // Editable fields across the 5 funnel steps
  // Step 1: Hook
  const [headline, setHeadline] = useState<string>("");
  const [subheading, setSubheading] = useState<string>("");
  const [yesText, setYesText] = useState<string>("");
  const [noText, setNoText] = useState<string>("");
  const [evasion, setEvasion] = useState<EvasionBehavior>("halo");
  const [emoji, setEmoji] = useState<string>("👨‍👩‍👧");

  // Step 2: Celebration
  const [step2Title, setStep2Title] = useState<string>("");
  const [step2Subtitle, setStep2Subtitle] = useState<string>("");
  const [step2Button, setStep2Button] = useState<string>("");

  // Step 3: Time / Scheduling
  const [step3Title, setStep3Title] = useState<string>("");
  const [step3Subtitle, setStep3Subtitle] = useState<string>("");
  const [step3Options, setStep3Options] = useState<ChoiceCard[]>([]);

  // Step 4: Rigged Choice
  const [step4Title, setStep4Title] = useState<string>("");
  const [step4Subtitle, setStep4Subtitle] = useState<string>("");
  const [targetCard, setTargetCard] = useState<ChoiceCard>({
    id: "target-win",
    title: "",
    description: "",
    emoji: "💖",
  });
  const [rejectionCards, setRejectionCards] = useState<ChoiceCard[]>([]);
  const [rejectionPhrases, setRejectionPhrases] = useState<string[]>([]);
  const [newRejectionInput, setNewRejectionInput] = useState<string>("");

  // Step 5: Official Certificate
  const [step5Title, setStep5Title] = useState<string>("");
  const [step5Subtitle, setStep5Subtitle] = useState<string>("");
  const [badgeText, setBadgeText] = useState<string>("");
  const [confirmBtnText, setConfirmBtnText] = useState<string>("");

  // Populate state whenever topic or archetype changes
  const applyArchetypeSuggestions = (arch: ArchetypeTopic) => {
    setActiveArchetype(arch);
    setEmoji(arch.emoji);
    setSelectedTheme(arch.defaultTheme);
    setHeadline(arch.headlines[0] || "");
    setSubheading(arch.subtitles[0] || "");
    setYesText(arch.yesTexts[0] || "");
    setNoText(arch.noTexts[0] || "");
    setEvasion(arch.defaultEvasion);

    setStep2Title(arch.step2Titles[0] || "");
    setStep2Subtitle(arch.step2Subtitles[0] || "");
    setStep2Button(arch.step2Buttons[0] || "");

    setStep3Title(arch.step3Titles[0] || "");
    setStep3Subtitle(arch.step3Subtitles[0] || "");
    setStep3Options([...arch.step3Options]);

    setStep4Title(arch.step4Titles[0] || "");
    setStep4Subtitle(arch.step4Subtitles[0] || "");
    setTargetCard({ ...arch.step4Target });
    setRejectionCards([...arch.step4Rejections]);
    setRejectionPhrases([...arch.rejectionPhrases]);

    setStep5Title(arch.step5Titles[0] || "");
    setStep5Subtitle(arch.step5Subtitles[0] || "");
    setBadgeText(arch.badgeTexts[0] || "");
    setConfirmBtnText(arch.confirmButtonTexts[0] || "");
  };

  // Initialize on mount
  useEffect(() => {
    applyArchetypeSuggestions(ARCHETYPES["favourite-parent"]);
  }, []);

  // Update suggestions on topic input change
  const handleTopicChange = (newTopic: string) => {
    setTopicInput(newTopic);
    setTemplateTitle(newTopic);
    const suggested = getSmartSuggestionsForTopic(newTopic);
    applyArchetypeSuggestions(suggested);
  };

  // Handle archetype preset selection
  const handleSelectPreset = (key: string) => {
    const arch = ARCHETYPES[key];
    if (arch) {
      setTopicInput(arch.name);
      setTemplateTitle(arch.name);
      applyArchetypeSuggestions(arch);
    }
  };

  // Add custom rejection phrase
  const handleAddPhrase = () => {
    if (!newRejectionInput.trim()) return;
    setRejectionPhrases((prev) => [...prev, newRejectionInput.trim()]);
    setNewRejectionInput("");
  };

  // Build and apply complete AppConfig
  const handleFinish = () => {
    const baseId =
      activeArchetype && activeArchetype.id in TEMPLATES
        ? activeArchetype.id
        : topicInput.toLowerCase().includes("parent")
        ? "favourite-parent"
        : undefined;

    const uniqueId = `user_tmpl_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

    const customConfig: AppConfig = {
      id: uniqueId,
      baseTemplateId: baseId,
      title: templateTitle.trim() || topicInput.trim() || "Custom Forced Choice",
      theme: selectedTheme,
      step1: {

        title: headline.trim() || "What is your choice?",
        subtitle: subheading.trim() || "Think carefully...",
        emoji: emoji || "✨",
        yesText: yesText.trim() || "Yes, absolutely! 💖",
        noText: noText.trim() || "No thanks",
        evasionBehavior: evasion,
        sensitivity: 55,
        yesGrowthFactor: true,
      },
      step2: {
        title: step2Title.trim() || "I knew you'd say yes!",
        subtitle: step2Subtitle.trim() || "Refusal was never an option anyway.",
        emoji: "🎉",
        buttonText: step2Button.trim() || "Proceed to Next Step ✨",
      },
      step3: {
        title: step3Title.trim() || "When is this happening?",
        subtitle: step3Subtitle.trim() || "Select the best time slot:",
        options: step3Options.length > 0 ? step3Options : activeArchetype.step3Options,
      },
      step4: {
        title: step4Title.trim() || "What is your selection?",
        subtitle: step4Subtitle.trim() || "Choose your preference:",
        mode: "rigged",
        targetId: targetCard.id || "target-win",
        rejectionPhrases:
          rejectionPhrases.length > 0 ? rejectionPhrases : activeArchetype.rejectionPhrases,
        options: [targetCard, ...rejectionCards],
      },
      step5: {
        title: step5Title.trim() || "Official Agreement Certificate",
        subtitle: step5Subtitle.trim() || "Certified and ratified.",
        badgeText: badgeText.trim() || "CONFIRMED & SEALED",
        confirmButtonText: confirmBtnText.trim() || "Send Confirmation",
      },
    };

    onApply(customConfig);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 flex flex-col max-h-[92vh] overflow-hidden">
        {/* Wizard Header with Progress Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-500 text-white flex items-center justify-center shadow-sm">
              <Wand2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                  Guided Custom Template Creator
                </h2>
                <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Smart Assisted
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Step {wizardStep} of 5:{" "}
                {wizardStep === 1 && "Choose Your Scenario Topic & Style"}
                {wizardStep === 2 && "The Hook Question & Evasion Mode"}
                {wizardStep === 3 && "Celebration & Scheduling Options"}
                {wizardStep === 4 && "The Rigged Trap & Hilarious Rejections"}
                {wizardStep === 5 && "Official Award Certificate"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Progress Bar */}
        <div className="w-full bg-slate-200 h-1 flex">
          <div
            className="bg-gradient-to-r from-amber-500 to-rose-500 h-1 transition-all duration-300"
            style={{ width: `${(wizardStep / 5) * 100}%` }}
          />
        </div>

        {/* Stepper Tabs */}
        <div className="flex border-b border-slate-200 bg-white px-3 py-2 gap-1 overflow-x-auto select-none">
          {[
            { num: 1, label: "1. Topic" },
            { num: 2, label: "2. The Hook" },
            { num: 3, label: "3. Schedule" },
            { num: 4, label: "4. Rigged Trap" },
            { num: 5, label: "5. Certificate" },
          ].map((s) => (
            <button
              key={s.num}
              type="button"
              onClick={() => setWizardStep(s.num)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                wizardStep === s.num
                  ? "bg-slate-900 text-white shadow-xs"
                  : wizardStep > s.num
                  ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Step Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* ================= STEP 1: TOPIC & VISUAL THEME ================= */}
          {wizardStep === 1 && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                  What is your customized template about?
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={topicInput}
                    onChange={(e) => handleTopicChange(e.target.value)}
                    placeholder="e.g. Choose your favourite parent?, Who is the best roommate?, etc."
                    className="w-full px-4 py-3 text-sm font-semibold border-2 border-slate-200 rounded-2xl outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-all text-slate-800 bg-white"
                  />
                  <div className="absolute right-3 top-3 text-xl">{emoji}</div>
                </div>
                <p className="text-[11px] text-slate-500 mt-1.5">
                  Type any topic or pick a popular archetype below. We intelligently suggest headlines, options, and rigged logic for every step!
                </p>
              </div>

              {/* Quick Inspiration Archetypes */}
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Popular Suggested Archetypes (1-Click Fill)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {Object.entries(ARCHETYPES).map(([key, arch]) => {
                    const isSelected = activeArchetype.id === arch.id;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => handleSelectPreset(key)}
                        className={`p-2.5 rounded-xl border text-left transition-all flex items-center gap-2 cursor-pointer ${
                          isSelected
                            ? "border-rose-500 bg-rose-50/60 ring-2 ring-rose-200 font-bold"
                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50 bg-white"
                        }`}
                      >
                        <span className="text-xl flex-shrink-0">{arch.emoji}</span>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-800 truncate">
                            {arch.name}
                          </p>
                          <p className="text-[10px] text-slate-400 truncate">
                            {arch.tagline}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Visual Theme Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  Choose Visual Theme
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {Object.values(THEMES).map((th) => {
                    const isSelected = selectedTheme === th.id;
                    return (
                      <button
                        key={th.id}
                        type="button"
                        onClick={() => setSelectedTheme(th.id)}
                        className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                          isSelected
                            ? "border-rose-500 bg-rose-50/50 ring-2 ring-rose-200 shadow-sm"
                            : "border-slate-200 hover:border-slate-300 bg-white"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-extrabold text-slate-900">
                            {th.name}
                          </span>
                          {isSelected && (
                            <div className="w-4 h-4 rounded-full bg-rose-500 text-white flex items-center justify-center">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </div>
                          )}
                        </div>
                        <p className="text-[10px] text-slate-500">{th.subtitle}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ================= STEP 2: THE HOOK & EVASION ================= */}
          {wizardStep === 2 && (
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Question Headline
                  </label>
                  <span className="text-[10px] text-amber-600 font-semibold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Click a suggested choice below
                  </span>
                </div>
                <input
                  type="text"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-semibold border border-slate-200 rounded-xl outline-none focus:border-rose-400 bg-white text-slate-800"
                />
                {/* Suggested headline choices */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {activeArchetype.headlines.map((sug, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setHeadline(sug)}
                      className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all text-left cursor-pointer ${
                        headline === sug
                          ? "bg-rose-500 text-white border-rose-500"
                          : "bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-100"
                      }`}
                    >
                      💡 {sug}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                  Sub-heading / Comedic Microcopy
                </label>
                <input
                  type="text"
                  value={subheading}
                  onChange={(e) => setSubheading(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:border-rose-400 bg-white text-slate-800"
                />
                {/* Suggested subtitle choices */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {activeArchetype.subtitles.map((sug, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSubheading(sug)}
                      className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all text-left cursor-pointer ${
                        subheading === sug
                          ? "bg-rose-500 text-white border-rose-500"
                          : "bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-100"
                      }`}
                    >
                      💡 {sug}
                    </button>
                  ))}
                </div>
              </div>

              {/* Yes & No Button Text */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
                    Affirmative Button (The Winner)
                  </label>
                  <input
                    type="text"
                    value={yesText}
                    onChange={(e) => setYesText(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-emerald-300 rounded-xl outline-none focus:border-emerald-500 bg-emerald-50/30 text-slate-800 font-semibold"
                  />
                  <div className="flex flex-col gap-1 mt-1.5">
                    {activeArchetype.yesTexts.map((sug, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setYesText(sug)}
                        className={`text-[10px] px-2 py-1 rounded-lg border text-left cursor-pointer ${
                          yesText === sug
                            ? "bg-emerald-600 text-white border-emerald-600"
                            : "bg-white text-slate-600 border-slate-200 hover:bg-emerald-50"
                        }`}
                      >
                        ✓ {sug}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-rose-700 uppercase tracking-wider mb-1">
                    Evasive Button (Rejection text)
                  </label>
                  <input
                    type="text"
                    value={noText}
                    onChange={(e) => setNoText(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-rose-300 rounded-xl outline-none focus:border-rose-500 bg-rose-50/30 text-slate-800 font-semibold"
                  />
                  <div className="flex flex-col gap-1 mt-1.5">
                    {activeArchetype.noTexts.map((sug, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setNoText(sug)}
                        className={`text-[10px] px-2 py-1 rounded-lg border text-left cursor-pointer ${
                          noText === sug
                            ? "bg-rose-600 text-white border-rose-600"
                            : "bg-white text-slate-600 border-slate-200 hover:bg-rose-50"
                        }`}
                      >
                        ✗ {sug}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Evasion Mode */}
              <div className="pt-2">
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                  Evasion Mechanism (How it prevents "No")
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: "halo", label: "Halo Repel", desc: "Magnetic forcefield pushes cursor" },
                    { id: "teleport", label: "Teleport", desc: "Instantly pops elsewhere" },
                    { id: "bamboozle", label: "Bamboozle", desc: "Yes button slides underneath" },
                    { id: "shrink", label: "Shrink & Fade", desc: "Shrinks into nothingness" },
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setEvasion(m.id as EvasionBehavior)}
                      className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                        evasion === m.id
                          ? "border-rose-500 bg-rose-50 font-bold"
                          : "border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <div className="text-xs text-slate-900 font-bold">{m.label}</div>
                      <div className="text-[10px] text-slate-500 leading-tight mt-0.5">{m.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================= STEP 3: CELEBRATION & SCHEDULING ================= */}
          {wizardStep === 3 && (
            <div className="space-y-5">
              {/* Step 2 Celebration Copy */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🎉 Step 2: Celebration Screen Copy</span>
                </h4>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Celebration Headline
                  </label>
                  <input
                    type="text"
                    value={step2Title}
                    onChange={(e) => setStep2Title(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:border-rose-400 bg-white"
                  />
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {activeArchetype.step2Titles.map((sug, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setStep2Title(sug)}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                      >
                        💡 {sug}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Celebration Subtitle
                  </label>
                  <input
                    type="text"
                    value={step2Subtitle}
                    onChange={(e) => setStep2Subtitle(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:border-rose-400 bg-white"
                  />
                </div>
              </div>

              {/* Step 3 Time Scheduling Options */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-blue-500" />
                    <span>Step 3: Scheduling / Time Selection Options</span>
                  </h4>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Question Headline
                  </label>
                  <input
                    type="text"
                    value={step3Title}
                    onChange={(e) => setStep3Title(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:border-rose-400 bg-white"
                  />
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {activeArchetype.step3Titles.map((sug, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setStep3Title(sug)}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100"
                      >
                        💡 {sug}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Option cards */}
                <div className="space-y-2">
                  <label className="block text-[11px] font-semibold text-slate-600">
                    Time Slot Cards (Auto-suggested based on your topic)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {step3Options.map((opt, i) => (
                      <div
                        key={opt.id}
                        className="p-3 bg-white border border-slate-200 rounded-xl flex items-start gap-2.5"
                      >
                        <span className="text-2xl">{opt.emoji || "⏰"}</span>
                        <div className="flex-1 min-w-0">
                          <input
                            type="text"
                            value={opt.title}
                            onChange={(e) => {
                              const newOpts = [...step3Options];
                              newOpts[i].title = e.target.value;
                              setStep3Options(newOpts);
                            }}
                            className="w-full font-bold text-xs text-slate-900 border-b border-slate-100 outline-none pb-0.5"
                          />
                          <input
                            type="text"
                            value={opt.description || ""}
                            onChange={(e) => {
                              const newOpts = [...step3Options];
                              newOpts[i].description = e.target.value;
                              setStep3Options(newOpts);
                            }}
                            className="w-full text-[11px] text-slate-500 outline-none pt-0.5"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= STEP 4: THE RIGGED TRAP ================= */}
          {wizardStep === 4 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                  Rigged Question Title
                </label>
                <input
                  type="text"
                  value={step4Title}
                  onChange={(e) => setStep4Title(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:border-rose-400 bg-white"
                />
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {activeArchetype.step4Titles.map((sug, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setStep4Title(sug)}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100"
                    >
                      💡 {sug}
                    </button>
                  ))}
                </div>
              </div>

              {/* The Winning Target Choice */}
              <div className="p-3.5 bg-emerald-50/60 border border-emerald-300 rounded-2xl">
                <div className="flex items-center gap-1.5 text-xs font-black text-emerald-800 mb-2">
                  <Target className="w-4 h-4 text-emerald-600" />
                  <span>The ONLY Winning Choice (Target Option)</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={targetCard.emoji || "💖"}
                    onChange={(e) =>
                      setTargetCard((prev) => ({ ...prev, emoji: e.target.value }))
                    }
                    className="w-12 text-center text-lg p-1.5 border border-emerald-300 rounded-xl bg-white"
                  />
                  <div className="flex-1 space-y-1">
                    <input
                      type="text"
                      value={targetCard.title}
                      onChange={(e) =>
                        setTargetCard((prev) => ({ ...prev, title: e.target.value }))
                      }
                      placeholder="Title of winning choice"
                      className="w-full px-2.5 py-1 text-xs font-bold border border-emerald-200 rounded-lg outline-none bg-white"
                    />
                    <input
                      type="text"
                      value={targetCard.description || ""}
                      onChange={(e) =>
                        setTargetCard((prev) => ({ ...prev, description: e.target.value }))
                      }
                      placeholder="Description"
                      className="w-full px-2.5 py-1 text-[11px] border border-emerald-200 rounded-lg outline-none bg-white text-slate-600"
                    />
                  </div>
                </div>
              </div>

              {/* Joke Rejected Choices */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Hilarious Rejected Options (Trigger Rejection Tooltips)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {rejectionCards.map((card, idx) => (
                    <div
                      key={card.id}
                      className="p-2.5 bg-rose-50/40 border border-rose-200 rounded-xl flex items-start gap-2"
                    >
                      <span className="text-xl">{card.emoji || "❌"}</span>
                      <div className="flex-1 min-w-0">
                        <input
                          type="text"
                          value={card.title}
                          onChange={(e) => {
                            const newCards = [...rejectionCards];
                            newCards[idx].title = e.target.value;
                            setRejectionCards(newCards);
                          }}
                          className="w-full text-xs font-bold text-slate-800 border-b border-rose-100 outline-none pb-0.5"
                        />
                        <input
                          type="text"
                          value={card.description || ""}
                          onChange={(e) => {
                            const newCards = [...rejectionCards];
                            newCards[idx].description = e.target.value;
                            setRejectionCards(newCards);
                          }}
                          className="w-full text-[10px] text-slate-500 outline-none pt-0.5"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rejection Tooltip Phrases */}
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                  Rejection Tooltip Explanations
                </label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {rejectionPhrases.map((phrase, i) => (
                    <span
                      key={i}
                      className="text-[11px] px-2.5 py-1 bg-amber-50 text-amber-900 border border-amber-200 rounded-lg flex items-center gap-1.5"
                    >
                      <span>{phrase}</span>
                      <button
                        type="button"
                        onClick={() =>
                          setRejectionPhrases((prev) => prev.filter((_, idx) => idx !== i))
                        }
                        className="text-amber-500 hover:text-amber-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newRejectionInput}
                    onChange={(e) => setNewRejectionInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddPhrase()}
                    placeholder="Add custom rejection phrase..."
                    className="flex-1 px-3 py-1.5 text-xs border border-slate-200 rounded-xl outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddPhrase}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ================= STEP 5: OFFICIAL CERTIFICATE ================= */}
          {wizardStep === 5 && (
            <div className="space-y-4">
              <div className="p-3.5 bg-gradient-to-r from-amber-50 to-rose-50 border border-rose-200 rounded-2xl">
                <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-1">
                  Template Name / Title (Saved in Profile)
                </label>
                <input
                  type="text"
                  value={templateTitle}
                  onChange={(e) => setTemplateTitle(e.target.value)}
                  placeholder="e.g. Choose your favourite parent?"
                  className="w-full px-3.5 py-2.5 text-sm font-bold border-2 border-rose-200 rounded-xl outline-none focus:border-rose-500 bg-white text-slate-900"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  This custom title will appear under your saved templates and in shareable links.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                  Official Certificate / Pass Title
                </label>

                <input
                  type="text"
                  value={step5Title}
                  onChange={(e) => setStep5Title(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:border-rose-400 bg-white font-semibold"
                />
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {activeArchetype.step5Titles.map((sug, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setStep5Title(sug)}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100"
                    >
                      💡 {sug}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                  Sub-heading / Binding Legal Proof Copy
                </label>
                <input
                  type="text"
                  value={step5Subtitle}
                  onChange={(e) => setStep5Subtitle(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:border-rose-400 bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                    Badge Stamp Text
                  </label>
                  <input
                    type="text"
                    value={badgeText}
                    onChange={(e) => setBadgeText(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-bold border border-slate-200 rounded-xl outline-none uppercase tracking-wider"
                  />
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {activeArchetype.badgeTexts.map((sug, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setBadgeText(sug)}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100"
                      >
                        ✓ {sug}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                    Share Button Copy
                  </label>
                  <input
                    type="text"
                    value={confirmBtnText}
                    onChange={(e) => setConfirmBtnText(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-bold border border-slate-200 rounded-xl outline-none"
                  />
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {activeArchetype.confirmButtonTexts.map((sug, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setConfirmBtnText(sug)}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100"
                      >
                        ✓ {sug}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Ready Summary Card */}
              <div className="p-4 bg-gradient-to-br from-amber-50 to-rose-50 border border-rose-200 rounded-2xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-500 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900">
                    Your Custom Forced-Choice Template is Ready!
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Click "Apply & Test Template" below to load it into the live simulator and generate shareable links.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Wizard Footer Controls */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/90 flex items-center justify-between">
          <div>
            {wizardStep > 1 ? (
              <button
                type="button"
                onClick={() => setWizardStep((prev) => Math.max(1, prev - 1))}
                className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-2 text-slate-400 hover:text-slate-600 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {wizardStep < 5 ? (
              <button
                type="button"
                onClick={() => setWizardStep((prev) => Math.min(5, prev + 1))}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
              >
                <span>Next Step</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinish}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-pink-500 hover:from-amber-600 hover:to-pink-600 text-white text-xs font-extrabold flex items-center gap-2 shadow-md transition-all cursor-pointer transform hover:scale-[1.02]"
              >
                <Sparkles className="w-4 h-4" />
                <span>Apply & Test Template 🚀</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
