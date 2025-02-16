import { z } from "zod";

/**
 * 法令番号の元号を指す。
 * - Meiji: 明治
 * - Taisho: 大正
 * - Showa: 昭和
 * - Heisei: 平成
 * - Reiwa: 令和
 */
export const LawNumEraSchema = z.enum([
  "Meiji",
  "Taisho",
  "Showa",
  "Heisei",
  "Reiwa",
]);
