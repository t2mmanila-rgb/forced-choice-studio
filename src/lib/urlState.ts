import LZString from "lz-string";
import { AppConfig, ThemeId } from "@/types";
import { DEFAULT_CONFIG, TEMPLATES } from "./templates";

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

/**
 * Checks if config is identical or nearly identical to a known preset template
 */
export function getTemplateKey(config: AppConfig): string | null {
  for (const [key, t] of Object.entries(TEMPLATES)) {
    if (config.id === key) return key;
  }
  return null;
}

/**
 * Generates an ultra-compact share URL.
 * If the config is based on a template, produces a tiny URL like:
 * ?mode=play&t=romantic-date&th=electric-fun
 */
export function generateShareUrl(config: AppConfig, playOnly: boolean = true): string {
  if (typeof window === "undefined") return "";
  const base = `${window.location.origin}${window.location.pathname}`;
  const modeParam = playOnly ? "mode=play" : "mode=edit";

  const templateKey = getTemplateKey(config);

  if (templateKey && TEMPLATES[templateKey]) {
    const baseT = TEMPLATES[templateKey];
    // Check if custom modifications exist
    const isThemeChanged = config.theme !== baseT.theme;
    const isTitleChanged = config.step1.title !== baseT.step1.title;
    const isTargetChanged = config.step4.targetId !== baseT.step4.targetId;

    // If completely stock template
    if (!isThemeChanged && !isTitleChanged && !isTargetChanged) {
      return `${base}?${modeParam}&t=${templateKey}`;
    }

    // Compact delta parameters
    const params = new URLSearchParams();
    params.set(playOnly ? "mode" : "mode", playOnly ? "play" : "edit");
    params.set("t", templateKey);
    if (isThemeChanged) params.set("th", config.theme);
    if (isTitleChanged) params.set("q", config.step1.title);
    if (isTargetChanged) params.set("tg", config.step4.targetId);

    return `${base}?${params.toString()}`;
  }

  // Fallback to compressed string for completely custom funnels
  const encoded = serializeConfig(config);
  return `${base}?${modeParam}&c=${encoded}`;
}

/**
 * Parses URL query params or hash into AppConfig.
 * Handles both compact template URLs (?t=...) and compressed URLs (?c=...)
 */
export function parseConfigFromUrl(searchParams: URLSearchParams, hashStr: string = ""): AppConfig | null {
  try {
    const tParam = searchParams.get("t");
    const thParam = searchParams.get("th") as ThemeId | null;
    const qParam = searchParams.get("q");
    const tgParam = searchParams.get("tg");

    if (tParam && TEMPLATES[tParam]) {
      const config: AppConfig = JSON.parse(JSON.stringify(TEMPLATES[tParam]));
      if (thParam && ["pastel-romance", "electric-fun", "minimalist-dark"].includes(thParam)) {
        config.theme = thParam;
      }
      if (qParam) {
        config.step1.title = qParam;
      }
      if (tgParam) {
        config.step4.targetId = tgParam;
      }
      return config;
    }

    const configParam = searchParams.get("c") || searchParams.get("state");
    if (configParam) {
      return deserializeConfig(configParam);
    }

    if (hashStr) {
      const hash = hashStr.replace("#", "");
      const params = new URLSearchParams(hash);
      const hashT = params.get("t");
      if (hashT && TEMPLATES[hashT]) {
        return JSON.parse(JSON.stringify(TEMPLATES[hashT]));
      }
      const hashC = params.get("c") || params.get("state");
      if (hashC) {
        return deserializeConfig(hashC);
      }
    }
  } catch (err) {
    console.error("Error parsing config from URL:", err);
  }
  return null;
}

/**
 * 1-Click Short URL Generator using TinyURL API with graceful fallback
 */
export async function createShortUrl(longUrl: string): Promise<string> {
  try {
    const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`, {
      method: "GET",
    });
    if (response.ok) {
      const shortUrl = await response.text();
      if (shortUrl && shortUrl.startsWith("http")) {
        return shortUrl.trim();
      }
    }
  } catch (err) {
    console.warn("TinyURL shortener failed or offline, using compact URL:", err);
  }
  return longUrl;
}
