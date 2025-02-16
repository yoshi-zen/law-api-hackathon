import { z } from "zod";

/**
 * 法令の種別を指す。
 * - Constitution: 憲法
 * - Act: 法律
 * - CabinetOrder: 政令
 * - ImperialOrder: 詔勅・勅令
 * - MinisterialOrdinance: 府省令
 * - Rule: 規則
 * - Misc: その他
 */
export const LawTypeSchema = z.enum([
  "Constitution",
  "Act",
  "CabinetOrder",
  "ImperialOrder",
  "MinisterialOrdinance",
  "Rule",
  "Misc",
]);

export type LawTypeType = z.infer<typeof LawTypeSchema>;
