"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AppConfig } from "@/types";
import { DEFAULT_CONFIG, TEMPLATES } from "@/lib/templates";
import { deserializeConfig, serializeConfig } from "@/lib/urlState";
import { Header } from "@/components/Header";
import { BuilderSidebar } from "@/components/BuilderSidebar";
import { DeviceFrame } from "@/components/DeviceFrame";
import { FunnelContainer } from "@/components/FunnelContainer";
import { ShareModal } from "@/components/ShareModal";
import { Sparkles, Edit3 } from "lucide-react";

function StudioApp() {
  const searchParams = useSearchParams();
  const [config, setConfig] = useState<AppConfig>(DEFAULT_CONFIG);
  const [mode, setMode] = useState<"builder" | "play">("builder");
  const [device, setDevice] = useState<"desktop" | "mobile">("mobile");
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize from URL parameters or hash on mount
  useEffect(() => {
    try {
      const modeParam = searchParams.get("mode");
      const configParam = searchParams.get("c") || searchParams.get("state");

      let loadedConfig: AppConfig | null = null;

      if (configParam) {
        loadedConfig = deserializeConfig(configParam);
      } else if (window.location.hash) {
        const hash = window.location.hash.replace("#", "");
        const params = new URLSearchParams(hash);
        const hashConfig = params.get("c") || params.get("state");
        if (hashConfig) {
          loadedConfig = deserializeConfig(hashConfig);
        }
      }

      if (loadedConfig) {
        setConfig(loadedConfig);
      }

      if (modeParam === "play" || (configParam && modeParam !== "edit")) {
        setMode("play");
      }
    } catch (err) {
      console.error("Initialization error:", err);
    } finally {
      setIsInitialized(true);
    }
  }, [searchParams]);

  const handleSelectTemplate = (templateKey: string) => {
    if (TEMPLATES[templateKey]) {
      setConfig({ ...TEMPLATES[templateKey] });
    }
  };

  const handleResetDefaults = () => {
    const currentId = config.id in TEMPLATES ? config.id : "romantic-date";
    setConfig({ ...TEMPLATES[currentId] });
  };

  if (!isInitialized) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-slate-50">
        <div className="w-8 h-8 rounded-full border-2 border-rose-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  // Recipient / Play Mode: Clean full screen experience with zero builder UI
  if (mode === "play") {
    return (
      <div className="min-h-screen w-full relative flex flex-col justify-center">
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
      />

      {/* Main Split-Screen Workspace */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        {/* Left Drawer: Builder Settings Panel */}
        <div className="w-full md:w-[420px] lg:w-[460px] h-1/2 md:h-full flex-shrink-0 z-10 shadow-sm border-r border-slate-200">
          <BuilderSidebar config={config} onChange={setConfig} />
        </div>

        {/* Right Canvas: Interactive Device Frame */}
        <div className="flex-1 h-1/2 md:h-full bg-slate-100 relative overflow-hidden flex flex-col">
          <DeviceFrame device={device} onDeviceChange={setDevice}>
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
