import type { PurchasedAddons } from "@/lib/addons";
import type { PlanId } from "@/lib/plans";
import type { LaunchKitFull } from "@/lib/types";

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

  let data: GenerateApiResponse;
  try {
    data = (await res.json()) as GenerateApiResponse;
  } catch {
    throw new Error(`Server returned invalid JSON (status ${res.status}).`);
  }

  if (!res.ok) {
    throw new Error(data.error || `Request failed (${res.status}).`);
  }

  if (!data.kit) {
    throw new Error("No kit returned from server.");
  }

  return data;
}
