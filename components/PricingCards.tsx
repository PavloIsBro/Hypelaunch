import type { PaidPlan } from "@/lib/types";
import { PRICING_PLANS } from "@/lib/plans";

type PricingCardsProps = {
  unlocked: null | PaidPlan;
  selected: PaidPlan | null;
  onSelectPaid: (plan: PaidPlan) => void;
  disabled?: boolean;
};

export function PricingCards({
  unlocked,
  selected,
  onSelectPaid,
  disabled,
}: PricingCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {PRICING_PLANS.map((plan) => {
        const isFree = plan.id === "free";
        const isExtra = plan.id === "extra";
        const paidId = plan.id === "pro" || plan.id === "extra" ? plan.id : null;
        const isSelected = paidId && selected === paidId;
        const isCurrentTier =
          (isFree && !unlocked) ||
          (plan.id === "pro" && unlocked === "pro") ||
          (plan.id === "extra" && unlocked === "extra");

        return (
          <article
            key={plan.id}
            className={[
              "glass-card relative flex flex-col rounded-2xl p-6 transition",
              isSelected && "ring-1 ring-violet-500/50",
              isExtra && unlocked !== "extra" && "md:shadow-lg md:shadow-violet-950/40",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {plan.badge ? (
              <span
                className={[
                  "mb-3 inline-flex w-fit rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide",
                  plan.badge.variant === "popular" &&
                    "border-emerald-500/40 bg-emerald-500/15 text-emerald-300",
                  plan.badge.variant === "advanced" &&
                    "border-violet-400/40 bg-violet-500/20 text-violet-200",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {plan.badge.text}
              </span>
            ) : (
              <span className="mb-3 text-[10px] font-bold uppercase tracking-wide text-zinc-600">
                Starter
              </span>
            )}

            <h3 className="text-lg font-bold text-white">{plan.label}</h3>
            <p className="mt-1 font-mono text-sm text-violet-300/90">{plan.priceLabel}</p>

            <ul className="mt-4 flex flex-1 flex-col gap-2 text-sm leading-snug text-zinc-400">
              {plan.bullets.map((b) => (
                <li key={b} className="flex gap-2">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-zinc-600" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              {isFree ? (
                <p className="text-center text-xs text-zinc-500">
                  {isCurrentTier ? "You are viewing the free preview." : null}
                </p>
              ) : (
                <button
                  type="button"
                  disabled={
                    disabled ||
                    (plan.id === "pro" && unlocked === "pro") ||
                    (plan.id === "extra" && unlocked === "extra") ||
                    (plan.id === "pro" && unlocked === "extra")
                  }
                  onClick={() => onSelectPaid(plan.id as PaidPlan)}
                  className={[
                    "w-full rounded-xl py-3 text-sm font-semibold transition",
                    isExtra
                      ? "bg-gradient-to-r from-violet-600 to-violet-800 text-white hover:opacity-95"
                      : "border border-white/15 bg-white/5 text-white hover:bg-white/10",
                    isSelected && "ring-2 ring-white/20",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {plan.id === "pro" && unlocked === "extra"
                    ? "Included in Extra"
                    : unlocked === plan.id
                      ? "Unlocked"
                      : `Unlock ${plan.label}`}
                </button>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}
