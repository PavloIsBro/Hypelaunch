import type { LandingTemplateId } from "./types";
import { getNeonCurveFallback } from "./neon-curve/fallback";
import type { NeonCurveContent } from "./neon-curve/schema";

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
];

export function getLandingTemplateMeta(
  id: string,
): LandingTemplateMeta | undefined {
  return LANDING_TEMPLATES.find((t) => t.id === id);
}

export type LandingTemplateContent = NeonCurveContent;

export function getLandingFallback(
  templateId: LandingTemplateId,
  tokenName: string,
  ticker: string,
): LandingTemplateContent {
  switch (templateId) {
    case "neon-curve":
      return getNeonCurveFallback(tokenName, ticker);
    default: {
      const _exhaustive: never = templateId;
      return _exhaustive;
    }
  }
}
