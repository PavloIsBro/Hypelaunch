import Image from "next/image";

export function HeaderBrand() {
  return (
    <div className="animate-fade-up flex flex-col items-center gap-4">
      <span className="relative block h-20 w-20 overflow-hidden rounded-2xl border border-white/10 bg-black sm:h-24 sm:w-24">
        <Image
          src="/logo.png"
          alt="Hypelaunch"
          fill
          sizes="96px"
          className="object-cover object-center"
          priority
        />
      </span>
      <h1 className="text-gradient text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
        Hypelaunch
      </h1>
    </div>
  );
}
