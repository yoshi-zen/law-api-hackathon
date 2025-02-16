import { z } from "zod";

/**
 * 廃止等の状態を指す。
 * - None: 廃止・失効等の状態はない
 * - Repeal: 廃止
 * - Expire: 失効
 * - Suspend: 停止
 * - LossOfEffectiveness: 実効性喪失
 */
export const RepealStatusSchema = z.enum([
  "None",
  "Repeal",
  "Expire",
  "Suspend",
  "LossOfEffectiveness",
]);
