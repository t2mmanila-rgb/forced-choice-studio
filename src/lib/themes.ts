import { ThemeId } from "@/types";

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  description: string;
  badge: string;
  bgGradient: string;
  cardBg: string;
  cardBorder: string;
  primaryButton: string;
  secondaryButton: string;
  accentText: string;
  activeCardBorder: string;
  chipBg: string;
}

export const THEMES: Record<ThemeId, ThemeConfig> = {
  "pastel-romance": {
    id: "pastel-romance",
    name: "Pastel Romance",
    description: "Blush pink, soft cream, rose gold & warm accents",
    badge: "bg-rose-100 text-rose-700 border-rose-200",
    bgGradient: "from-rose-50 via-pink-50 to-orange-50",
    cardBg: "bg-white/85 backdrop-blur-md",
    cardBorder: "border-rose-100/80 shadow-rose-100/50",
    primaryButton:
      "bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white shadow-lg shadow-rose-300/40",
    secondaryButton:
      "bg-white/90 text-rose-700 border border-rose-200 hover:bg-rose-50 shadow-sm",
    accentText: "text-rose-600",
    activeCardBorder: "border-rose-500 bg-rose-50/60 shadow-md ring-2 ring-rose-300",
    chipBg: "bg-rose-50 text-rose-700 border-rose-200",
  },
  "electric-fun": {
    id: "electric-fun",
    name: "Electric Fun",
    description: "Vibrant purple, vivid cyan, electric yellow",
    badge: "bg-purple-100 text-purple-700 border-purple-200",
    bgGradient: "from-indigo-50 via-purple-50 to-cyan-50",
    cardBg: "bg-white/90 backdrop-blur-md",
    cardBorder: "border-purple-100/80 shadow-purple-100/50",
    primaryButton:
      "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg shadow-purple-300/40",
    secondaryButton:
      "bg-white/90 text-purple-700 border border-purple-200 hover:bg-purple-50 shadow-sm",
    accentText: "text-purple-600",
    activeCardBorder: "border-purple-500 bg-purple-50/60 shadow-md ring-2 ring-purple-300",
    chipBg: "bg-purple-50 text-purple-700 border-purple-200",
  },
  "minimalist-dark": {
    id: "minimalist-dark",
    name: "Minimalist Dark",
    description: "Deep slate, sleek zinc, emerald accents",
    badge: "bg-zinc-800 text-emerald-400 border-zinc-700",
    bgGradient: "from-zinc-950 via-slate-900 to-zinc-900 text-zinc-100",
    cardBg: "bg-zinc-900/90 backdrop-blur-md text-zinc-100",
    cardBorder: "border-zinc-800 shadow-zinc-950/60",
    primaryButton:
      "bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-bold shadow-lg shadow-emerald-900/40",
    secondaryButton:
      "bg-zinc-800 text-zinc-200 border border-zinc-700 hover:bg-zinc-700 shadow-sm",
    accentText: "text-emerald-400",
    activeCardBorder: "border-emerald-400 bg-emerald-950/40 shadow-md ring-2 ring-emerald-500/40",
    chipBg: "bg-zinc-800 text-emerald-400 border-zinc-700",
  },
};
