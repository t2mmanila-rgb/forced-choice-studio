import { AppConfig, UserProfile, SavedTemplateRecord } from "@/types";

const USER_STORAGE_KEY = "yesplan_current_user";
const SAVED_TEMPLATES_KEY_PREFIX = "yesplan_saved_templates_";

/**
 * Gets the currently logged-in user from localStorage
 */
export function getCurrentUser(): UserProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(USER_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    console.error("Failed to read user session:", err);
    return null;
  }
}

/**
 * Logs in a user and saves the session to localStorage
 */
export function loginUser(name: string, email?: string, avatarEmoji: string = "👤"): UserProfile {
  const user: UserProfile = {
    id: `user_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    name: name.trim() || "Studio Creator",
    email: email?.trim() || undefined,
    avatarEmoji: avatarEmoji || "👤",
    createdAt: new Date().toISOString(),
  };

  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      // Dispatch a custom event so other components immediately react
      window.dispatchEvent(new Event("yesplan_auth_changed"));
    } catch (err) {
      console.error("Failed to save user session:", err);
    }
  }

  return user;
}

/**
 * Logs out the current user
 */
export function logoutUser(): void {
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem(USER_STORAGE_KEY);
      window.dispatchEvent(new Event("yesplan_auth_changed"));
    } catch (err) {
      console.error("Failed to clear user session:", err);
    }
  }
}

/**
 * Retrieves all templates saved in the browser by the user
 */
export function getSavedTemplates(userId?: string): SavedTemplateRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const key = userId ? `${SAVED_TEMPLATES_KEY_PREFIX}${userId}` : `${SAVED_TEMPLATES_KEY_PREFIX}global`;
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error("Failed to load saved templates:", err);
    return [];
  }
}

import { TEMPLATES } from "@/lib/templates";

/**
 * Checks if a template ID is one of the built-in standard templates
 */
export function isStandardTemplate(templateId?: string): boolean {
  if (!templateId) return false;
  return templateId in TEMPLATES;
}

export interface SaveTemplateOptions {
  title?: string;
  description?: string;
  saveAsNew?: boolean;
}

/**
 * Saves or updates a template in browser localStorage.
 * If config is based on a standard template, it always creates a new user template
 * under their profile without modifying the original standard template.
 */
export function saveUserTemplate(
  config: AppConfig,
  userId?: string,
  options?: SaveTemplateOptions
): SavedTemplateRecord {
  const isStandard = isStandardTemplate(config.id);
  const shouldCreateNew =
    options?.saveAsNew || isStandard || !config.id || !config.id.startsWith("user_tmpl_");

  const recordId = shouldCreateNew
    ? `user_tmpl_${Date.now()}_${Math.floor(Math.random() * 1000)}`
    : config.id;

  // Preserve the original standard template as baseTemplateId for compact URL serialization
  const baseTemplateId =
    config.baseTemplateId || (isStandard ? config.id : undefined);

  const finalTitle =
    options?.title?.trim() ||
    config.title?.trim() ||
    config.step1?.title?.trim() ||
    "Custom Template";

  const updatedConfig: AppConfig = {
    ...config,
    id: recordId,
    baseTemplateId,
    title: finalTitle,
  };

  const record: SavedTemplateRecord = {
    id: recordId,
    title: finalTitle,
    description: options?.description?.trim() || undefined,
    baseTemplateId,
    updatedAt: new Date().toISOString(),
    config: updatedConfig,
  };

  if (typeof window !== "undefined") {
    try {
      const key = userId ? `${SAVED_TEMPLATES_KEY_PREFIX}${userId}` : `${SAVED_TEMPLATES_KEY_PREFIX}global`;
      const current = getSavedTemplates(userId);
      const existingIdx = current.findIndex((item) => item.id === record.id);

      let updated: SavedTemplateRecord[];
      if (existingIdx >= 0) {
        updated = [...current];
        updated[existingIdx] = record;
      } else {
        updated = [record, ...current];
      }

      localStorage.setItem(key, JSON.stringify(updated));
      window.dispatchEvent(new Event("yesplan_templates_changed"));
    } catch (err) {
      console.error("Failed to save template to browser:", err);
    }
  }

  return record;
}


/**
 * Deletes a template from the user's browser library
 */
export function deleteUserTemplate(templateId: string, userId?: string): void {
  if (typeof window !== "undefined") {
    try {
      const key = userId ? `${SAVED_TEMPLATES_KEY_PREFIX}${userId}` : `${SAVED_TEMPLATES_KEY_PREFIX}global`;
      const current = getSavedTemplates(userId);
      const filtered = current.filter((item) => item.id !== templateId);
      localStorage.setItem(key, JSON.stringify(filtered));
      window.dispatchEvent(new Event("yesplan_templates_changed"));
    } catch (err) {
      console.error("Failed to delete template:", err);
    }
  }
}
