type BackgroundProps = {
  /** Pause decorative animations during heavy work (e.g. API wait). */
  paused?: boolean;
};

export function Background({ paused = false }: BackgroundProps) {
  const driftClass = paused ? "" : "animate-glow-drift";
  const gridClass = paused ? "opacity-40" : "animate-grid-pulse opacity-40";

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-black" />
      <div
        className={`absolute -left-[20%] top-[10%] h-[420px] w-[420px] rounded-full bg-violet-600/20 blur-[120px] ${driftClass}`}
      />
      <div
        className={`absolute -right-[15%] top-[35%] h-[380px] w-[380px] rounded-full bg-cyan-500/10 blur-[110px] ${driftClass}`}
        style={paused ? undefined : { animationDelay: "-4s" }}
      />
      <div
        className={`absolute bottom-0 left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-violet-500/10 blur-[100px] ${driftClass}`}
        style={paused ? undefined : { animationDelay: "-7s" }}
      />
      <div
        className={`absolute inset-0 ${gridClass}`}
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 30%, black 20%, transparent 75%)",
        }}
      />
    </div>
  );
}
