import { chatSession } from "@/app/configs/AiModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { prompt } = await request.json();

  try {
    const result = await chatSession.sendMessage(prompt);
    const AIresp = result.response.text();
    return NextResponse.json({ result: AIresp });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
