export type AutomationAddonId = "x" | "telegram";

export type AutomationAddonMeta = {
  id: AutomationAddonId;
  label: string;
  priceSol: number;
  description: string;
};

export const AUTOMATION_ADDON_PRICE_SOL = 0.1;

export const AUTOMATION_ADDONS: AutomationAddonMeta[] = [
  {
    id: "x",
    label: "X/Twitter Automation",
    priceSol: AUTOMATION_ADDON_PRICE_SOL,
    description: "Launch-window X monitoring, timing alerts, and signal-based posting cadence.",
  },
  {
    id: "telegram",
    label: "Telegram Automation",
    priceSol: AUTOMATION_ADDON_PRICE_SOL,
    description: "Community ops automation during launch — pins, alerts, and coordination flows.",
  },
];

export type PurchasedAddons = {
  x: boolean;
  telegram: boolean;
};

export const EMPTY_ADDONS: PurchasedAddons = { x: false, telegram: false };

export function addonsTotalSol(addons: PurchasedAddons): number {
  let total = 0;
  if (addons.x) total += AUTOMATION_ADDON_PRICE_SOL;
  if (addons.telegram) total += AUTOMATION_ADDON_PRICE_SOL;
  return total;
}
