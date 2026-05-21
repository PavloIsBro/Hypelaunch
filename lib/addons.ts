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
    description: "Schedule and auto-post launch content for your memecoin campaign.",
  },
  {
    id: "telegram",
    label: "Telegram Automation",
    priceSol: AUTOMATION_ADDON_PRICE_SOL,
    description: "Generate and automate community Q&A and launch updates.",
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
