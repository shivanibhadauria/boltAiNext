import { GenAiCode } from "@/app/configs/AiModel";
import { NextResponse } from "next/server";

export async function POST(request) {
 
  const { prompt } = await request.json();

  try {
    const result = await GenAiCode.sendMessage(prompt);
    const AIresp = result.response.text();
    
    return NextResponse.json( JSON.parse(AIresp) );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
