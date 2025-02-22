// 図

import { z } from "zod";
import {
  lineSchema,
  rubySchema,
  stringSchema,
  subSchema,
  supSchema,
} from "./inline-element";
import { remarksSchema } from "./remark-supple";

/**
 * 図を表す要素です。
 */
export const figSchema = z.object({
  tag: z.literal("Fig"),
  attr: z.object({
    src: z.string(),
  }),
  children: z.array(z.never()).length(0),
});
export type Fig = z.infer<typeof figSchema>;

/**
 * 図項目名を表す要素です。
 */
export const figStructTitleSchema = z.object({
  tag: z.literal("FigStructTitle"),
  attr: z.object({}),
  children: z.array(
    z.union([lineSchema, rubySchema, supSchema, subSchema, stringSchema]),
  ),
});
export type FigStructTitle = z.infer<typeof figStructTitleSchema>;

/**
 * 図項目を表す要素です。
 */
export const figStructSchema = z.object({
  tag: z.literal("FigStruct"),
  attr: z.object({}),
  children: z.array(z.union([figStructTitleSchema, remarksSchema, figSchema])),
});
export type FigStruct = z.infer<typeof figStructSchema>;
