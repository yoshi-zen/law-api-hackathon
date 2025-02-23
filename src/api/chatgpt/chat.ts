// pages/api/chat.ts
import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const configuration = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { messages } = req.body;
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo", // 使用するモデルを指定
        messages,
      });
      res.status(200).json({ result: response.choices[0].message });
    } catch (error) {
      console.error("ChatGPT API エラー:", error);
      res.status(500).json({
        error: "ChatGPT API の呼び出し中にエラーが発生しました",
      });
    }
  } else {
    res.status(405).json({ error: "許可されていないメソッドです" });
  }
}
