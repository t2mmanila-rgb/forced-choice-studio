"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserProfile } from "@/types";
import { loginUser } from "@/lib/authStorage";
import {
  X,
  LogIn,
  Check,
  User,
  Mail,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: UserProfile) => void;
  reason?: string;
}

const AVATAR_OPTIONS = ["👤", "💖", "🚀", "👑", "⚡", "🍕", "🎯", "🏆"];

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  reason,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("👤");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!name.trim()) {
      setError("Please enter a creator name or handle");
      return;
    }

    const user = loginUser(name.trim(), email.trim(), selectedAvatar);
    onSuccess(user);
    onClose();
  };

  const handleQuickLogin = (defaultName: string = "Michael") => {
    const user = loginUser(defaultName, "creator@yesplan.local", "👑");
    onSuccess(user);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100 relative"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="flex items-center gap-3.5 mb-5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-500 text-white flex items-center justify-center shadow-sm">
              <LogIn className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                Creator Sign In
              </h3>
              <p className="text-xs text-slate-500">
                Simple browser-based login to create & save
              </p>
            </div>
          </div>

          {/* Reason Notification Banner */}
          {reason && (
            <div className="mb-4 p-3 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-amber-800 font-semibold">{reason}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                Creator Name / Handle
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="e.g. Michael, Funnel Master"
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm font-semibold border-2 border-slate-200 rounded-xl outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-100 transition-all text-slate-800"
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              </div>
              {error && <p className="text-[11px] text-rose-500 mt-1 font-semibold">{error}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                Email (Optional)
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. name@example.com"
                  className="w-full pl-10 pr-4 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:border-rose-400 transition-all text-slate-800"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
              </div>
            </div>

            {/* Avatar Emoji Selector */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                Choose Avatar
              </label>
              <div className="flex items-center gap-1.5">
                {AVATAR_OPTIONS.map((em) => (
                  <button
                    key={em}
                    type="button"
                    onClick={() => setSelectedAvatar(em)}
                    className={`w-9 h-9 rounded-xl text-lg flex items-center justify-center border transition-all cursor-pointer ${
                      selectedAvatar === em
                        ? "border-rose-500 bg-rose-50 ring-2 ring-rose-200 shadow-xs"
                        : "border-slate-200 hover:bg-slate-50 bg-white"
                    }`}
                  >
                    {em}
                  </button>
                ))}
              </div>
            </div>

            {/* Primary Submit */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-pink-500 hover:from-amber-600 hover:to-pink-600 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer transform hover:scale-[1.01]"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In & Continue</span>
              </button>
            </div>
          </form>

          {/* Quick 1-Click Login Option */}
          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin("Michael")}
              className="w-full py-2.5 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>1-Click Sign In as Michael</span>
            </button>
          </div>

          {/* Privacy Note */}
          <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>All login info & templates are stored in your browser</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
