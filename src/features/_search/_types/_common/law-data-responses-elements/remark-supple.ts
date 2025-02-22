// 備考・付記

import { z } from "zod";
import {
  lineSchema,
  rubySchema,
  stringSchema,
  subSchema,
  supSchema,
} from "./inline-element";
import { itemSchema } from "./item";
import { sentenseSchema } from "./sentence";

/**
 * 備考ラベルを表す要素です。
 */
export const remarksLabelSchema = z.object({
  tag: z.literal("RemarksLabel"),
  attr: z.object({
    LineBreak: z
      .union([z.literal("true"), z.literal("false"), z.boolean()])
      .nullish()
      .default("false"),
  }),
  children: z.array(
    z.union([lineSchema, rubySchema, supSchema, subSchema, stringSchema]),
  ),
});

/**
 * 備考を表す要素です。
 */
export const remarksSchema = z.object({
  tag: z.literal("Remarks"),
  attr: z.object({}),
  children: z.array(z.union([remarksLabelSchema, itemSchema, sentenseSchema])),
});
export type Remarks = z.infer<typeof remarksSchema>;

/**
 * 付記を表す要素です。道路交通法（昭和三十五年法律第百五号）の（罰則 〇〇〇〇）のために設けられた要素です。
 */
export const supplNoteSchema = z.object({
  tag: z.literal("SupplNote"),
  attr: z.object({}),
  children: z.array(
    z.union([lineSchema, rubySchema, supSchema, subSchema, stringSchema]),
  ),
});
export type SupplNote = z.infer<typeof supplNoteSchema>;
