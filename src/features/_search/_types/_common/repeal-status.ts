import { z } from "zod";

const repealStatusList = [
  "None",
  "Repeal",
  "Expire",
  "Suspend",
  "LossOfEffectiveness",
] as const;

const repealStatusListLabel = [
  "廃止・失効等の状態はない",
  "廃止",
  "失効",
  "停止",
  "実効性喪失",
] as const;

export const repealStatusListMap = repealStatusList.map(
  (repealStatus, index) => ({
    label: repealStatusListLabel[index],
    value: repealStatus,
  }),
);

/**
 * 廃止等の状態を指す。
 * - None: 廃止・失効等の状態はない
 * - Repeal: 廃止
 * - Expire: 失効
 * - Suspend: 停止
 * - LossOfEffectiveness: 実効性喪失
 */
export const RepealStatusSchema = z.enum(repealStatusList);
