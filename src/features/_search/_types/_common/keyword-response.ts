import { z } from "zod";
import { elmSchema } from "./elm";
import { LawInfoSchema } from "./law-info";
import { RevisionInfoSchema } from "./revision-info";

/**
 * キーワード検索結果を指す。
 * - total_count: 検索結果の総数
 * - sentence_count: 検索結果の文数
 * - next_offset: 次の検索結果の開始位置
 * - items: 検索結果のリスト
 */
export const KeywordResponseSchema = z.object({
  total_count: z.number(),
  sentence_count: z.number(),
  next_offset: z.number().nullable(),
  items: z.array(
    z.object({
      law_info: LawInfoSchema,
      revision_info: RevisionInfoSchema,
      sentenses: z.array(
        z.object({
          position: elmSchema,
          text: z.string(),
        }),
      ),
    }),
  ),
});

export type KeywordResponseType = z.infer<typeof KeywordResponseSchema>;
