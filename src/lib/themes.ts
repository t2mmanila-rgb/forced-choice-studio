import { ThemeId } from "@/types";

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  subtitle: string;
  description: string;
  badge: string;
  bgGradient: string;
  cardBg: string;
  cardBorder: string;
  headingText: string;
  bodyText: string;
  mutedText: string;
  primaryButton: string;
  secondaryButton: string;
  accentText: string;
  activeCardBorder: string;
  inactiveCardBg: string;
  chipBg: string;
  iconBg: string;
  passBg: string;
  passBorder: string;
  passText: string;
  passMutedText: string;
  passCardInner: string;
  passTicketNotch: string;
}

export const THEMES: Record<ThemeId, ThemeConfig> = {
  "pastel-romance": {
    id: "pastel-romance",
    name: "Pastel Romance",
    subtitle: "Blush Pink & Rose Gold",
    description: "Dreamy blush pink, soft cream, rose accents & warm romantic vibes",
    badge: "bg-rose-100 text-rose-700 border-rose-200",
    bgGradient: "from-rose-100 via-pink-50 to-amber-50 text-rose-950",
    cardBg: "bg-white/95 backdrop-blur-md shadow-xl shadow-rose-200/50",
    cardBorder: "border-rose-200/90",
    headingText: "text-rose-950",
    bodyText: "text-rose-800/90",
    mutedText: "text-rose-600/70",
    primaryButton:
      "bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-600 text-white shadow-lg shadow-rose-300/60 font-bold rounded-full",
    secondaryButton:
      "bg-white text-rose-700 border-2 border-rose-200 hover:bg-rose-50 shadow-sm font-semibold rounded-full",
    accentText: "text-rose-600",
    activeCardBorder:
      "border-2 border-rose-500 bg-rose-50/90 shadow-lg shadow-rose-200/50 ring-4 ring-rose-200/60 text-rose-950",
    inactiveCardBg:
      "bg-white/90 border-rose-200/70 hover:border-rose-300 hover:bg-white text-rose-900",
    chipBg: "bg-rose-100/80 text-rose-700 border-rose-200",
    iconBg: "bg-white shadow-md border border-rose-100 text-rose-500",
    passBg: "bg-white",
    passBorder: "border-rose-200",
    passText: "text-rose-950",
    passMutedText: "text-rose-500",
    passCardInner: "bg-rose-50/60 border-rose-100",
    passTicketNotch: "bg-rose-100 border-rose-200",
  },

  "electric-fun": {
    id: "electric-fun",
    name: "Electric Fun",
    subtitle: "Cyber Neon & Pop Glow",
    description: "Vivid midnight neon, punchy cyan, fuchsia glow & arcade energy",
    badge: "bg-purple-950 text-cyan-300 border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.4)]",
    bgGradient: "from-slate-950 via-purple-950 to-indigo-950 text-white",
    cardBg: "bg-slate-900/95 backdrop-blur-xl shadow-2xl shadow-purple-950/80 border-2 border-purple-500/40",
    cardBorder: "border-purple-500/40",
    headingText: "text-white drop-shadow-[0_0_12px_rgba(168,85,247,0.4)]",
    bodyText: "text-purple-200",
    mutedText: "text-purple-400",
    primaryButton:
      "bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-yellow-400 hover:from-cyan-300 hover:to-yellow-300 text-slate-950 font-black shadow-[0_0_25px_rgba(236,72,153,0.6)] uppercase tracking-wide rounded-full",
    secondaryButton:
      "bg-slate-900 text-cyan-300 border-2 border-cyan-400 hover:bg-slate-800 shadow-[0_0_15px_rgba(6,182,212,0.3)] font-bold rounded-full",
    accentText: "text-cyan-400",
    activeCardBorder:
      "border-2 border-cyan-400 bg-purple-950/90 shadow-[0_0_25px_rgba(6,182,212,0.5)] ring-4 ring-cyan-400/40 text-white",
    inactiveCardBg:
      "bg-slate-900/80 border-purple-800/60 hover:border-cyan-400/80 hover:bg-slate-850 text-slate-200",
    chipBg: "bg-purple-900/60 text-yellow-300 border-purple-500/50",
    iconBg: "bg-slate-900 border-2 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.4)] text-yellow-300",
    passBg: "bg-slate-900",
    passBorder: "border-purple-500/60",
    passText: "text-white",
    passMutedText: "text-purple-300",
    passCardInner: "bg-slate-950/80 border-purple-500/30",
    passTicketNotch: "bg-purple-950 border-purple-500",
  },

  "minimalist-dark": {
    id: "minimalist-dark",
    name: "Minimalist Dark",
    subtitle: "Stealth Obsidian & Emerald",
    description: "Matte obsidian, crisp monospace typography & glowing emerald accents",
    badge: "bg-zinc-900 text-emerald-400 border-zinc-700 font-mono",
    bgGradient: "from-black via-zinc-950 to-neutral-900 text-zinc-100",
    cardBg: "bg-zinc-950/90 backdrop-blur-md shadow-2xl shadow-black border border-zinc-800",
    cardBorder: "border-zinc-800",
    headingText: "text-zinc-100 font-mono tracking-tight",
    bodyText: "text-zinc-400",
    mutedText: "text-zinc-500",
    primaryButton:
      "bg-emerald-400 hover:bg-emerald-300 text-black font-mono font-black shadow-[0_0_20px_rgba(52,211,153,0.4)] tracking-tight rounded-xl",
    secondaryButton:
      "bg-zinc-900 text-zinc-300 border border-zinc-700 hover:bg-zinc-800 hover:text-white font-mono font-medium rounded-xl",
    accentText: "text-emerald-400 font-mono",
    activeCardBorder:
      "border-2 border-emerald-400 bg-zinc-900/90 shadow-[0_0_15px_rgba(52,211,153,0.3)] ring-2 ring-emerald-500/30 text-white",
    inactiveCardBg:
      "bg-zinc-900/70 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900 text-zinc-300",
    chipBg: "bg-zinc-900 text-emerald-400 border-zinc-700 font-mono",
    iconBg: "bg-zinc-900 border border-zinc-800 shadow-md text-emerald-400",
    passBg: "bg-zinc-950",
    passBorder: "border-zinc-800",
    passText: "text-zinc-100",
    passMutedText: "text-zinc-400",
    passCardInner: "bg-zinc-900/80 border-zinc-800",
    passTicketNotch: "bg-black border-zinc-800",
  },
};
