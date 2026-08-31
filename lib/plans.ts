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
      "Basic idea check + narrative summary",
      "Limited Interest Score preview",
      "Upgrade for full Pump.fun market intelligence",
    ],
  },
  {
    id: "pro",
    label: "Pro",
    priceLabel: `${getProPriceSol()} SOL`,
    badge: { text: "Popular", variant: "popular" },
    bullets: [
      "Pump.fun narrative + competitor memecoin analysis",
      "Market saturation, timing signal, risk notes",
      "Interest Score + Launch Readiness (full report)",
      "Recommended positioning",
    ],
  },
  {
    id: "extra",
    label: "Extra",
    priceLabel: `${getExtraPriceSol()} SOL`,
    badge: { text: "Advanced", variant: "advanced" },
    bullets: [
      "Everything in Pro",
      "AI-generated landing page preview",
      "Launch execution layer",
      "Optional X / Telegram automation at checkout",
    ],
  },
];
