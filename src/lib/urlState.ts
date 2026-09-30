import LZString from "lz-string";
import { AppConfig, ChoiceCard, EvasionBehavior, ThemeId } from "@/types";
import { DEFAULT_CONFIG, TEMPLATES } from "./templates";

/**
 * Finds the closest base template in TEMPLATES for ultra-compact delta encoding
 */
export function findClosestTemplate(config: AppConfig): string | null {
  // 1. Direct ID match
  if (config.id && TEMPLATES[config.id]) return config.id;
  // 2. baseTemplateId match
  if (config.baseTemplateId && TEMPLATES[config.baseTemplateId]) return config.baseTemplateId;

  // 3. Match by targetId in Step 4
  const targetId = config.step4?.targetId;
  if (targetId) {
    for (const [key, t] of Object.entries(TEMPLATES)) {
      if (t.step4.targetId === targetId) return key;
    }
  }

  // 4. Match by option IDs
  const step3OptIds = new Set(config.step3?.options?.map((o) => o.id) || []);
  for (const [key, t] of Object.entries(TEMPLATES)) {
    const matchCount = t.step3.options.filter((o) => step3OptIds.has(o.id)).length;
    if (matchCount >= 2) return key;
  }

  // 5. Match by keyword in topic / title
  const text = `${config.title || ""} ${config.step1?.title || ""}`.toLowerCase();
  if (text.includes("parent") || text.includes("mom") || text.includes("dad") || text.includes("family")) return "favourite-parent";
  if (text.includes("date") || text.includes("romance") || text.includes("rendezvous")) return "romantic-date";
  if (text.includes("mvp") || text.includes("colleague") || text.includes("coworker") || text.includes("employee")) return "office-mvp";
  if (text.includes("dinner") || text.includes("food") || text.includes("hungry") || text.includes("eat")) return "dinner-decider";
  if (text.includes("chore") || text.includes("clean") || text.includes("duty")) return "chore-delegator";

  return null;
}

/**
 * Encodes a fully custom config into a schema-less compact array tuple
 */
export function serializeCompactTuple(config: AppConfig): string {
  try {
    const s1 = config.step1;
    const s2 = config.step2;
    const s3 = config.step3;
    const s4 = config.step4;
    const s5 = config.step5;

    const tuple = [
      config.title,
      config.theme,
      [s1.title, s1.subtitle, s1.emoji, s1.yesText, s1.noText, s1.evasionBehavior, s1.sensitivity],
      [s2.title, s2.subtitle, s2.emoji, s2.buttonText],
      [s3.title, s3.subtitle, s3.options.map((o) => [o.id, o.title, o.description || "", o.emoji || ""])],
      [
        s4.title,
        s4.subtitle,
        s4.mode,
        s4.targetId,
        s4.rejectionPhrases,
        s4.options.map((o) => [o.id, o.title, o.description || "", o.emoji || ""]),
      ],
      [s5.title, s5.subtitle, s5.badgeText, s5.confirmButtonText],
    ];

    return LZString.compressToEncodedURIComponent(JSON.stringify(tuple));
  } catch (err) {
    console.error("Failed to serialize compact tuple:", err);
    return "";
  }
}

/**
 * Decodes a schema-less compact array tuple back into AppConfig
 */
export function deserializeCompactTuple(encoded: string): AppConfig | null {
  try {
    const decompressed = LZString.decompressFromEncodedURIComponent(encoded);
    if (!decompressed) return null;
    const t = JSON.parse(decompressed);
    if (!Array.isArray(t) || t.length < 7) return null;

    const [title, theme, s1, s2, s3, s4, s5] = t;

    return {
      id: `custom-${Date.now()}`,
      title: title || "Custom Funnel",
      theme: theme || "pastel-romance",
      step1: {
        title: s1[0] || "",
        subtitle: s1[1] || "",
        emoji: s1[2] || "✨",
        yesText: s1[3] || "Yes! 💖",
        noText: s1[4] || "No",
        evasionBehavior: s1[5] || "teleport",
        sensitivity: s1[6] || 50,
        yesGrowthFactor: true,
      },
      step2: {
        title: s2[0] || "",
        subtitle: s2[1] || "",
        emoji: s2[2] || "🎉",
        buttonText: s2[3] || "Continue ✨",
      },
      step3: {
        title: s3[0] || "",
        subtitle: s3[1] || "",
        options: (s3[2] || []).map((o: any) => ({
          id: o[0],
          title: o[1],
          description: o[2],
          emoji: o[3],
        })),
      },
      step4: {
        title: s4[0] || "",
        subtitle: s4[1] || "",
        mode: s4[2] || "rigged",
        targetId: s4[3] || "",
        rejectionPhrases: s4[4] || [],
        options: (s4[5] || []).map((o: any) => ({
          id: o[0],
          title: o[1],
          description: o[2],
          emoji: o[3],
        })),
      },
      step5: {
        title: s5[0] || "",
        subtitle: s5[1] || "",
        badgeText: s5[2] || "CONFIRMED",
        confirmButtonText: s5[3] || "Send Confirmation",
      },
    };
  } catch (err) {
    console.error("Failed to deserialize compact tuple:", err);
    return null;
  }
}

/**
 * Legacy full serialization (preserved for backward compatibility)
 */
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
 * Generates an ultra-compact, human-readable share URL.
 * Automatically identifies base template and only encodes deltas.
 */
export function generateShareUrl(config: AppConfig, playOnly: boolean = true): string {
  if (typeof window === "undefined") return "";
  const base = `${window.location.origin}${window.location.pathname}`;
  const modeParam = playOnly ? "play" : "edit";

  const templateKey = findClosestTemplate(config);

  if (templateKey && TEMPLATES[templateKey]) {
    const baseT = TEMPLATES[templateKey];
    const params = new URLSearchParams();
    params.set("mode", modeParam);
    params.set("t", templateKey);

    if (config.theme !== baseT.theme) params.set("th", config.theme);
    if (config.step1.title !== baseT.step1.title) params.set("q", config.step1.title);
    if (config.step1.subtitle !== baseT.step1.subtitle) params.set("sub", config.step1.subtitle);
    if (config.step1.yesText !== baseT.step1.yesText) params.set("y", config.step1.yesText);
    if (config.step1.noText !== baseT.step1.noText) params.set("n", config.step1.noText);
    if (config.step1.evasionBehavior !== baseT.step1.evasionBehavior) params.set("ev", config.step1.evasionBehavior);
    if (config.step4.targetId !== baseT.step4.targetId) params.set("tg", config.step4.targetId);

    // Minor step titles
    if (config.step2.title !== baseT.step2.title) params.set("s2t", config.step2.title);
    if (config.step3.title !== baseT.step3.title) params.set("s3t", config.step3.title);
    if (config.step4.title !== baseT.step4.title) params.set("s4t", config.step4.title);
    if (config.step5.title !== baseT.step5.title) params.set("s5t", config.step5.title);
    if (config.step5.badgeText !== baseT.step5.badgeText) params.set("s5b", config.step5.badgeText);

    // Check if deep option cards or phrases changed
    const areStep3OptionsEqual = JSON.stringify(config.step3.options) === JSON.stringify(baseT.step3.options);
    const areStep4OptionsEqual = JSON.stringify(config.step4.options) === JSON.stringify(baseT.step4.options);
    const arePhrasesEqual = JSON.stringify(config.step4.rejectionPhrases) === JSON.stringify(baseT.step4.rejectionPhrases);

    if (!areStep3OptionsEqual || !areStep4OptionsEqual || !arePhrasesEqual) {
      const delta: Record<string, any> = {};
      if (!areStep3OptionsEqual) delta.s3 = config.step3.options.map((o) => [o.id, o.title, o.description || "", o.emoji || ""]);
      if (!areStep4OptionsEqual) delta.s4 = config.step4.options.map((o) => [o.id, o.title, o.description || "", o.emoji || ""]);
      if (!arePhrasesEqual) delta.p = config.step4.rejectionPhrases;
      params.set("d", LZString.compressToEncodedURIComponent(JSON.stringify(delta)));
    }

    return `${base}?${params.toString()}`;
  }

  // Schema-less compact tuple for completely custom funnels
  const compactCode = serializeCompactTuple(config);
  return `${base}?mode=${modeParam}&c2=${compactCode}`;
}

/**
 * Parses URL query params or hash into AppConfig.
 * Seamlessly handles:
 * - Query delta params (?t=...&q=...&th=...)
 * - Compact tuple (?c2=...)
 * - Legacy compressed JSON (?c=... or hash)
 */
export function parseConfigFromUrl(searchParams: URLSearchParams, hashStr: string = ""): AppConfig | null {
  try {
    const tParam = searchParams.get("t");
    const thParam = searchParams.get("th") as ThemeId | null;
    const qParam = searchParams.get("q");
    const subParam = searchParams.get("sub");
    const yParam = searchParams.get("y");
    const nParam = searchParams.get("n");
    const evParam = searchParams.get("ev") as EvasionBehavior | null;
    const tgParam = searchParams.get("tg");
    const s2tParam = searchParams.get("s2t");
    const s3tParam = searchParams.get("s3t");
    const s4tParam = searchParams.get("s4t");
    const s5tParam = searchParams.get("s5t");
    const s5bParam = searchParams.get("s5b");
    const dParam = searchParams.get("d");

    if (tParam && TEMPLATES[tParam]) {
      const config: AppConfig = JSON.parse(JSON.stringify(TEMPLATES[tParam]));
      config.baseTemplateId = tParam;

      if (thParam && ["pastel-romance", "electric-fun", "minimalist-dark"].includes(thParam)) {
        config.theme = thParam;
      }
      if (qParam) config.step1.title = qParam;
      if (subParam) config.step1.subtitle = subParam;
      if (yParam) config.step1.yesText = yParam;
      if (nParam) config.step1.noText = nParam;
      if (evParam) config.step1.evasionBehavior = evParam;
      if (tgParam) config.step4.targetId = tgParam;
      if (s2tParam) config.step2.title = s2tParam;
      if (s3tParam) config.step3.title = s3tParam;
      if (s4tParam) config.step4.title = s4tParam;
      if (s5tParam) config.step5.title = s5tParam;
      if (s5bParam) config.step5.badgeText = s5bParam;

      if (dParam) {
        try {
          const decompressed = LZString.decompressFromEncodedURIComponent(dParam);
          if (decompressed) {
            const delta = JSON.parse(decompressed);
            if (delta.s3) {
              config.step3.options = delta.s3.map((o: any) =>
                Array.isArray(o) ? { id: o[0], title: o[1], description: o[2], emoji: o[3] } : o
              );
            } else if (delta.s3Opts) {
              config.step3.options = delta.s3Opts;
            }

            if (delta.s4) {
              config.step4.options = delta.s4.map((o: any) =>
                Array.isArray(o) ? { id: o[0], title: o[1], description: o[2], emoji: o[3] } : o
              );
            } else if (delta.s4Opts) {
              config.step4.options = delta.s4Opts;
            }

            if (delta.p) {
              config.step4.rejectionPhrases = delta.p;
            } else if (delta.phrases) {
              config.step4.rejectionPhrases = delta.phrases;
            }
          }
        } catch (e) {
          console.warn("Failed to parse delta:", e);
        }
      }

      return config;
    }

    // Check compact tuple format (c2)
    const c2Param = searchParams.get("c2");
    if (c2Param) {
      const decoded = deserializeCompactTuple(c2Param);
      if (decoded) return decoded;
    }

    // Check legacy full JSON format (c or state)
    const configParam = searchParams.get("c") || searchParams.get("state");
    if (configParam) {
      return deserializeConfig(configParam);
    }

    // Hash check
    if (hashStr) {
      const hash = hashStr.replace("#", "");
      const params = new URLSearchParams(hash);
      const hashT = params.get("t");
      if (hashT && TEMPLATES[hashT]) {
        return JSON.parse(JSON.stringify(TEMPLATES[hashT]));
      }
      const hashC2 = params.get("c2");
      if (hashC2) {
        const decoded = deserializeCompactTuple(hashC2);
        if (decoded) return decoded;
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
 * 1-Click Short URL Generator using JSONP & CORS proxy fallbacks
 * Guaranteed to work directly in web browsers without CORS blocking!
 */
export async function createShortUrl(longUrl: string): Promise<string> {
  if (typeof window === "undefined") return longUrl;

  // Attempt 1: is.gd JSONP (bypasses browser CORS policy via dynamic script tag)
  try {
    const isGdPromise = new Promise<string>((resolve, reject) => {
      const callbackName = `__isgd_cb_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
      const script = document.createElement("script");
      const timer = setTimeout(() => {
        cleanup();
        reject(new Error("is.gd JSONP timeout"));
      }, 4000);

      const cleanup = () => {
        clearTimeout(timer);
        delete (window as any)[callbackName];
        if (script.parentNode) script.parentNode.removeChild(script);
      };

      (window as any)[callbackName] = (data: any) => {
        cleanup();
        if (data && data.shorturl) {
          resolve(data.shorturl);
        } else {
          reject(new Error(data?.errormessage || "is.gd error"));
        }
      };

      script.src = `https://is.gd/create.php?format=json&callback=${callbackName}&url=${encodeURIComponent(longUrl)}`;
      script.onerror = () => {
        cleanup();
        reject(new Error("is.gd script error"));
      };
      document.head.appendChild(script);
    });

    return await isGdPromise;
  } catch (err) {
    console.warn("is.gd JSONP shortener failed, trying TinyURL CORS proxy...", err);
  }

  // Attempt 2: TinyURL via public CORS Proxy
  try {
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(
      `https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`
    )}`;
    const res = await fetch(proxyUrl);
    if (res.ok) {
      const text = await res.text();
      if (text && text.startsWith("http")) {
        return text.trim();
      }
    }
  } catch (err) {
    console.warn("CORS proxy TinyURL failed:", err);
  }

  // Attempt 3: Direct TinyURL fetch fallback
  try {
    const res = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`);
    if (res.ok) {
      const text = await res.text();
      if (text && text.startsWith("http")) {
        return text.trim();
      }
    }
  } catch {
    // Ignore
  }

  return longUrl;
}
