import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: Request) {
  try {
    const { messages, model, apiKey } = await request.json();
    const keyToUse = apiKey;

    if (!keyToUse) {
      return NextResponse.json(
        { error: "API キーが指定されていません" },
        { status: 400 },
      );
    }

    const openai = new OpenAI({ apiKey: keyToUse });

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
    });

    return NextResponse.json({ result: response.choices[0].message });
  } catch (error) {
    console.error("ChatGPT API エラー:", error);
    return NextResponse.json(
      { error: "ChatGPT API の呼び出し中にエラーが発生しました" },
      { status: 500 },
    );
  }
}
