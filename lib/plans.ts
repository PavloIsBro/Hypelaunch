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
    label: "Check",
    priceLabel: "0 SOL",
    bullets: [
      "Token name + ticker",
      "Short description & idea summary",
      "Interest Score based on X narratives",
    ],
  },
  {
    id: "pro",
    label: "Launch",
    priceLabel: `${getProPriceSol()} SOL`,
    badge: { text: "Popular", variant: "popular" },
    bullets: [
      "Full launch kit for your memecoin",
      "Image concept + landing with Customer journey map",
      "Interest Score + positioning & audience",
      "X & Telegram content + automation setup",
    ],
  },
  {
    id: "extra",
    label: "Extra",
    priceLabel: `${getExtraPriceSol()} SOL`,
    badge: { text: "Advanced", variant: "advanced" },
    bullets: [
      "Everything in Launch",
      "AI-generated landing page preview",
      "Launch execution layer",
      "Optional X / Telegram automation at checkout",
    ],
  },
];
