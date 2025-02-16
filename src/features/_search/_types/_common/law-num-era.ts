import { z } from "zod";

const eraList = ["Meiji", "Taisho", "Showa", "Heisei", "Reiwa"] as const;
const eraListJp = ["明治", "大正", "昭和", "平成", "令和"] as const;

export const eraMap = eraList.map((era, i) => ({
  ja: eraListJp[i],
  en: era,
}));

/**
 * 法令番号の元号を指す。
 * - Meiji: 明治
 * - Taisho: 大正
 * - Showa: 昭和
 * - Heisei: 平成
 * - Reiwa: 令和
 */
export const LawNumEraSchema = z.enum(eraList);
