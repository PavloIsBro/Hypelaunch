import type { AiProviderId } from "./types";

const DEFAULT_OPENAI_MODEL = "gpt-4o-mini";
const DEFAULT_GEMINI_MODEL = "gemini-3.5-flash-lite";

export function getAiProvider(): AiProviderId {
  const explicit = process.env.AI_PROVIDER?.trim().toLowerCase();
  if (explicit === "openai" || explicit === "gemini") {
    return explicit;
  }
  return process.env.NODE_ENV === "development" ? "gemini" : "openai";
}

export function getOpenAiApiKey(): string | undefined {
  return process.env.OPENAI_API_KEY?.trim() || undefined;
}

export function getOpenAiModel(): string {
  return process.env.OPENAI_MODEL?.trim() || DEFAULT_OPENAI_MODEL;
}

export function getGeminiApiKey(): string | undefined {
  return process.env.GOOGLE_AI_API_KEY?.trim() || undefined;
}

export function getGeminiModel(): string {
  return process.env.GOOGLE_AI_MODEL?.trim() || DEFAULT_GEMINI_MODEL;
}

export function isAiConfigured(): boolean {
  const provider = getAiProvider();
  if (provider === "openai") return Boolean(getOpenAiApiKey());
  return Boolean(getGeminiApiKey());
}
