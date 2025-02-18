import { z } from "zod";

export const SchemaFetchLaws = z.object({
  law_id: z.string().nullish(),
  law_num: z.string().nullish(),
  law_num_num: z.string().nullish(),
  law_num_year: z.string().nullish(), // TODO: これはfetchのクエリにつけるときにnumberにする
  law_title: z.string().nullish(),
  law_title_kana: z
    .string()
    .regex(/^[ぁ-んー－]*$/, "ひらがなで入力してください")
    .nullish(),
  law_type: z.string().nullish(),
  amendment_law_id: z.string().nullish(),
  asof: z.string().date().nullish(),
  category_cd: z.string().nullish(),
  mission: z.string().nullish(),
  omit_current_revision_info: z.string().nullish(),
  promulgation_date_from: z.string().date().nullish(),
  promulgation_date_to: z.string().date().nullish(),
  repeal_status: z.string().nullish(),
  limit: z.string().nullish(),
  offset: z.string().nullish(),
});
