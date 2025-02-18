import { z } from "zod";
import { AmendmentTypeSchema } from "./amendment-type";
import { CurrentRevisionStatusSchema } from "./current-revision-status";
import { LawTypeSchema } from "./law-type";
import { MissionSchema } from "./mission";
import { RepealStatusSchema } from "./repeal-status";

export const RevisionInfoSchema = z.object({
  law_revision_id: z.string().nullable(),
  law_type: LawTypeSchema,
  law_title: z.string(),
  law_title_kana: z.string(),
  abbrev: z.string().nullable(), // TODO: 仕様書にはない仕様。なぜかnull。
  category: z.string(),
  updated: z
    .string()
    .refine(
      (val) =>
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}([+-]\d{2}:\d{2}|Z)?$/.test(val),
      "有効な日時形式ではありません",
    )
    .nullable(), // TODO: 仕様書にはない仕様。なぜかnull。
  amendment_promulgate_date: z.string().date(),
  amendment_enforcement_date: z.string().date(),
  amendment_enforcement_comment: z.string().nullable(), // TODO: 仕様書にはない仕様。なぜかnull。
  amendment_scheduled_enforcement_date: z.string().date().nullable(), // TODO: 仕様書にはない仕様。なぜかnull。
  amendment_law_id: z.string().nullable(), // TODO: 仕様書にはない仕様。なぜかnull。
  amendment_law_title: z.string().nullable(), // TODO: 仕様書にはない仕様。なぜかnull。
  amendment_law_title_kana: z.string().nullable(),
  amendment_law_num: z.string().nullable(), // TODO: 仕様書にはない仕様。なぜかnull。
  amendment_type: AmendmentTypeSchema,
  repeal_status: RepealStatusSchema,
  repeal_date: z.string().date().nullable(),
  remain_in_force: z.boolean().nullable(),
  mission: MissionSchema,
  current_revision_status: CurrentRevisionStatusSchema,
});
