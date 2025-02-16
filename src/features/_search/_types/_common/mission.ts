import { z } from "zod";

/**
 * 新規制定・一部改正を指す。
 */
export const MissionSchema = z.enum(["New", "Partial"]);

export type MissionType = z.infer<typeof MissionSchema>;
