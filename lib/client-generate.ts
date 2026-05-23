import type { PurchasedAddons } from "@/lib/addons";
import type { PlanId } from "@/lib/plans";
import type { LaunchKitFull } from "@/lib/types";

export type GenerateApiResponse = {
  kit: LaunchKitFull;
  source?: "openai" | "fallback";
  message?: string;
  error?: string;
};

export async function fetchLaunchKit(
  idea: string,
  plan: PlanId = "free",
  addons: PurchasedAddons = { x: false, telegram: false },
): Promise<GenerateApiResponse> {
  const res = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idea, plan, addons }),
  });

  const data = (await res.json()) as GenerateApiResponse;

  if (!res.ok) {
    throw new Error(data.error || "Failed to generate launch kit.");
  }

  if (!data.kit) {
    throw new Error("No kit returned from server.");
  }

  return data;
}
