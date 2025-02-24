// pages/api/chat.ts
import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "許可されていないメソッドです" });
    return;
  }

  try {
    const { messages, model } = req.body;
    const selectedModel = model || "gpt-3.5-turbo";

    // SDK v4 では chat completions の呼び出しは以下のように行います
    const response = await openai.chat.completions.create({
      model: selectedModel,
      messages: messages,
    });

    // v4 では response.data ではなく、直接 response から取得可能です
    res.status(200).json({ result: response.choices[0].message });
  } catch (error) {
    console.error("ChatGPT API エラー:", error);
    res
      .status(500)
      .json({ error: "ChatGPT API の呼び出し中にエラーが発生しました" });
  }
}
