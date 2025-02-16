import { z } from "zod";

/**
 * 指定した法令XMLの要素に該当する法令本文を取得することができる。
 */
export const elmSchema = z.string(); // TODO: もうちょっと強化したい。

export type ElmType = z.infer<typeof elmSchema>;
