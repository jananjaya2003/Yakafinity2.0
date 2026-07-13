import { NextResponse } from "next/server";
import { z } from "zod";

const imageSchema = z.object({
  mimeType: z.enum(["image/jpeg", "image/png", "image/webp", "image/gif"]),
  data: z.string().max(10_000_000),
}).optional();

const schema = z.object({
  message: z.string().trim().min(1).max(4000),
  image: imageSchema,
});

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "your-gemini-api-key") {
      return NextResponse.json({ error: "Gemini is not configured." }, { status: 503 });
    }

    const { message, image } = schema.parse(await request.json());
    const parts: Array<Record<string, unknown>> = [{ text: message }];
    if (image) parts.unshift({ inlineData: { mimeType: image.mimeType, data: image.data } });

    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: "You are Yakafinity AI, a concise and helpful digital innovation assistant. Answer clearly, help with technology, design, business, and uploaded-image questions. Never claim an action was completed when it was not." }] },
        contents: [{ role: "user", parts }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 1200 },
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      console.error("Gemini API error", response.status, data?.error?.message);
      return NextResponse.json({ error: "Gemini could not complete that request." }, { status: 502 });
    }

    const answer = data?.candidates?.[0]?.content?.parts?.map((part: { text?: string }) => part.text || "").join("").trim();
    if (!answer) return NextResponse.json({ error: "Gemini returned no answer." }, { status: 502 });
    return NextResponse.json({ answer });
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: "Invalid AI request." }, { status: 400 });
    console.error(error);
    return NextResponse.json({ error: "Unable to process the AI request." }, { status: 500 });
  }
}
