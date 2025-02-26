import { z } from "zod";
import { LawInfoSchema } from "./law-info";
import { RevisionInfoSchema } from "./revision-info";

/**
 * 法令の改正履歴のレスポンスを指す。
 * - law_info: 法令情報
 * - revisions: 改正情報
 */
export const LawRevisionsResponseSchema = z.object({
  law_info: LawInfoSchema,
  revisions: z.array(RevisionInfoSchema),
});
