import type { PurchasedAddons } from "@/lib/addons";

export function PurchasedAddonsBadges({ addons }: { addons: PurchasedAddons }) {
  if (!addons.x && !addons.telegram) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {addons.x ? (
        <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-violet-200">
          X automation
        </span>
      ) : null}
      {addons.telegram ? (
        <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-cyan-200">
          Telegram automation
        </span>
      ) : null}
    </div>
  );
}
