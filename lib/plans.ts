import type { PaidPlan } from "@/lib/types";
import { getExtraPriceSol, getProPriceSol } from "@/lib/solana-env";

export type PlanId = "free" | PaidPlan;

export type PricingPlanMeta = {
  id: PlanId;
  label: string;
  priceLabel: string;
  badge?: { text: string; variant: "popular" | "advanced" };
  bullets: string[];
};

export const PRICING_PLANS: PricingPlanMeta[] = [
  {
    id: "free",
    label: "Free",
    priceLabel: "0 SOL",
    bullets: [
      "Limited preview: name, ticker, teaser narrative",
      "Interest Score + Launch Readiness Score",
      "Upgrade anytime to unlock the full kit",
    ],
  },
  {
    id: "pro",
    label: "Pro",
    priceLabel: `${getProPriceSol()} SOL`,
    badge: { text: "Popular", variant: "popular" },
    bullets: [
      "Full narrative, market & competitor memecoin analysis",
      "X content strategy + growth playbook",
      "Launch Readiness + Interest scores (full report)",
    ],
  },
  {
    id: "extra",
    label: "Extra",
    priceLabel: `${getExtraPriceSol()} SOL`,
    badge: { text: "Advanced", variant: "advanced" },
    bullets: [
      "Everything in Pro",
      "AI-style landing page, Telegram Q&A, launch content plan",
      "Optional X / Telegram automation add-ons at checkout",
    ],
  },
];
