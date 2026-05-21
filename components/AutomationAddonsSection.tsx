"use client";

import {
  AUTOMATION_ADDONS,
  AUTOMATION_ADDON_PRICE_SOL,
  type PurchasedAddons,
} from "@/lib/addons";

type AutomationAddonsSectionProps = {
  selected: PurchasedAddons;
  onChange: (addons: PurchasedAddons) => void;
  disabled?: boolean;
};

export function AutomationAddonsSection({
  selected,
  onChange,
  disabled,
}: AutomationAddonsSectionProps) {
  const toggle = (id: "x" | "telegram") => {
    onChange({ ...selected, [id]: !selected[id] });
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-white">Automation Add-ons</h4>
        <p className="mt-0.5 text-xs text-zinc-500">Optional — not included in Pro or Extra by default</p>
      </div>
      <ul className="space-y-3">
        {AUTOMATION_ADDONS.map((addon) => {
          const on = selected[addon.id];
          return (
            <li key={addon.id}>
              <label
                className={[
                  "flex cursor-pointer items-start gap-4 rounded-xl border p-4 transition",
                  on
                    ? "border-violet-500/35 bg-violet-500/10"
                    : "border-white/[0.06] bg-black/40 hover:border-white/12",
                  disabled ? "pointer-events-none opacity-50" : "",
                ].join(" ")}
              >
                <span className="relative mt-0.5 flex h-6 w-11 shrink-0 items-center">
                  <input
                    type="checkbox"
                    role="switch"
                    checked={on}
                    disabled={disabled}
                    onChange={() => toggle(addon.id)}
                    className="peer sr-only"
                  />
                  <span
                    aria-hidden
                    className="h-6 w-11 rounded-full bg-zinc-700 transition peer-checked:bg-violet-600"
                  />
                  <span
                    aria-hidden
                    className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition peer-checked:translate-x-5"
                  />
                </span>
                <span className="min-w-0 flex-1 text-left">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold text-white">{addon.label}</span>
                    <span className="font-mono text-xs font-medium text-violet-300">
                      +{AUTOMATION_ADDON_PRICE_SOL} SOL
                    </span>
                  </span>
                  <span className="mt-1 block text-xs leading-relaxed text-zinc-500">
                    {addon.description}
                  </span>
                </span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
