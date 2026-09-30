"use client";

import React from "react";
import {
  AlertTriangle,
  Bookmark,
  Trash2,
  X,
  ArrowRight,
  LogIn,
} from "lucide-react";

interface UnsavedChangesModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTemplateTitle: string;
  targetTemplateTitle?: string;
  isLoggedIn: boolean;
  onSaveAndContinue: () => void;
  onDiscardAndContinue: () => void;
}

export const UnsavedChangesModal: React.FC<UnsavedChangesModalProps> = ({
  isOpen,
  onClose,
  currentTemplateTitle,
  targetTemplateTitle,
  isLoggedIn,
  onSaveAndContinue,
  onDiscardAndContinue,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 bg-amber-50/70 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                Unsaved Template Edits
              </h3>
              <p className="text-xs text-amber-800 font-medium">
                Save your progress before switching
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

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-sm text-slate-700 leading-relaxed">
            You have unsaved customizations on{" "}
            <strong className="text-slate-900 font-bold">"{currentTemplateTitle}"</strong>.
            {targetTemplateTitle && (
              <>
                {" "}
                Before opening{" "}
                <strong className="text-slate-900 font-bold">"{targetTemplateTitle}"</strong>,
                would you like to save this template with a name under your profile?
              </>
            )}
          </p>

          {!isLoggedIn && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-900 flex items-start gap-2.5">
              <LogIn className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Sign-in required to save:</strong> You will be prompted to sign in with a simple click so your template can be named and saved to your profile.
              </div>
            </div>
          )}

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600">
            💡 Standard preset templates are protected. Your changes will be saved as a brand-new template in your personal library.
          </div>
        </div>

        {/* Actions */}
        <div className="p-5 border-t border-slate-100 bg-slate-50/90 flex flex-col gap-2.5">
          <button
            type="button"
            onClick={onSaveAndContinue}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white text-xs font-extrabold flex items-center justify-center gap-2 shadow-md shadow-rose-200 transition-all cursor-pointer transform hover:scale-[1.01]"
          >
            <Bookmark className="w-4 h-4 fill-current" />
            <span>{isLoggedIn ? "Save with Name & Continue 💾" : "Sign In, Save with Name & Continue 💾"}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 px-3 rounded-xl border border-slate-200 hover:bg-white text-slate-700 text-xs font-bold transition-all cursor-pointer text-center"
            >
              Keep Editing
            </button>

            <button
              type="button"
              onClick={onDiscardAndContinue}
              className="flex-1 py-2.5 px-3 rounded-xl border border-rose-200 hover:bg-rose-50 text-rose-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer text-center"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Discard Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
