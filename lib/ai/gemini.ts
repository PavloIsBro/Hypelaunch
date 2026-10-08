import { GoogleGenerativeAI } from "@google/generative-ai";
import { zodToJsonSchema } from "zod-to-json-schema";
import type { z } from "zod";
import { getGeminiApiKey, getGeminiModel } from "./config";
import type { AiMessage, GenerateStructuredInput, GenerateStructuredResult } from "./types";

function sanitizeForGemini(node: unknown): unknown {
  if (Array.isArray(node)) {
    return node.map(sanitizeForGemini);
  }
  if (!node || typeof node !== "object") {
    return node;
  }

  const obj = node as Record<string, unknown>;
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (
      key === "$schema" ||
      key === "additionalProperties" ||
      key === "$ref" ||
      key === "definitions" ||
      key === "$defs" ||
      key === "default"
    ) {
      continue;
    }
    out[key] = sanitizeForGemini(value);
  }
  return out;
}

function toGeminiSchema(schema: z.ZodType, schemaName: string): Record<string, unknown> {
  const raw = zodToJsonSchema(schema, {
    name: schemaName,
    $refStrategy: "none",
  }) as Record<string, unknown>;

  const defs = (raw.definitions ?? raw.$defs) as Record<string, unknown> | undefined;
  const unwrapped = (defs?.[schemaName] as Record<string, unknown> | undefined) ?? raw;

  return sanitizeForGemini(unwrapped) as Record<string, unknown>;
}

function splitMessages(messages: AiMessage[]): { system: string; user: string } {
  const system = messages
    .filter((m) => m.role === "system")
    .map((m) => m.content)
    .join("\n\n");
  const user = messages
    .filter((m) => m.role !== "system")
    .map((m) => `${m.role === "assistant" ? "Assistant" : "User"}: ${m.content}`)
    .join("\n\n");
  return { system, user };
}

export async function generateStructuredGemini<T>(
  input: GenerateStructuredInput<T>,
): Promise<GenerateStructuredResult<T>> {
  const apiKey = getGeminiApiKey();
  if (!apiKey) {
    throw new Error("GOOGLE_AI_API_KEY is not configured.");
  }

  const { system, user } = splitMessages(input.messages);
  if (!user.trim()) {
    throw new Error("Gemini request requires a user message.");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: getGeminiModel(),
    systemInstruction: system || undefined,
    generationConfig: {
      temperature: input.temperature ?? 0.7,
      responseMimeType: "application/json",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      responseSchema: toGeminiSchema(input.schema, input.schemaName) as any,
    },
  });

  const result = await model.generateContent(user);
  const text = result.response.text();
  if (!text?.trim()) {
    throw new Error("Empty Gemini model response");
  }

  let json: unknown;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error("Gemini returned invalid JSON");
  }

  const data = input.schema.parse(json);
  return { data, provider: "gemini" };
}
