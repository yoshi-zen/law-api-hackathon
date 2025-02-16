import { z } from "zod";

/**
 * エラー情報を指す。
 * code: エラーコード
 * message: エラーメッセージ
 */
export const ErrorInfoSchema = z.object({
  code: z.string(),
  message: z.string(),
});

export type ErrorInfoType = z.infer<typeof ErrorInfoSchema>;
