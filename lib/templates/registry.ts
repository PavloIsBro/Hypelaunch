import type { LandingTemplateId } from "./types";
import { getSharedLandingFallback } from "./shared/fallback";
import type { SharedLandingContent } from "./shared/schema";

export type LandingTemplateMeta = {
  id: LandingTemplateId;
  name: string;
  description: string;
};

export const LANDING_TEMPLATES: LandingTemplateMeta[] = [
  {
    id: "neon-curve",
    name: "Neon Curve",
    description: "Acid lime + magenta memecoin landing with bonding terminal",
  },
  {
    id: "signal-stack",
    name: "Signal Stack",
    description: "Cold CT terminal desk — blotter, tickers, no glow",
  },
  {
    id: "arcade-dump",
    name: "Arcade Dump",
    description: "16-bit CRT coin-op with high-score energy",
  },
  {
    id: "cult-chapel",
    name: "Cult Chapel",
    description: "Occult meme congregation — gothic, ritual, lore-first",
  },
  {
    id: "street-sticker",
    name: "Street Sticker",
    description: "Graffiti / sticker-bomb hype wall",
  },
];

export function getLandingTemplateMeta(
  id: string,
): LandingTemplateMeta | undefined {
  return LANDING_TEMPLATES.find((t) => t.id === id);
}

export type LandingTemplateContent = SharedLandingContent;

export function getLandingFallback(
  _templateId: LandingTemplateId,
  tokenName: string,
  ticker: string,
): LandingTemplateContent {
  return getSharedLandingFallback(tokenName, ticker);
}
