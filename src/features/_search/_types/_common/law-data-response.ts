import { z } from "zod";
import { AttachedFilesInfoSchema } from "./attached-files-info";
import { LawInfoSchema } from "./law-info";
import { RevisionInfoSchema } from "./revision-info";

/**
 * 法令フルテキストの再帰定義されたスキーマ
 * 遅延評価により表現
 */
const baseFullTextSchema = z.object({
  tag: z.string(),
  attr: z.object({}).passthrough(),
});

export type FullText = z.infer<typeof baseFullTextSchema> & {
  children?: Array<FullText | string>;
};

const fullTextSchema: z.ZodType<FullText> = baseFullTextSchema.extend({
  children: z.lazy(() => z.array(z.union([fullTextSchema, z.string()]))),
});

/**
 * 法令データのレスポンスを指す。
 * - attached_file_info: 添付ファイル情報
 * - law_info: 法令情報
 * - revision_info: 改正情報
 * - law_full_text: 法令全文
 */
// export const LawDataResponseSchema = z.object({
//   attached_file_info: AttachedFilesInfoSchema.optional(),
//   law_info: LawInfoSchema,
//   revision_info: RevisionInfoSchema,
//   law_full_text: z.object({
//     tag: z.literal("Law"),
//     attr: z.object({
//       Era: LawNumEraSchema,
//       Year: z.string(),
//       Num: z.string(),
//       PromulgateMonth: z.string().nullish(),
//       PromulgateDay: z.string().nullish(),
//       LawType: LawTypeSchema,
//       Lang: z.enum(["ja", "en"]),
//     }),
//     children: z.tuple([
//       z.object({
//         tag: z.literal("LawNum"),
//         attr: z.object({}),
//         children: z.array(z.string()),
//       }),
//       z.object({
//         tag: z.literal("LawBody"),
//         attr: z.object({
//           Subject: z.string().nullish(),
//         }),
//         children: z.array(fullTextSchema),
//       }),
//     ]),
//   }),
// });

export const LawDataResponseSchema = z.object({
  attached_file_info: AttachedFilesInfoSchema.optional(),
  law_info: LawInfoSchema,
  revision_info: RevisionInfoSchema,
  law_full_text: z.object({
    tag: z.string(),
    attr: z.object({}).passthrough(),
    children: z.array(fullTextSchema),
  }),
});

export type LawDataResponseType = z.infer<typeof LawDataResponseSchema>;
