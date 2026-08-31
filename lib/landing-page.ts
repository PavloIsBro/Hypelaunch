import { z } from "zod";

export type LandingColorPalette = {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
};

export type LandingPageContent = {
  tokenName: string;
  ticker: string;
  tagline: string;
  shortNarrative: string;
  audience: string;
  colorPalette: LandingColorPalette;
  heroTitle: string;
  heroSubtitle: string;
  aboutSection: string;
  communitySection: string;
  ctaText: string;
  pumpFunButtonLabel: string;
  xLinkLabel: string;
  telegramLinkLabel: string;
};

export const landingColorPaletteSchema = z.object({
  primary: z.string(),
  secondary: z.string(),
  accent: z.string(),
  background: z.string(),
});

export const landingPageSchema = z.object({
  tagline: z.string(),
  shortNarrative: z.string(),
  audience: z.string(),
  colorPalette: landingColorPaletteSchema,
  heroTitle: z.string(),
  heroSubtitle: z.string(),
  aboutSection: z.string(),
  communitySection: z.string(),
  ctaText: z.string(),
  pumpFunButtonLabel: z.string(),
  xLinkLabel: z.string(),
  telegramLinkLabel: z.string(),
});

export const DEFAULT_LANDING_PALETTE: LandingColorPalette = {
  primary: "#8b5cf6",
  secondary: "#22d3ee",
  accent: "#a78bfa",
  background: "#050508",
};

export function normalizeHexColor(value: string, fallback: string): string {
  const trimmed = value.trim();
  if (/^#[0-9A-Fa-f]{6}$/.test(trimmed)) return trimmed;
  if (/^[0-9A-Fa-f]{6}$/.test(trimmed)) return `#${trimmed}`;
  return fallback;
}

export function normalizeLandingPalette(
  raw: z.infer<typeof landingColorPaletteSchema>,
): LandingColorPalette {
  return {
    primary: normalizeHexColor(raw.primary, DEFAULT_LANDING_PALETTE.primary),
    secondary: normalizeHexColor(raw.secondary, DEFAULT_LANDING_PALETTE.secondary),
    accent: normalizeHexColor(raw.accent, DEFAULT_LANDING_PALETTE.accent),
    background: normalizeHexColor(raw.background, DEFAULT_LANDING_PALETTE.background),
  };
}

export function mapLandingPageFields(
  tokenName: string,
  ticker: string,
  raw: z.infer<typeof landingPageSchema>,
): LandingPageContent {
  return {
    tokenName,
    ticker,
    tagline: raw.tagline.trim(),
    shortNarrative: raw.shortNarrative.trim(),
    audience: raw.audience.trim(),
    colorPalette: normalizeLandingPalette(raw.colorPalette),
    heroTitle: raw.heroTitle.trim(),
    heroSubtitle: raw.heroSubtitle.trim(),
    aboutSection: raw.aboutSection.trim(),
    communitySection: raw.communitySection.trim(),
    ctaText: raw.ctaText.trim(),
    pumpFunButtonLabel: raw.pumpFunButtonLabel.trim(),
    xLinkLabel: raw.xLinkLabel.trim(),
    telegramLinkLabel: raw.telegramLinkLabel.trim(),
  };
}
