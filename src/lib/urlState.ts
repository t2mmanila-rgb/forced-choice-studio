import LZString from "lz-string";
import { AppConfig } from "@/types";
import { DEFAULT_CONFIG } from "./templates";

export function serializeConfig(config: AppConfig): string {
  try {
    const jsonStr = JSON.stringify(config);
    return LZString.compressToEncodedURIComponent(jsonStr);
  } catch (err) {
    console.error("Failed to serialize config:", err);
    return "";
  }
}

export function deserializeConfig(encoded: string): AppConfig | null {
  if (!encoded) return null;
  try {
    const decompressed = LZString.decompressFromEncodedURIComponent(encoded);
    if (!decompressed) {
      // Fallback: try raw JSON or base64
      try {
        const decoded = decodeURIComponent(atob(encoded));
        return JSON.parse(decoded);
      } catch {
        return null;
      }
    }
    return JSON.parse(decompressed);
  } catch (err) {
    console.error("Failed to deserialize config:", err);
    return null;
  }
}

export function generateShareUrl(config: AppConfig, playOnly: boolean = true): string {
  if (typeof window === "undefined") return "";
  const base = `${window.location.origin}${window.location.pathname}`;
  const encoded = serializeConfig(config);
  const modeParam = playOnly ? "mode=play" : "mode=edit";
  return `${base}?${modeParam}&c=${encoded}`;
}
