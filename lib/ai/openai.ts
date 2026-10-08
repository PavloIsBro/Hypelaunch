import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { getOpenAiApiKey, getOpenAiModel } from "./config";
import type { GenerateStructuredInput, GenerateStructuredResult } from "./types";

export async function generateStructuredOpenAI<T>(
  input: GenerateStructuredInput<T>,
): Promise<GenerateStructuredResult<T>> {
  const apiKey = getOpenAiApiKey();
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured.");
  }

  const openai = new OpenAI({ apiKey });
  const completion = await openai.beta.chat.completions.parse({
    model: getOpenAiModel(),
    temperature: input.temperature ?? 0.7,
    messages: input.messages,
    response_format: zodResponseFormat(input.schema, input.schemaName),
  });

  const parsed = completion.choices[0]?.message?.parsed;
  if (!parsed) {
    throw new Error("Empty OpenAI model response");
  }

  return { data: parsed, provider: "openai" };
}
