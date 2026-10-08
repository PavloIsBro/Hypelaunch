export const LANDING_TEMPLATE_IDS = ["neon-curve"] as const;

export type LandingTemplateId = (typeof LANDING_TEMPLATE_IDS)[number];

export function isLandingTemplateId(value: string): value is LandingTemplateId {
  return (LANDING_TEMPLATE_IDS as readonly string[]).includes(value);
}
