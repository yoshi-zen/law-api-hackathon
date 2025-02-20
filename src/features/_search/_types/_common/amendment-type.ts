import z from "zod";

const AmendmentTypeList = ["1", "3", "6", "8"] as const;
const AmendmentTypeListLabels = [
  "新規",
  "一部改正",
  "全部改正",
  "廃止",
] as const;

export const AmendmentTypeListMap = AmendmentTypeList.map((value, index) => ({
  value,
  label: AmendmentTypeListLabels[index],
}));

/**
 * 改正種別を指す。
 * 1: 新規
 * 3: 一部改正
 * 6: 全部改正
 * 8: 廃止
 */
export const AmendmentTypeSchema = z.enum(AmendmentTypeList);

export type AmendmentTypeType = z.infer<typeof AmendmentTypeSchema>;
