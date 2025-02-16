import { z } from "zod";
import { AmendmentTypeSchema } from "./amendment-type";
import { CurrentRevisionStatusSchema } from "./current-revision-status";
import { LawTypeSchema } from "./law-type";
import { MissionSchema } from "./mission";
import { RepealStatusSchema } from "./repeal-status";

export const RevisionInfoSchema = z.object({
  law_revision_id: z.string(),
  law_type: LawTypeSchema,
  law_title: z.string(),
  law_title_kana: z.string(),
  abbrev: z.string(),
  category: z.string(),
  updated: z.string().datetime(),
  amendment_promulgate_date: z.string().date(),
  amendment_enforcement_date: z.string().date(),
  amendment_enforcement_comment: z.string(),
  amendment_scheduled_enforcement_date: z.string().date(),
  amendment_law_id: z.string(),
  amendment_law_title: z.string(),
  amendment_law_title_kana: z.string(),
  amendment_law_num: z.string(),
  amendment_type: AmendmentTypeSchema,
  repeal_status: RepealStatusSchema,
  repeal_date: z.string().date().nullable(),
  remain_in_force: z.boolean().nullable(),
  mission: MissionSchema,
  current_revision_status: CurrentRevisionStatusSchema,
});
