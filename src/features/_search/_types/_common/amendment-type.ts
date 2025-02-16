import z from "zod";

/**
 * 改正種別を指す。
 * 1: 新規
 * 3: 一部改正
 * 6: 全部改正
 * 8: 廃止
 */
export const AmendmentTypeSchema = z.enum(["1", "3", "6", "8"]);

export type AmendmentTypeType = z.infer<typeof AmendmentTypeSchema>;
