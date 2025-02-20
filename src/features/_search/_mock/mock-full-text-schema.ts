import { z } from "zod";

export const MockFullTextSchema = z.object({
  // 法令本文。law_full_text_format と response_format が異なる場合は string 型、それ以外は object 型で返却
  law_full_text: z.union([z.string(), z.object({}).passthrough()]),
});

export type MockType = z.infer<typeof MockFullTextSchema>;
