import Image from "next/image";

export function HeaderBrand() {
  return (
    <>
      <div className="animate-fade-in mb-6 flex items-center justify-center gap-3">
        <span className="relative block h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-black">
          <Image
            src="/logo.png"
            alt="Hypelaunch"
            fill
            priority
            sizes="44px"
            className="object-cover object-center"
          />
        </span>
        <span className="font-mono text-xs uppercase tracking-[0.28em] text-zinc-500">
          hypelaunch.space
        </span>
      </div>

      <h1 className="animate-fade-up text-gradient text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
        Hypelaunch
      </h1>
    </>
  );
}
