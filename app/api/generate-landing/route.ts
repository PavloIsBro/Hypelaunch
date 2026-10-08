import { NextResponse } from "next/server";
import { generateLandingContent } from "@/lib/generate-landing";
import { isLandingTemplateId } from "@/lib/templates/types";

export const runtime = "nodejs";

type GenerateLandingBody = {
  idea?: string;
  templateId?: string;
  tokenName?: string;
  ticker?: string;
};

export async function POST(request: Request) {
  console.log("[api/generate-landing] POST received");

  try {
    let body: GenerateLandingBody;
    try {
      body = (await request.json()) as GenerateLandingBody;
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

    const templateId = typeof body.templateId === "string" ? body.templateId.trim() : "";
    if (!isLandingTemplateId(templateId)) {
      return NextResponse.json({ error: "Unknown landing template." }, { status: 400 });
    }

    const tokenName = typeof body.tokenName === "string" ? body.tokenName.trim() : "";
    const ticker = typeof body.ticker === "string" ? body.ticker.trim() : "";
    if (!tokenName || !ticker) {
      return NextResponse.json(
        { error: "tokenName and ticker are required." },
        { status: 400 },
      );
    }

    const { content, source, message } = await generateLandingContent(
      idea,
      templateId,
      tokenName,
      ticker,
    );

    console.log("[api/generate-landing] success", { source, templateId, ticker });

    return NextResponse.json({
      content,
      source,
      message:
        message ??
        (source === "fallback"
          ? "AI is temporarily unavailable. Showing a default landing preview."
          : undefined),
    });
  } catch (error) {
    console.error("[api/generate-landing]", error);
    return NextResponse.json(
      {
        error: "Something went wrong while generating your landing. Please try again.",
      },
      { status: 500 },
    );
  }
}
