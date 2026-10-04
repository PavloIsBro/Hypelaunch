import type { PurchasedAddons } from "@/lib/addons";
import type { PlanId } from "@/lib/plans";
import type { LaunchKitFull, TwitterSignals } from "@/lib/types";

export type GenerateRequestPayload = {
  idea: string;
  selectedPlan: PlanId;
  automationAddons: PurchasedAddons;
};

export type GenerateApiResponse = {
  kit: LaunchKitFull;
  source?: "openai" | "fallback";
  message?: string;
  error?: string;
};

async function readJsonSafe<T>(res: Response): Promise<T | null> {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
}

export async function fetchLaunchKit(
  payload: GenerateRequestPayload,
  signal?: AbortSignal,
): Promise<GenerateApiResponse> {
  const res = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
    signal,
    body: JSON.stringify(payload),
  });

  const data = await readJsonSafe<GenerateApiResponse>(res);

  if (!res.ok) {
    if (res.status === 504) {
      throw new Error(
        "Server timed out (504). Try again — generation no longer waits for Twitter scrape.",
      );
    }
    throw new Error(data?.error || `Request failed (${res.status}).`);
  }

  if (!data?.kit) {
    throw new Error(
      res.status === 200
        ? "No kit returned from server."
        : `Server returned invalid JSON (status ${res.status}).`,
    );
  }

  return data;
}

type TwitterStartResponse = {
  status?: "RUNNING" | "FAILED" | "READY";
  runId?: string;
  keywords?: string[];
  idea?: string;
  signals?: TwitterSignals;
  error?: string;
};

type TwitterPollResponse = {
  status?: "RUNNING" | "FAILED" | "READY";
  signals?: TwitterSignals;
  error?: string;
};

/** Start Apify scrape (fast) then poll until READY/FAILED or timeout. */
export async function fetchTwitterSignalsLive(
  idea: string,
  signal?: AbortSignal,
  onUpdate?: (signals: TwitterSignals) => void,
): Promise<TwitterSignals | null> {
  const startRes = await fetch("/api/twitter-signals", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
    signal,
    body: JSON.stringify({ action: "start", idea }),
  });

  const startData = await readJsonSafe<TwitterStartResponse>(startRes);
  if (!startRes.ok) {
    throw new Error(startData?.error || `Twitter start failed (${startRes.status}).`);
  }

  if (startData?.signals) {
    onUpdate?.(startData.signals);
    return startData.signals;
  }

  const runId = startData?.runId;
  const keywords = startData?.keywords ?? [];
  if (!runId) {
    return null;
  }

  const startedAt = Date.now();
  const maxWaitMs = 90_000;

  while (Date.now() - startedAt < maxWaitMs) {
    if (signal?.aborted) {
      throw new DOMException("Aborted", "AbortError");
    }

    await new Promise((r) => setTimeout(r, 2000));

    const pollRes = await fetch("/api/twitter-signals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      signal,
      body: JSON.stringify({ action: "poll", runId, keywords, idea }),
    });

    const pollData = await readJsonSafe<TwitterPollResponse>(pollRes);
    if (!pollRes.ok) {
      throw new Error(pollData?.error || `Twitter poll failed (${pollRes.status}).`);
    }

    if (pollData?.status === "READY" || pollData?.status === "FAILED") {
      if (pollData.signals) onUpdate?.(pollData.signals);
      return pollData.signals ?? null;
    }
  }

  return null;
}
