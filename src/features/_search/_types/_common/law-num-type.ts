import { z } from "zod";

const lawNumTypeList = [
  "Constitution",
  "Act",
  "CabinetOrder",
  "ImperialOrder",
  "MinisterialOrdinance",
  "Rule",
  "Misc",
] as const;

const lawNumTypeListJp = [
  "憲法",
  "法律",
  "政令",
  "詔勅・勅令",
  "府省令",
  "規則",
  "その他",
];

export const lawNumTypeMap = lawNumTypeList.map((lawNumType, i) => ({
  ja: lawNumTypeListJp[i],
  en: lawNumType,
}));

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
export const LawNumTypeSchema = z.enum(lawNumTypeList);

export type LawNumTypeType = z.infer<typeof LawNumTypeSchema>;
