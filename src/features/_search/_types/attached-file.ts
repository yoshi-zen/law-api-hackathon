import { z } from "zod";

/**
 * 添付ファイルの情報を指す。
 * law_revision_id: 法令ID
 * src: 法令XML中のFig要素のsrc属性
 * updated: 正誤等による更新日時
 */
export const AttachedFileSchema = z.object({
  law_revision_id: z.string(),
  src: z.string(),
  updated: z.string().datetime(),
});

export type AttachedFileSchema = z.infer<typeof AttachedFileSchema>;
