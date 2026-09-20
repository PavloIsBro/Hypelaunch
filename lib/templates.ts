export type LandingTemplateMeta = {
  id: string;
  name: string;
  description: string;
};

/** Temporary registry for template QA via the header dropdown. */
export const LANDING_TEMPLATES: LandingTemplateMeta[] = [
  {
    id: "neon-curve",
    name: "Neon Curve",
    description: "Acid lime + magenta memecoin landing with bonding terminal",
  },
];

export function getLandingTemplateMeta(id: string): LandingTemplateMeta | undefined {
  return LANDING_TEMPLATES.find((t) => t.id === id);
}
