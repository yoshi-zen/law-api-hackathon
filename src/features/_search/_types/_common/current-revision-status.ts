import { z } from "zod";

/**
 * 現行改正状況を指す。
 * - CurrentEnforced: 現施行法令
 * - UnEnforced: 未施行法令
 * - PreviousEnforced: 過去施行法令
 * - Repeal: 廃止法令(廃止・失効・実効性喪失)
 */
export const CurrentRevisionStatusSchema = z.enum([
  "CurrentEnforced",
  "UnEnforced",
  "PreviousEnforced",
  "Repeal",
]);

export type CurrentRevisionStatusType = z.infer<
  typeof CurrentRevisionStatusSchema
>;
