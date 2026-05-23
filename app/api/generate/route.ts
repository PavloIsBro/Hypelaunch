import { NextResponse } from "next/server";
import { EMPTY_ADDONS, type PurchasedAddons } from "@/lib/addons";
import { generateLaunchKitWithOpenAI } from "@/lib/generate-launch-kit";
import type { PlanId } from "@/lib/plans";

export const runtime = "nodejs";

type GenerateBody = {
  idea?: string;
  plan?: PlanId;
  addons?: Partial<PurchasedAddons>;
};

function parseAddons(raw: Partial<PurchasedAddons> | undefined): PurchasedAddons {
  return {
    x: Boolean(raw?.x),
    telegram: Boolean(raw?.telegram),
  };
}

function parsePlan(raw: unknown): PlanId {
  if (raw === "pro" || raw === "extra" || raw === "free") return raw;
  return "free";
}

export async function POST(request: Request) {
  try {
    let body: GenerateBody;
    try {
      body = (await request.json()) as GenerateBody;
    } catch {
      return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
    }

    const idea = typeof body.idea === "string" ? body.idea.trim() : "";
    if (!idea) {
      return NextResponse.json({ error: "Memecoin idea is required." }, { status: 400 });
    }

    if (idea.length > 500) {
      return NextResponse.json(
        { error: "Idea is too long. Keep it under 500 characters." },
        { status: 400 },
      );
    }

    const plan = parsePlan(body.plan);
    const addons = parseAddons(body.addons ?? EMPTY_ADDONS);

    const { kit, source } = await generateLaunchKitWithOpenAI(idea, plan, addons);

    return NextResponse.json({
      kit,
      source,
      message:
        source === "fallback"
          ? "AI is temporarily unavailable. Showing a demo kit — try again shortly."
          : undefined,
    });
  } catch (error) {
    console.error("[api/generate]", error);
    return NextResponse.json(
      {
        error: "Something went wrong while generating your kit. Please try again.",
      },
      { status: 500 },
    );
  }
}
