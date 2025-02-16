import { z } from "zod";
import { LawInfoSchema } from "./law-info";
import { RevisionInfoSchema } from "./revision-info";

export const LawsResponseSchema = z.object({
  total_count: z.number(),
  count: z.number(),
  next_offset: z.number(),
  laws: z.array(
    z.object({
      law_info: LawInfoSchema,
      revision_info: RevisionInfoSchema,
      current_revision_info: RevisionInfoSchema,
    }),
  ),
});

export type LawsResponseType = z.infer<typeof LawsResponseSchema>;
