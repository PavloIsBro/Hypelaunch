import type { LandingTemplateContent } from "@/lib/templates/registry";
import type { LandingTemplateId } from "@/lib/templates/types";

export type GenerateLandingRequestPayload = {
  idea: string;
  templateId: LandingTemplateId;
  tokenName: string;
  ticker: string;
};

export type GenerateLandingApiResponse = {
  content: LandingTemplateContent;
  source?: "openai" | "gemini" | "fallback";
  message?: string;
  error?: string;
};

export async function fetchLandingContent(
  payload: GenerateLandingRequestPayload,
  signal?: AbortSignal,
): Promise<GenerateLandingApiResponse> {
  const res = await fetch("/api/generate-landing", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
    signal,
    body: JSON.stringify(payload),
  });

  let data: GenerateLandingApiResponse;
  try {
    data = (await res.json()) as GenerateLandingApiResponse;
  } catch {
    throw new Error(`Server returned invalid JSON (status ${res.status}).`);
  }

  if (!res.ok) {
    throw new Error(data.error || `Request failed (${res.status}).`);
  }

  if (!data.content) {
    throw new Error("No landing content returned from server.");
  }

  return data;
}
