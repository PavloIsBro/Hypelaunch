import type { Metadata } from "next";
import Link from "next/link";
import { Background } from "@/components/Background";

export const metadata: Metadata = {
  title: "Docs — Hypelaunch",
  description: "How Hypelaunch works: launch kits, scores, plans, automation add-ons, and payments.",
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
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-400/90">
              Documentation
            </p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Hypelaunch Docs
            </h1>
            <p className="mt-3 max-w-xl text-sm text-zinc-500 sm:text-base">
              Step-by-step guide to turning one memecoin idea into a full launch kit.
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
            ["readiness", "Launch Readiness"],
            ["plans", "Plans"],
            ["addons", "Add-ons"],
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
              Hypelaunch is an AI-powered platform that turns{" "}
              <strong className="font-medium text-zinc-200">one idea</strong> into a complete
              memecoin launch kit. Instead of spending hours on narrative, content, and packaging,
              you start with a single prompt and get structured outputs ready to review and launch.
            </p>
          </DocSection>

          <DocSection id="how" title="2. How it works">
            <ol className="list-decimal space-y-2 pl-5">
              <li>Enter your memecoin idea in the app.</li>
              <li>
                Hypelaunch generates a launch kit including token name, ticker, narrative,
                positioning, X/Twitter content, Telegram structure, landing page preview, and launch
                strategy.
              </li>
              <li>
                Review your free preview, then unlock Pro or Extra for the full package. Optional
                automation add-ons can be added at checkout.
              </li>
            </ol>
          </DocSection>

          <DocSection id="interest" title="3. Interest Score">
            <p>
              The <strong className="font-medium text-sky-300">Interest Score</strong> estimates
              how much current attention exists around your narrative based on X/Twitter-style
              analysis. Higher scores suggest the meta or angle may already have momentum on the
              timeline — useful for timing and positioning, not as a guarantee of outcomes.
            </p>
          </DocSection>

          <DocSection id="readiness" title="4. Launch Readiness Score">
            <p>
              The <strong className="font-medium text-cyan-300">Launch Readiness Score</strong>{" "}
              reflects how prepared your project looks for launch: narrative clarity, content
              readiness, positioning, strategy, and packaging.
            </p>
            <p className="rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3 text-amber-200/90">
              This score is <strong>not</strong> a prediction of success or price action. It is a
              readiness checklist derived from your generated kit.
            </p>
          </DocSection>

          <DocSection id="plans" title="5. Plans">
            <div className="grid gap-3 sm:grid-cols-3">
              <article className="rounded-xl border border-white/[0.06] bg-black/40 p-4">
                <h3 className="font-semibold text-white">Free</h3>
                <p className="mt-2 text-sm text-zinc-500">
                  Basic idea check: limited preview with name, ticker, teaser narrative, and both
                  scores visible.
                </p>
              </article>
              <article className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                <h3 className="font-semibold text-emerald-300">Pro</h3>
                <p className="mt-2 text-sm text-zinc-500">
                  Full narrative, market analysis, competitor memecoin analysis, X content strategy,
                  tweets, growth playbook, and Launch Readiness context.
                </p>
              </article>
              <article className="rounded-xl border border-sky-500/25 bg-sky-500/10 p-4">
                <h3 className="font-semibold text-sky-300">Extra</h3>
                <p className="mt-2 text-sm text-zinc-500">
                  Everything in Pro plus landing page preview, Telegram Q&A, launch content plan,
                  and a stronger launch-ready package.
                </p>
              </article>
            </div>
          </DocSection>

          <DocSection id="addons" title="6. Automation Add-ons">
            <p>
              Social automation is <strong className="text-zinc-200">optional</strong> and not
              included in Pro or Extra by default.
            </p>
            <ul className="space-y-3">
              <li className="rounded-xl border border-sky-500/20 bg-sky-500/5 px-4 py-3">
                <span className="font-semibold text-sky-200">X/Twitter Automation</span>
                <span className="ml-2 font-mono text-xs text-sky-300/80">+0.1 SOL</span>
                <p className="mt-1 text-sm text-zinc-500">
                  Schedule and auto-post launch content for your memecoin campaign.
                </p>
              </li>
              <li className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 px-4 py-3">
                <span className="font-semibold text-cyan-200">Telegram Automation</span>
                <span className="ml-2 font-mono text-xs text-cyan-300/80">+0.1 SOL</span>
                <p className="mt-1 text-sm text-zinc-500">
                  Generate and automate community Q&A and launch updates.
                </p>
              </li>
            </ul>
          </DocSection>

          <DocSection id="payment" title="7. Payment flow">
            <ol className="list-decimal space-y-2 pl-5">
              <li>Select <strong className="text-zinc-200">Pro</strong> or{" "}
                <strong className="text-zinc-200">Extra</strong> from pricing.</li>
              <li>
                Optionally enable automation add-ons with toggles — total price updates in real
                time.
              </li>
              <li>Connect your Phantom wallet (Solana Wallet Adapter).</li>
              <li>
                Click <strong className="text-zinc-200">Buy for X SOL</strong> to complete checkout.
              </li>
              <li>
                For the current demo, payment confirmation is <strong className="text-zinc-200">mocked</strong>{" "}
                with a realistic transaction animation. No on-chain charge is sent yet.
              </li>
              <li>After confirmation, your plan and any add-ons unlock in the results view.</li>
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
