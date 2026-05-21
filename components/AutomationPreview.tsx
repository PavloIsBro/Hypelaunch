import type { PurchasedAddons } from "@/lib/addons";

type AutomationPreviewProps = {
  xPosting: string;
  telegramBot: string;
  enabled: PurchasedAddons;
  className?: string;
};

export function AutomationPreview({
  xPosting,
  telegramBot,
  enabled,
  className = "",
}: AutomationPreviewProps) {
  if (!enabled.x && !enabled.telegram) return null;

  return (
    <section className={`glass-card rounded-2xl p-6 ${className}`}>
      <h2 className="text-sm font-semibold text-white">Automation</h2>
      <p className="mt-0.5 text-xs text-zinc-500">Enabled add-ons for your launch kit</p>
      <div
        className={[
          "mt-5 grid gap-3",
          enabled.x && enabled.telegram ? "sm:grid-cols-2" : "grid-cols-1",
        ].join(" ")}
      >
        {enabled.x ? (
          <article className="rounded-xl border border-violet-500/20 bg-violet-500/5 px-4 py-4">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-violet-300/80">
              X/Twitter automation
            </p>
            <p className="mt-2 text-sm leading-relaxed text-zinc-300">{xPosting}</p>
          </article>
        ) : null}
        {enabled.telegram ? (
          <article className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 px-4 py-4">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-cyan-300/80">
              Telegram automation
            </p>
            <p className="mt-2 text-sm leading-relaxed text-zinc-300">{telegramBot}</p>
          </article>
        ) : null}
      </div>
    </section>
  );
}
