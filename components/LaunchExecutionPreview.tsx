type LaunchExecutionPreviewProps = {
  body: string;
  className?: string;
};

export function LaunchExecutionPreview({ body, className = "" }: LaunchExecutionPreviewProps) {
  return (
    <section className={`glass-card rounded-2xl p-6 ${className}`}>
      <h2 className="text-sm font-semibold text-white">Launch execution layer</h2>
      <p className="mt-0.5 text-xs text-zinc-500">Pump.fun deploy window & coordination beats</p>
      <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-zinc-300">{body}</p>
    </section>
  );
}
