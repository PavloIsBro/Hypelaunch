import type { Metadata } from "next";
import Link from "next/link";
import { Background } from "@/components/Background";

export const metadata: Metadata = {
  title: "Docs — Hypelaunch",
  description:
    "How Hypelaunch works: Check preview, Launch kit, Interest Score, and payments.",
};

function DocSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="glass-card scroll-mt-24 rounded-2xl p-6 sm:p-8">
      <h2 className="text-lg font-bold tracking-tight text-white sm:text-xl">{title}</h2>
      <div className="mt-4 space-y-3 text-sm leading-relaxed text-zinc-400 sm:text-base">
        {children}
      </div>
    </section>
  );
}

export default function DocsPage() {
  return (
    <>
      <Background />
      <div className="relative z-10 mx-auto max-w-3xl px-5 pb-24 sm:px-8">
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Hypelaunch Docs
            </h1>
            <p className="mt-3 max-w-xl text-sm text-zinc-500 sm:text-base">
              AI-powered crypto launch workflow — from one idea to a ready memecoin launch kit.
            </p>
          </div>
          <Link
            href="/"
            className="btn-glow inline-flex shrink-0 items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-bold text-black transition hover:bg-zinc-200"
          >
            Back to App
          </Link>
        </div>

        <nav className="mb-8 flex flex-wrap gap-2 text-xs">
          {[
            ["what", "What"],
            ["how", "How it works"],
            ["interest", "Interest Score"],
            ["plans", "Check & Launch"],
            ["payment", "Payment"],
          ].map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-zinc-400 transition hover:border-sky-500/30 hover:text-sky-300"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="space-y-5">
          <DocSection id="what" title="1. What is Hypelaunch?">
            <p>
              Hypelaunch is an AI-powered{" "}
              <strong className="font-medium text-zinc-200">
                crypto launch workflow platform
              </strong>
              . You enter one idea and get a memecoin launch kit: name, ticker, narrative, Interest
              Score, and landing with Customer journey map.
            </p>
            <p className="rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3 text-amber-200/90">
              Current reports are{" "}
              <strong className="text-amber-100">AI-estimated previews</strong>. Live X data
              integrations are coming soon.
            </p>
          </DocSection>

          <DocSection id="how" title="2. How it works">
            <ol className="list-decimal space-y-2 pl-5">
              <li>Enter your memecoin idea.</li>
              <li>
                Choose <strong className="text-zinc-200">Check</strong> for a free preview or{" "}
                <strong className="text-zinc-200">Launch</strong> for the full paid kit (0.2 SOL).
              </li>
              <li>
                Use the kit to launch yourself on pump.fun or another deployer — Hypelaunch does not
                deploy the token for you.
              </li>
            </ol>
          </DocSection>

          <DocSection id="interest" title="3. Interest Score">
            <p>
              The <strong className="font-medium text-sky-300">Interest Score</strong> estimates
              how relevant your narrative looks right now based on X / CT attention. Higher scores
              suggest stronger timing — not a guarantee of outcomes.
            </p>
          </DocSection>

          <DocSection id="plans" title="4. Check & Launch">
            <div className="grid gap-3 sm:grid-cols-2">
              <article className="rounded-xl border border-white/[0.06] bg-black/40 p-4">
                <h3 className="font-semibold text-white">Check</h3>
                <p className="mt-2 text-sm text-zinc-500">
                  Free: token name, ticker, short description / idea, and Interest Score.
                </p>
              </article>
              <article className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                <h3 className="font-semibold text-emerald-300">Launch — 0.2 SOL</h3>
                <p className="mt-2 text-sm text-zinc-500">
                  Paid full launch kit: image concept, landing with Customer journey map,
                  positioning, and launch readiness.
                </p>
              </article>
            </div>
          </DocSection>

          <DocSection id="payment" title="5. Payment flow">
            <ol className="list-decimal space-y-2 pl-5">
              <li>
                Click <strong className="text-zinc-200">Launch</strong> or unlock Launch from
                pricing.
              </li>
              <li>Connect your Phantom wallet.</li>
              <li>
                Pay <strong className="text-zinc-200">0.2 SOL</strong> to unlock the full kit.
              </li>
              <li>
                For the current demo, payment is{" "}
                <strong className="text-zinc-200">mocked</strong>. No on-chain charge is sent yet.
              </li>
            </ol>
          </DocSection>
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            ← Back to App
          </Link>
        </div>
      </div>
    </>
  );
}
