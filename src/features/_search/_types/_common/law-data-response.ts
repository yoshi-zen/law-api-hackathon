import { z } from "zod";
import { AttachedFilesInfoSchema } from "./attached-files-info";
import { LawInfoSchema } from "./law-info";
import { RevisionInfoSchema } from "./revision-info";

/**
 * 法令データのレスポンスを指す。
 * - attached_file_info: 添付ファイル情報
 * - law_info: 法令情報
 * - revision_info: 改正情報
 * - law_full_text: 法令全文
 */
export const LawDataResponseSchema = z.object({
  attached_file_info: AttachedFilesInfoSchema,
  law_info: LawInfoSchema,
  revision_info: RevisionInfoSchema,
  law_full_text: z.object({}).passthrough(), // TODO: もう少し強めたいが、どんなオブジェクトでも入るようにした
});

export type LawDataResponseType = z.infer<typeof LawDataResponseSchema>;
