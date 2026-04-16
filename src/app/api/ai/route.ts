import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { messages, system } = await request.json();

    // To use real Anthropic API, provide ANTHROPIC_API_KEY in .env.local
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      // Mock response
      await new Promise(r => setTimeout(r, 1000));
      return NextResponse.json({
        content: [{ text: "This is a mock AI response. Please add an ANTHROPIC_API_KEY to your .env.local to enable real AI features." }]
      });
    }

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-3-5-sonnet-20240620",
        max_tokens: 1000,
        system: system || "You are a helpful career advisor.",
        messages: messages
      })
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error("Anthropic API Error: " + err);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
