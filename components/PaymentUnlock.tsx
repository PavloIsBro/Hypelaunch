"use client";

import { AutomationAddonsSection } from "@/components/AutomationAddonsSection";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  addonsTotalSol,
  AUTOMATION_ADDON_PRICE_SOL,
  EMPTY_ADDONS,
  type PurchasedAddons,
} from "@/lib/addons";
import { getExtraPriceSol, getProPriceSol } from "@/lib/solana-env";
import type { PaidPlan } from "@/lib/types";

type PaymentUnlockProps = {
  targetPlan: PaidPlan;
  unlocked: null | PaidPlan;
  onUnlocked: (plan: PaidPlan, addons: PurchasedAddons) => void;
};

type MockStage = "preparing" | "connecting" | "confirming" | "confirmed";

const MOCK_STAGES: { id: MockStage; label: string; ms: number }[] = [
  { id: "preparing", label: "Preparing transaction…", ms: 850 },
  { id: "connecting", label: "Connecting to Solana…", ms: 900 },
  { id: "confirming", label: "Confirming payment…", ms: 950 },
];

function shortenAddress(address: string): string {
  return `${address.slice(0, 4)}…${address.slice(-4)}`;
}

export function PaymentUnlock({ targetPlan, unlocked, onUnlocked }: PaymentUnlockProps) {
  const wallet = useWallet();
  const { setVisible } = useWalletModal();
  const openedModalRef = useRef(false);

  const [stage, setStage] = useState<MockStage | null>(null);
  const [processing, setProcessing] = useState(false);
  const [addonSelection, setAddonSelection] = useState<PurchasedAddons>(EMPTY_ADDONS);

  const proSol = getProPriceSol();
  const extraSol = getExtraPriceSol();
  const planLabel = targetPlan === "pro" ? "Pro" : "Extra";

  const planBaseSol = useMemo(() => {
    if (unlocked === "pro" && targetPlan === "extra") {
      return Math.max(0, extraSol - proSol);
    }
    return targetPlan === "pro" ? proSol : extraSol;
  }, [extraSol, proSol, targetPlan, unlocked]);

  const addonsSol = addonsTotalSol(addonSelection);
  const totalSol = planBaseSol + addonsSol;

  const alreadyUnlocked =
    (targetPlan === "pro" && (unlocked === "pro" || unlocked === "extra")) ||
    (targetPlan === "extra" && unlocked === "extra");

  useEffect(() => {
    openedModalRef.current = false;
    setStage(null);
    setProcessing(false);
    setAddonSelection(EMPTY_ADDONS);
  }, [targetPlan]);

  useEffect(() => {
    if (alreadyUnlocked || processing || wallet.connected) return;
    if (openedModalRef.current) return;
    openedModalRef.current = true;
    const t = window.setTimeout(() => setVisible(true), 280);
    return () => window.clearTimeout(t);
  }, [alreadyUnlocked, processing, setVisible, targetPlan, wallet.connected]);

  const runMockPayment = useCallback(async () => {
    if (!wallet.connected) {
      setVisible(true);
      return;
    }

    setProcessing(true);
    setStage("preparing");

    for (const step of MOCK_STAGES) {
      setStage(step.id);
      await new Promise((r) => window.setTimeout(r, step.ms));
    }

    setStage("confirmed");
    await new Promise((r) => window.setTimeout(r, 700));
    onUnlocked(targetPlan, { ...addonSelection });
  }, [addonSelection, onUnlocked, setVisible, targetPlan, wallet.connected]);

  if (alreadyUnlocked) {
    return (
      <div className="glass-card rounded-2xl border border-emerald-500/25 bg-emerald-500/5 p-5 text-center text-sm text-emerald-200/90">
        {planLabel} is already unlocked.
      </div>
    );
  }

  const stageIndex = stage
    ? stage === "confirmed"
      ? MOCK_STAGES.length
      : MOCK_STAGES.findIndex((s) => s.id === stage)
    : -1;
  const progressPct =
    stage === "confirmed"
      ? 100
      : stageIndex >= 0
        ? ((stageIndex + 0.55) / MOCK_STAGES.length) * 100
        : 0;

  return (
    <div className="glass-card animate-fade-up overflow-hidden rounded-2xl">
      <div className="border-b border-white/5 bg-gradient-to-r from-violet-950/40 via-black/20 to-cyan-950/30 px-6 py-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-violet-300/70">
          Secure checkout
        </p>
        <h3 className="mt-1 text-lg font-bold text-white">Unlock {planLabel}</h3>
        <p className="mt-1 text-xs text-zinc-500">
          Demo payment — Phantom connect is real; no SOL is charged yet.
        </p>
      </div>

      <div className="p-6">
        {!wallet.connected && !processing ? (
          <div className="flex flex-col items-center gap-5 py-4 text-center">
            <div className="relative flex h-16 w-16 items-center justify-center">
              <span className="absolute inset-0 animate-pulse-ring rounded-2xl bg-violet-500/15" />
              <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-black/60 text-2xl">
                👻
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-white">Connect Phantom wallet</p>
              <p className="mt-1 max-w-sm text-xs text-zinc-500">
                Connect your wallet, then choose optional automation add-ons.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setVisible(true)}
              className="rounded-xl bg-white px-6 py-3 text-sm font-bold text-black transition hover:bg-zinc-200"
            >
              Connect wallet
            </button>
          </div>
        ) : null}

        {wallet.connected && !processing && stage !== "confirmed" ? (
          <div className="animate-fade-in space-y-5">
            <div className="flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-sm">
                ✓
              </span>
              <div className="min-w-0 text-left">
                <p className="text-xs font-semibold text-emerald-300">Wallet connected</p>
                <p className="truncate font-mono text-[11px] text-zinc-400">
                  {wallet.publicKey ? shortenAddress(wallet.publicKey.toBase58()) : "Phantom"}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
              <p className="text-xs uppercase tracking-wider text-zinc-500">Order summary</p>
              <p className="mt-1 text-xl font-bold text-white">{planLabel} plan</p>

              <ul className="mt-4 space-y-2 border-t border-white/5 pt-4 text-sm">
                <li className="flex justify-between text-zinc-400">
                  <span>{planLabel}</span>
                  <span className="font-mono text-zinc-300">{planBaseSol.toFixed(2)} SOL</span>
                </li>
                {addonSelection.x ? (
                  <li className="flex justify-between text-zinc-400">
                    <span>X/Twitter Automation</span>
                    <span className="font-mono text-violet-300/90">
                      +{AUTOMATION_ADDON_PRICE_SOL.toFixed(2)} SOL
                    </span>
                  </li>
                ) : null}
                {addonSelection.telegram ? (
                  <li className="flex justify-between text-zinc-400">
                    <span>Telegram Automation</span>
                    <span className="font-mono text-violet-300/90">
                      +{AUTOMATION_ADDON_PRICE_SOL.toFixed(2)} SOL
                    </span>
                  </li>
                ) : null}
                <li className="flex justify-between border-t border-white/5 pt-3 font-semibold text-white">
                  <span>Total</span>
                  <span className="font-mono text-xl text-violet-300">
                    {totalSol.toFixed(2)} SOL
                  </span>
                </li>
              </ul>
            </div>

            <AutomationAddonsSection
              selected={addonSelection}
              onChange={setAddonSelection}
              disabled={processing}
            />

            <div className="flex gap-2 text-[11px] text-zinc-500">
              <span className="rounded-full border border-white/10 px-2 py-0.5">Solana devnet</span>
              <span className="rounded-full border border-white/10 px-2 py-0.5">Mock tx</span>
            </div>

            <button
              type="button"
              onClick={runMockPayment}
              className="btn-glow w-full rounded-xl bg-white py-3.5 text-sm font-bold text-black transition hover:scale-[1.01] active:scale-[0.99]"
            >
              Buy for {totalSol.toFixed(2)} SOL
            </button>
          </div>
        ) : null}

        {processing ? (
          <div className="animate-fade-in space-y-6 py-2">
            <div className="relative mx-auto flex h-20 w-20 items-center justify-center">
              <span className="absolute inset-0 animate-spin-slow rounded-full border border-t-violet-400 border-r-transparent border-b-cyan-400/40 border-l-transparent" />
              <span className="absolute inset-2 animate-pulse-ring rounded-full bg-violet-500/10" />
              <span className="relative text-lg font-bold text-white">◎</span>
            </div>

            <div className="space-y-2">
              <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 transition-all duration-500 ease-out"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <p className="text-center text-sm font-medium text-white">
                {stage === "confirmed"
                  ? "Payment confirmed"
                  : MOCK_STAGES.find((s) => s.id === stage)?.label ?? "Processing…"}
              </p>
              {stage !== "confirmed" ? (
                <p className="text-center font-mono text-xs text-zinc-500">
                  Total: {totalSol.toFixed(2)} SOL
                </p>
              ) : null}
            </div>

            <ul className="space-y-2">
              {MOCK_STAGES.map((step, i) => {
                const complete = stage === "confirmed" || stageIndex > i;
                const active = stage === step.id && stage !== "confirmed";

                return (
                  <li
                    key={step.id}
                    className={[
                      "flex items-center gap-3 rounded-lg border px-3 py-2 text-xs transition",
                      complete
                        ? "border-emerald-500/25 bg-emerald-500/5 text-emerald-200/90"
                        : active
                          ? "border-violet-500/30 bg-violet-500/10 text-white"
                          : "border-white/5 bg-black/30 text-zinc-600",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold",
                        complete
                          ? "bg-emerald-500/30 text-emerald-200"
                          : active
                            ? "bg-violet-500/40 text-white"
                            : "bg-white/5 text-zinc-600",
                      ].join(" ")}
                    >
                      {complete ? "✓" : i + 1}
                    </span>
                    {step.label.replace("…", "")}
                  </li>
                );
              })}
            </ul>

            {stage === "confirmed" ? (
              <p className="text-center text-sm font-semibold text-emerald-400">
                Payment confirmed — unlocking {planLabel}
                {addonsSol > 0 ? " + add-ons" : ""}…
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
