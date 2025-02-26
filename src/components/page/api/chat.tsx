import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "許可されていないメソッドです" });
  }
  try {
    const { messages, model, apiKey } = req.body;
    const keyToUse = apiKey || process.env.OPENAI_API_KEY;
    if (!keyToUse) {
      return res.status(400).json({ error: "API キーが指定されていません" });
    }

    // 新しい書き方: デフォルトエクスポートの OpenAI を使う
    const openai = new OpenAI({ apiKey: keyToUse });

    // ChatGPT の応答を取得 (新しい API 形式)
    const response = await openai.chat.completions.create({
      model: model || "gpt-3.5-turbo",
      messages,
    });

    res.status(200).json({ result: response.choices[0].message });
  } catch (error) {
    console.error("ChatGPT API エラー:", error);
    res.status(500).json({ error: "ChatGPT API の呼び出し中にエラーが発生しました" });
  }
}
