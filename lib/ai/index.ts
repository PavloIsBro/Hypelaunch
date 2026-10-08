import { getAiProvider, isAiConfigured } from "./config";
import { generateStructuredGemini } from "./gemini";
import { generateStructuredOpenAI } from "./openai";
import type {
  AiMessage,
  AiProviderId,
  AiSource,
  GenerateStructuredInput,
  GenerateStructuredResult,
} from "./types";

export type {
  AiMessage,
  AiProviderId,
  AiSource,
  GenerateStructuredInput,
  GenerateStructuredResult,
};

export { getAiProvider, isAiConfigured };

/** Throws if the active provider has no API key or the call/parse fails. */
export async function generateStructured<T>(
  input: GenerateStructuredInput<T>,
): Promise<GenerateStructuredResult<T>> {
  const provider = getAiProvider();
  if (provider === "gemini") {
    return generateStructuredGemini(input);
  }
  return generateStructuredOpenAI(input);
}
