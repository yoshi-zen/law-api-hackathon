// 項・号・号の細分

import { z } from "zod";
import { amendProvisionSchema } from "./amend";
import { figStructSchema } from "./figure";
import {
  lineSchema,
  rubySchema,
  stringSchema,
  subSchema,
  supSchema,
} from "./inline-element";
import { itemSchema } from "./item";
import { listSchema } from "./list";
import { styleStructSchema } from "./note";
import { columnSchema, sentenseSchema } from "./sentence";
import { tableSchema, tableStructSchema } from "./table";

/**
 * 項見出しを表す要素。
 */
export const paragraphCaptionSchema = z.object({
  tag: z.literal("ParagraphCaption"),
  attr: z.object({
    CommonCaption: z
      .union([z.literal("true"), z.literal("false")], z.boolean())
      .nullish(),
  }),
  children: z.array(
    z.union([lineSchema, rubySchema, supSchema, subSchema, stringSchema]),
  ),
});

/**
 * 項番号を表す要素。
 */
export const paragraphNumSchema = z.object({
  tag: z.literal("ParagraphNum"),
  attr: z.object({}),
  children: z.array(
    z.union([lineSchema, rubySchema, supSchema, subSchema, stringSchema]),
  ),
});

// 類について(ほぼないらしい)
/**
 * 「類名」を表す要素です。
 */
export const classTitleSchema = z.object({
  tag: z.literal("ClassTitle"),
  attr: z.object({}),
  children: z.array(
    z.union([lineSchema, rubySchema, supSchema, subSchema, stringSchema]),
  ),
});

/**
 * 「類文」を表す要素です。
 */
export const classSentenseSchema = z.object({
  tag: z.literal("ClassSentense"),
  attr: z.object({}),
  children: z.array(z.union([sentenseSchema, columnSchema, tableSchema])),
});

/**
 * 「類」を表す要素です。「類」は、廃止された家事裁判法（昭和二十二年法律第百五十二号）で用いられていた構造です。
 */
export const classSchema = z.object({
  tag: z.literal("Class"),
  attr: z.object({
    Num: z.string().nullish(),
  }),
  children: z.array(
    z.union([classTitleSchema, classSentenseSchema, itemSchema]),
  ),
});

/**
 * 項番号を表す要素。
 */
export const paragraphSentenseSchema = z.object({
  tag: z.literal("ParagraphSentense"),
  attr: z.object({}),
  children: z.array(sentenseSchema),
});

/**
 * 「項」を表す要素です。
 */
export const paragraphSchema = z.object({
  tag: z.literal("Paragraph"),
  attr: z.object({
    Num: z.string().nullish(),
    OldStyle: z
      .union([z.literal("true"), z.literal("false"), z.boolean()])
      .nullish(),
    OldNum: z
      .union([z.literal("true"), z.literal("false"), z.boolean()])
      .nullish(),
    Hide: z
      .union([z.literal("true"), z.literal("false"), z.boolean()])
      .nullish(),
  }),
  children: z.array(
    z.union([
      paragraphCaptionSchema,
      paragraphNumSchema,
      paragraphSentenseSchema,
      amendProvisionSchema,
      classSchema,
      tableStructSchema,
      figStructSchema,
      styleStructSchema,
      itemSchema,
      listSchema,
    ]),
  ),
});
export type Paragraph = z.infer<typeof paragraphSchema>;
