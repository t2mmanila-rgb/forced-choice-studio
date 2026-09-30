export type EvasionBehavior = 'teleport' | 'halo' | 'shrink' | 'bamboozle';

export type ThemeId = 'pastel-romance' | 'electric-fun' | 'minimalist-dark';

export interface ChoiceCard {
  id: string;
  title: string;
  description?: string;
  emoji?: string;
  icon?: string;
}

export interface Step1Config {
  title: string;
  subtitle: string;
  emoji: string;
  yesText: string;
  noText: string;
  evasionBehavior: EvasionBehavior;
  sensitivity: number; // 20 - 100 px
  yesGrowthFactor: boolean;
}

export interface Step2Config {
  title: string;
  subtitle: string;
  emoji: string;
  buttonText: string;
}

export interface Step3Config {
  title: string;
  subtitle: string;
  options: ChoiceCard[];
}

export interface Step4Config {
  title: string;
  subtitle: string;
  mode: 'free' | 'rigged';
  targetId: string;
  rejectionPhrases: string[];
  options: ChoiceCard[];
}

export interface Step5Config {
  title: string;
  subtitle: string;
  badgeText: string;
  confirmButtonText: string;
}

export interface AppConfig {
  id: string;
  baseTemplateId?: string;
  title: string;
  theme: ThemeId;
  step1: Step1Config;
  step2: Step2Config;
  step3: Step3Config;
  step4: Step4Config;
  step5: Step5Config;
}

export interface FunnelSelections {
  step3OptionId: string | null;
  step4OptionId: string | null;
}

export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  avatarEmoji?: string;
  createdAt: string;
}

export interface SavedTemplateRecord {
  id: string;
  title: string;
  description?: string;
  baseTemplateId?: string;
  updatedAt: string;
  config: AppConfig;
}

