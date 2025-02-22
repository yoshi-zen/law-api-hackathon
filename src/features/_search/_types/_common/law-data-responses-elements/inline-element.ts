// インライン要素
import { z } from "zod";
import { arithFormulaSchema } from "./arithmetic";

/**
 * 改行を含む構造の引用を表す要素です。例えば、「図として捉える改正」などで使用されます。
 */
export const quoteStructSchema = z.object({
  tag: z.literal("QuoteStruct"),
  attr: z.object({}),
  children: z.array(z.any()),
});

/**
 * 文字列。
 */
export const stringSchema = z.string();

/**
 * ルビの部分を表す要素です。
 */
export const rtSchema = z.object({
  tag: z.literal("Rt"),
  attr: z.object({}),
  children: z.array(stringSchema),
});

/**
 * ルビ付きの文字列を表す要素です。
 */
export const rubySchema = z.object({
  tag: z.literal("Ruby"),
  attr: z.object({}),
  children: z.array(z.union([stringSchema, rtSchema])),
});

/**
 * 上付き文字を表す要素です。
 */
export const supSchema = z.object({
  tag: z.literal("Sup"),
  attr: z.object({}),
  children: z.array(stringSchema),
});

/**
 * 下付き文字を表す要素です。
 */
export const subSchema = z.object({
  tag: z.literal("Sub"),
  attr: z.object({}),
  children: z.array(stringSchema),
});

/**
 * 傍線を表す要素です。
 */
export const lineSchema = z.object({
  tag: z.literal("Line"),
  attr: z.object({
    Style: z.enum(["dotted", "double", "none", "solid"]).nullish(),
  }),
  children: z.array(
    z.union([
      quoteStructSchema,
      arithFormulaSchema,
      rubySchema,
      supSchema,
      subSchema,
      stringSchema,
    ]),
  ),
});
