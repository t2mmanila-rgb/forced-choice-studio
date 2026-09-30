"use client";

import React from "react";
import { ThemeId } from "@/types";
import { THEMES } from "@/lib/themes";
import { Smartphone, Monitor, Wifi, Battery, Signal } from "lucide-react";

interface DeviceFrameProps {
  device: "desktop" | "mobile";
  onDeviceChange?: (device: "desktop" | "mobile") => void;
  themeId?: ThemeId;
  children: React.ReactNode;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({
  device,
  onDeviceChange,
  themeId = "pastel-romance",
  children,
}) => {
  const theme = THEMES[themeId] || THEMES["pastel-romance"];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative p-2 sm:p-6 overflow-hidden">
      {/* Device Toggle Pill in Studio Mode */}
      {onDeviceChange && (
        <div className="mb-4 z-20 flex items-center bg-white/95 backdrop-blur-md rounded-full p-1 border border-slate-200/90 shadow-sm">
          <button
            type="button"
            onClick={() => onDeviceChange("mobile")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              device === "mobile"
                ? "bg-slate-900 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile View</span>
          </button>
          <button
            type="button"
            onClick={() => onDeviceChange("desktop")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              device === "desktop"
                ? "bg-slate-900 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Desktop View</span>
          </button>
        </div>
      )}

      {/* Frame Container */}
      <div className="w-full h-full flex items-center justify-center overflow-auto max-h-[85vh]">
        {device === "mobile" ? (
          /* Mobile Phone Chassis */
          <div className="relative w-[380px] h-[720px] max-w-full max-h-full rounded-[44px] bg-slate-950 p-3 shadow-2xl ring-1 ring-slate-800 flex flex-col flex-shrink-0">
            {/* Phone Screen */}
            <div
              className={`relative w-full h-full rounded-[36px] overflow-hidden flex flex-col shadow-inner transition-colors duration-300 ${theme.deviceScreenBg}`}
            >
              {/* iOS Status Bar */}
              <div
                className={`h-8 w-full bg-transparent flex items-center justify-between px-6 pt-1 z-30 select-none pointer-events-none ${theme.statusBarText}`}
              >
                <span className="text-[11px] font-bold">9:41</span>
                {/* Dynamic Island */}
                <div className="w-20 h-4 bg-slate-900 rounded-full" />
                <div className="flex items-center gap-1.5">
                  <Signal className="w-3 h-3" />
                  <Wifi className="w-3 h-3" />
                  <Battery className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Mobile Content Area */}
              <div className="w-full flex-1 overflow-y-auto overflow-x-hidden relative flex flex-col">
                {children}
              </div>

              {/* iOS Home Indicator Bar */}
              <div className="h-4 w-full flex items-center justify-center pb-1 z-30 pointer-events-none">
                <div className="w-32 h-1 bg-slate-400/60 rounded-full" />
              </div>
            </div>
          </div>
        ) : (
          /* Desktop Browser Window Frame */
          <div
            className={`w-full max-w-4xl h-[720px] max-h-full rounded-2xl shadow-2xl border border-slate-200/80 flex flex-col overflow-hidden ${theme.deviceScreenBg}`}
          >
            {/* Desktop Browser Bar */}
            <div className="h-10 bg-slate-100 border-b border-slate-200 flex items-center justify-between px-4 select-none">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-400 border border-rose-500/40" />
                <div className="w-3 h-3 rounded-full bg-amber-400 border border-amber-500/40" />
                <div className="w-3 h-3 rounded-full bg-emerald-400 border border-emerald-500/40" />
              </div>

              <div className="bg-white px-6 py-1 rounded-md text-xs text-slate-500 font-mono border border-slate-200/70 shadow-xs max-w-md w-full text-center truncate">
                https://yesplan.fun/invite/you-and-me
              </div>

              <div className="w-12" />
            </div>

            {/* Desktop Screen Content */}
            <div className="w-full flex-1 overflow-y-auto overflow-x-hidden relative">
              {children}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
