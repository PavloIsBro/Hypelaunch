import type { z } from "zod";

export type AiMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export type AiProviderId = "openai" | "gemini";

export type GenerateStructuredInput<T> = {
  messages: AiMessage[];
  schema: z.ZodType<T>;
  schemaName: string;
  temperature?: number;
};

export type GenerateStructuredResult<T> = {
  data: T;
  provider: AiProviderId;
};

export type AiSource = AiProviderId | "fallback";
