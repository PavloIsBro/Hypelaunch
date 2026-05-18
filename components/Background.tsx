export function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-black" />
      <div className="absolute -left-[20%] top-[10%] h-[420px] w-[420px] animate-glow-drift rounded-full bg-violet-600/20 blur-[120px]" />
      <div
        className="absolute -right-[15%] top-[35%] h-[380px] w-[380px] animate-glow-drift rounded-full bg-cyan-500/10 blur-[110px]"
        style={{ animationDelay: "-4s" }}
      />
      <div
        className="absolute bottom-0 left-1/2 h-[300px] w-[600px] -translate-x-1/2 animate-glow-drift rounded-full bg-violet-500/10 blur-[100px]"
        style={{ animationDelay: "-7s" }}
      />
      <div
        className="absolute inset-0 animate-grid-pulse opacity-40"
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
