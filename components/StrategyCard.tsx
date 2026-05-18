type StrategyCardProps = {
  title: string;
  subtitle: string;
  body: string;
  className?: string;
};

export function StrategyCard({
  title,
  subtitle,
  body,
  className = "",
}: StrategyCardProps) {
  return (
    <section className={`glass-card rounded-2xl p-6 ${className}`}>
      <h2 className="text-sm font-semibold text-white">{title}</h2>
      <p className="mt-0.5 text-xs text-zinc-500">{subtitle}</p>
      <p className="mt-4 text-sm leading-relaxed text-zinc-300">{body}</p>
    </section>
  );
}
