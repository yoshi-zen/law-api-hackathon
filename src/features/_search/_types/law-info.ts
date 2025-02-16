import { z } from "zod";
import { LawNumEraSchema } from "./law-num-era";
import { LawNumTypeSchema } from "./law-num-type";
import { LawTypeSchema } from "./law-type";

/**
 * 履歴に依存しない法令のメタ情報を指す。
 * - law_type: 法令の種別
 * - law_id: 法令ID
 * - law_num: 法令番号
 * - law_num_era: 法令番号の元号
 * - law_num_year: 法令番号の年
 * - law_num_type: 法令番号の法令種別
 * - law_num_num: 法令番号の号数
 * - promulgation_date: 公布日
 */
export const LawInfoSchema = z.object({
  law_type: LawTypeSchema,
  law_id: z.string(),
  law_num: z.string(),
  law_num_era: LawNumEraSchema,
  law_num_year: z.number(),
  law_num_type: LawNumTypeSchema,
  law_num_num: z.string(),
  promulgation_date: z.string().date(),
});

export type LawInfoType = z.infer<typeof LawInfoSchema>;
