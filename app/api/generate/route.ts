import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

export const runtime = "nodejs";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: Request) {
  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: "Missing ANTHROPIC_API_KEY in .env.local" },
        { status: 500 }
      );
    }

    const { clientName, situation, tone, notes } = await req.json();

    if (!clientName || !situation || !tone) {
      return NextResponse.json(
        { error: "Missing required fields: clientName, situation, tone" },
        { status: 400 }
      );
    }

    const prompt = `
You are an expert agency account manager.

Write ONE professional follow-up email.

Inputs:
- Client name: ${clientName}
- Situation: ${situation}
- Tone: ${tone}
- Optional notes: ${notes || "(none)"}

Rules:
- Keep it concise (120-200 words).
- Include a subject line.
- Include one clear call-to-action.
- Be respectful, no guilt trips.
- If situation is "late invoice" or tone is "firm", include a polite payment link placeholder: {{PAYMENT_LINK}}.
- Output plain text only in this format:

Subject: ...
(blank line)
Email body...
`.trim();

    const msg = await anthropic.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 500,
      messages: [{ role: "user", content: prompt }],
    });

    const text = msg.content
      .filter((c) => c.type === "text")
      .map((c: any) => c.text)
      .join("\n")
      .trim();

    return NextResponse.json({ email: text });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Unknown error" },
      { status: 500 }
    );
  }
}


