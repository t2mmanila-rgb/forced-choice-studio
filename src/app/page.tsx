"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AppConfig, UserProfile, SavedTemplateRecord } from "@/types";
import { DEFAULT_CONFIG, TEMPLATES } from "@/lib/templates";
import { parseConfigFromUrl } from "@/lib/urlState";
import {
  getCurrentUser,
  logoutUser,
  getSavedTemplates,
  saveUserTemplate,
  deleteUserTemplate,
} from "@/lib/authStorage";
import { Header } from "@/components/Header";
import { BuilderSidebar } from "@/components/BuilderSidebar";
import { DeviceFrame } from "@/components/DeviceFrame";
import { FunnelContainer } from "@/components/FunnelContainer";
import { ShareModal } from "@/components/ShareModal";
import { CustomTemplateWizard } from "@/components/CustomTemplateWizard";
import { LoginModal } from "@/components/LoginModal";
import { SaveTemplateModal } from "@/components/SaveTemplateModal";
import { UnsavedChangesModal } from "@/components/UnsavedChangesModal";
import { THEMES } from "@/lib/themes";
import { Edit3 } from "lucide-react";

type PendingNavigationAction =
  | { type: "select_template"; templateKey: string }
  | { type: "select_saved"; record: SavedTemplateRecord }
  | { type: "reset_defaults" }
  | { type: "open_wizard" };

function StudioApp() {
  const searchParams = useSearchParams();
  const [config, setConfig] = useState<AppConfig>(DEFAULT_CONFIG);
  const [baselineConfig, setBaselineConfig] = useState<AppConfig>(DEFAULT_CONFIG);
  const [mode, setMode] = useState<"builder" | "play">("builder");
  const [device, setDevice] = useState<"desktop" | "mobile">("mobile");
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isUnsavedModalOpen, setIsUnsavedModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<PendingNavigationAction | null>(null);
  const [postLoginAction, setPostLoginAction] = useState<"save_and_continue" | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // User Authentication & Browser Storage
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [loginReason, setLoginReason] = useState("");
  const [savedTemplates, setSavedTemplates] = useState<SavedTemplateRecord[]>([]);
  const [isSaved, setIsSaved] = useState(false);



  // Load user session and saved templates on mount
  useEffect(() => {
    const current = getCurrentUser();
    setUser(current);
    setSavedTemplates(getSavedTemplates(current?.id));

    const handleAuthChange = () => {
      const u = getCurrentUser();
      setUser(u);
      setSavedTemplates(getSavedTemplates(u?.id));
    };

    const handleTemplatesChange = () => {
      const u = getCurrentUser();
      setSavedTemplates(getSavedTemplates(u?.id));
    };

    window.addEventListener("yesplan_auth_changed", handleAuthChange);
    window.addEventListener("yesplan_templates_changed", handleTemplatesChange);

    return () => {
      window.removeEventListener("yesplan_auth_changed", handleAuthChange);
      window.removeEventListener("yesplan_templates_changed", handleTemplatesChange);
    };
  }, []);

  // Initialize from URL parameters or hash on mount
  useEffect(() => {
    try {
      const modeParam = searchParams.get("mode");
      const loadedConfig = parseConfigFromUrl(
        searchParams,
        typeof window !== "undefined" ? window.location.hash : ""
      );

      if (loadedConfig) {
        setConfig(loadedConfig);
        setBaselineConfig(loadedConfig);
      } else {
        setBaselineConfig(DEFAULT_CONFIG);
      }

      if (
        modeParam === "play" ||
        (loadedConfig && modeParam !== "edit" && (searchParams.get("t") || searchParams.get("c")))
      ) {
        setMode("play");
      }
    } catch (err) {
      console.error("Initialization error:", err);
    } finally {
      setIsInitialized(true);
    }
  }, [searchParams]);

  // Check if current configuration has unsaved changes vs baseline
  const checkIsDirty = (): boolean => {
    return JSON.stringify(config) !== JSON.stringify(baselineConfig);
  };

  // Warn on tab closing if unsaved changes exist
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (checkIsDirty()) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [config, baselineConfig]);

  const executePendingAction = (action: PendingNavigationAction | null) => {
    if (!action) return;
    if (action.type === "select_template") {
      if (TEMPLATES[action.templateKey]) {
        const next = { ...TEMPLATES[action.templateKey] };
        setConfig(next);
        setBaselineConfig(next);
      }
    } else if (action.type === "select_saved") {
      const next = { ...action.record.config };
      setConfig(next);
      setBaselineConfig(next);
    } else if (action.type === "reset_defaults") {
      const currentId = config.id in TEMPLATES ? config.id : "romantic-date";
      const next = { ...TEMPLATES[currentId] };
      setConfig(next);
      setBaselineConfig(next);
    } else if (action.type === "open_wizard") {
      if (!user) {
        handleOpenLogin("Sign in to create your own custom templates");
      } else {
        setIsWizardOpen(true);
      }
    }
  };

  const getTargetTemplateTitle = (action: PendingNavigationAction | null): string => {
    if (!action) return "";
    if (action.type === "select_template") {
      return TEMPLATES[action.templateKey]?.title || "Preset Template";
    }
    if (action.type === "select_saved") {
      return action.record.title || "Saved Template";
    }
    if (action.type === "reset_defaults") {
      return "Template Defaults";
    }
    if (action.type === "open_wizard") {
      return "Guided Custom Wizard";
    }
    return "";
  };

  const handleSelectTemplate = (templateKey: string) => {
    if (templateKey === config.id && !checkIsDirty()) return;
    if (checkIsDirty()) {
      setPendingAction({ type: "select_template", templateKey });
      setIsUnsavedModalOpen(true);
      return;
    }
    if (TEMPLATES[templateKey]) {
      const next = { ...TEMPLATES[templateKey] };
      setConfig(next);
      setBaselineConfig(next);
    }
  };

  const handleSelectSavedTemplate = (record: SavedTemplateRecord) => {
    if (record.id === config.id && !checkIsDirty()) return;
    if (checkIsDirty()) {
      setPendingAction({ type: "select_saved", record });
      setIsUnsavedModalOpen(true);
      return;
    }
    const next = { ...record.config };
    setConfig(next);
    setBaselineConfig(next);
  };

  const handleResetDefaults = () => {
    if (checkIsDirty()) {
      setPendingAction({ type: "reset_defaults" });
      setIsUnsavedModalOpen(true);
      return;
    }
    const currentId = config.id in TEMPLATES ? config.id : "romantic-date";
    const next = { ...TEMPLATES[currentId] };
    setConfig(next);
    setBaselineConfig(next);
  };

  const handleOpenWizard = () => {
    if (checkIsDirty()) {
      setPendingAction({ type: "open_wizard" });
      setIsUnsavedModalOpen(true);
      return;
    }
    if (!user) {
      handleOpenLogin("Sign in to create your own custom templates");
    } else {
      setIsWizardOpen(true);
    }
  };

  if (!isInitialized) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-slate-50">
        <div className="w-8 h-8 rounded-full border-2 border-rose-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  const theme = THEMES[config.theme] || THEMES["pastel-romance"];

  // Recipient / Play Mode: Clean full screen experience with zero builder UI
  if (mode === "play") {
    return (
      <div className={`min-h-screen w-full relative flex flex-col justify-center bg-gradient-to-br ${theme.bgGradient}`}>
        {/* Main interactive funnel */}
        <FunnelContainer config={config} isBuilderPreview={false} />

        {/* Discreet bottom floating button to open Studio */}
        <div className="fixed bottom-3 right-3 z-40">
          <button
            type="button"
            onClick={() => setMode("builder")}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-white/90 hover:bg-white text-slate-700 text-xs font-semibold rounded-full shadow-md border border-slate-200/80 backdrop-blur-md transition-all hover:scale-105 cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5 text-rose-500" />
            <span>Customize in Studio</span>
          </button>
        </div>
      </div>
    );
  }

  const handleOpenLogin = (reason?: string) => {
    setLoginReason(reason || "");
    setIsLoginOpen(true);
  };

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    setSavedTemplates(getSavedTemplates(undefined));
  };

  const handleSaveTemplate = () => {
    if (!user) {
      handleOpenLogin("Sign in to save this template and customizations under your profile");
      return;
    }
    setIsSaveModalOpen(true);
  };

  const handleSaveConfirm = (title: string, description: string, asNew: boolean) => {
    if (!user) return;
    const record = saveUserTemplate(config, user.id, {
      title,
      description,
      saveAsNew: asNew,
    });
    setSavedTemplates(getSavedTemplates(user.id));
    setIsSaveModalOpen(false);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);

    if (pendingAction) {
      const nextAction = pendingAction;
      setPendingAction(null);
      executePendingAction(nextAction);
    } else {
      setConfig({ ...record.config });
      setBaselineConfig({ ...record.config });
    }
  };

  const handleUnsavedSaveAndContinue = () => {
    setIsUnsavedModalOpen(false);
    if (!user) {
      setPostLoginAction("save_and_continue");
      handleOpenLogin("Sign in to give your customized template a name and save it to your profile");
    } else {
      setIsSaveModalOpen(true);
    }
  };

  const handleUnsavedDiscardAndContinue = () => {
    setIsUnsavedModalOpen(false);
    if (pendingAction) {
      const nextAction = pendingAction;
      setPendingAction(null);
      executePendingAction(nextAction);
    }
  };

  const handleUnsavedClose = () => {
    setIsUnsavedModalOpen(false);
    setPendingAction(null);
  };

  const handleDeleteSavedTemplate = (id: string) => {
    deleteUserTemplate(id, user?.id);
    setSavedTemplates(getSavedTemplates(user?.id));
  };


  // Builder / Studio Mode: Live split-screen layout
  return (
    <div className="h-screen w-screen flex flex-col bg-slate-100 overflow-hidden">
      {/* Persistent Top Header */}
      <Header
        mode={mode}
        onModeChange={setMode}
        config={config}
        onSelectTemplate={handleSelectTemplate}
        onOpenShareModal={() => setIsShareOpen(true)}
        onResetDefaults={handleResetDefaults}
        onOpenWizard={handleOpenWizard}
        user={user}
        onOpenLogin={handleOpenLogin}
        onLogout={handleLogout}
        onSaveTemplate={handleSaveTemplate}
        isSaved={isSaved}
        savedTemplates={savedTemplates}
        onSelectSavedTemplate={handleSelectSavedTemplate}
      />

      {/* Main Split-Screen Workspace */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        {/* Left Drawer: Builder Settings Panel */}
        <div className="w-full md:w-[420px] lg:w-[460px] h-1/2 md:h-full flex-shrink-0 z-10 shadow-sm border-r border-slate-200">
          <BuilderSidebar
            config={config}
            onChange={(newConfig) => {
              setConfig(newConfig);
              setIsSaved(false);
            }}
            onSelectTemplate={handleSelectTemplate}
            onOpenWizard={handleOpenWizard}
            user={user}
            onOpenLogin={handleOpenLogin}
            savedTemplates={savedTemplates}
            onSelectSavedTemplate={handleSelectSavedTemplate}
            onDeleteSavedTemplate={handleDeleteSavedTemplate}
            onOpenSaveModal={handleSaveTemplate}
          />
        </div>

        {/* Right Canvas: Interactive Device Frame */}
        <div className="flex-1 h-1/2 md:h-full bg-slate-100 relative overflow-hidden flex flex-col">
          <DeviceFrame device={device} onDeviceChange={setDevice} themeId={config.theme}>
            <FunnelContainer config={config} isBuilderPreview={true} />
          </DeviceFrame>
        </div>
      </div>

      {/* Share & Export Modal */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        config={config}
        onSelectTemplate={handleSelectTemplate}
      />

      {/* Guided Custom Template Creator Wizard */}
      <CustomTemplateWizard
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        onApply={(newConfig) => {
          setConfig(newConfig);
          if (user) {
            const record = saveUserTemplate(newConfig, user.id, {
              title: newConfig.title,
              saveAsNew: true,
            });
            setConfig({ ...record.config });
            setBaselineConfig({ ...record.config });
            setSavedTemplates(getSavedTemplates(user.id));
            setIsSaved(true);
            setTimeout(() => setIsSaved(false), 2500);
          } else {
            setBaselineConfig(DEFAULT_CONFIG);
          }
        }}
      />

      {/* Save Template with Custom Name Modal */}
      <SaveTemplateModal
        isOpen={isSaveModalOpen}
        onClose={() => {
          setIsSaveModalOpen(false);
          setPendingAction(null);
        }}
        config={config}
        user={user}
        onSave={handleSaveConfirm}
      />

      {/* Unsaved Changes Confirmation Modal */}
      <UnsavedChangesModal
        isOpen={isUnsavedModalOpen}
        onClose={handleUnsavedClose}
        currentTemplateTitle={config.title || config.step1.title || "Custom Template"}
        targetTemplateTitle={getTargetTemplateTitle(pendingAction)}
        isLoggedIn={Boolean(user)}
        onSaveAndContinue={handleUnsavedSaveAndContinue}
        onDiscardAndContinue={handleUnsavedDiscardAndContinue}
      />

      {/* Browser Creator Sign In Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => {
          setIsLoginOpen(false);
          setPostLoginAction(null);
          setPendingAction(null);
        }}
        onSuccess={(loggedUser) => {
          setUser(loggedUser);
          setSavedTemplates(getSavedTemplates(loggedUser.id));
          if (postLoginAction === "save_and_continue") {
            setPostLoginAction(null);
            setIsSaveModalOpen(true);
          }
        }}
        reason={loginReason}
      />

    </div>
  );
}

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-screen flex items-center justify-center bg-slate-50">
          <div className="w-8 h-8 rounded-full border-2 border-rose-500 border-t-transparent animate-spin" />
        </div>
      }
    >
      <StudioApp />
    </Suspense>
  );
}
