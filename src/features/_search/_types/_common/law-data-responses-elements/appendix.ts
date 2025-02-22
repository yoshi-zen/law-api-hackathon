// ************************************
// 書式項目
// ************************************

import { z } from "zod";
import { arithFormulaSchema } from "./arithmetic";
import { figStructSchema } from "./figure";
import {
  lineSchema,
  rubySchema,
  stringSchema,
  subSchema,
  supSchema,
} from "./inline-element";
import { itemSchema } from "./item";
import {
  formatStructSchema,
  noteStructSchema,
  styleStructSchema,
} from "./note";
import { remarksSchema } from "./remark-supple";
import { tableStructSchema } from "./table";

/**
 * 関係条文番号を表す要素です。
 */
export const relatedArticleNumSchema = z.object({
  tag: z.literal("RelatedArticleNum"),
  attr: z.object({}),
  children: z.array(
    z.union([lineSchema, rubySchema, supSchema, subSchema, stringSchema]),
  ),
});

/**
 * 別表名を表す要素です。
 */
export const appdxTableTitleSchema = z.object({
  tag: z.literal("AppdxTableTitle"),
  attr: z.object({
    WritingMode: z
      .enum(["vertical", "horizontal"])
      .nullish()
      .default("vertical"),
  }),
  children: z.array(
    z.union([lineSchema, rubySchema, supSchema, subSchema, stringSchema]),
  ),
});

/**
 * 別表を表す要素です。
 */
export const appdxTableSchema = z.object({
  tag: z.literal("AppdxTable"),
  attr: z.object({
    Num: z.string().nullish(),
  }),
  children: z.array(
    z.union([
      appdxTableTitleSchema,
      relatedArticleNumSchema,
      tableStructSchema,
      itemSchema,
      remarksSchema,
    ]),
  ),
});
export type AppdxTable = z.infer<typeof appdxTableSchema>;

/**
 * 別記名を表す要素です。
 */
export const appdxNoteTitleSchema = z.object({
  tag: z.literal("AppdxNoteTitle"),
  attr: z.object({
    WritingMode: z
      .enum(["vertical", "horizontal"])
      .nullish()
      .default("vertical"),
  }),
  children: z.array(
    z.union([lineSchema, rubySchema, supSchema, subSchema, stringSchema]),
  ),
});

/**
 * 別記を表す要素です。
 */
export const appdxNoteSchema = z.object({
  tag: z.literal("AppdxNote"),
  attr: z.object({}),
  children: z.array(
    z.union([
      appdxNoteTitleSchema,
      relatedArticleNumSchema,
      noteStructSchema,
      figStructSchema,
      tableStructSchema,
      remarksSchema,
    ]),
  ),
});
export type AppdxNote = z.infer<typeof appdxNoteSchema>;

/**
 * 別記様式名を表す要素です。
 */
export const appdxStyleTitleSchema = z.object({
  tag: z.literal("AppdxStyleTitle"),
  attr: z.object({
    WritingMode: z
      .enum(["vertical", "horizontal"])
      .nullish()
      .default("vertical"),
  }),
  children: z.array(
    z.union([lineSchema, rubySchema, supSchema, subSchema, stringSchema]),
  ),
});

/**
 * 別記様式を表す要素です。
 */
export const appdxStyleSchema = z.object({
  tag: z.literal("AppdxStyle"),
  attr: z.object({
    Num: z.string().nullish(),
  }),
  children: z.array(
    z.union([
      appdxStyleTitleSchema,
      relatedArticleNumSchema,
      styleStructSchema,
      remarksSchema,
    ]),
  ),
});
export type AppdxStyle = z.infer<typeof appdxStyleSchema>;

/**
 * 別記書式名を表す要素です。
 */
export const appdxFormatTitleSchema = z.object({
  tag: z.literal("AppdxFormatTitle"),
  attr: z.object({
    WritingMode: z
      .enum(["vertical", "horizontal"])
      .nullish()
      .default("vertical"),
  }),
  children: z.array(
    z.union([lineSchema, rubySchema, supSchema, subSchema, stringSchema]),
  ),
});

/**
 * 別記書式を表す要素です。
 */
export const appdxFormatSchema = z.object({
  tag: z.literal("AppdxFormat"),
  attr: z.object({
    Num: z.string().nullish(),
  }),
  children: z.array(
    z.union([
      appdxFormatTitleSchema,
      relatedArticleNumSchema,
      formatStructSchema,
      remarksSchema,
    ]),
  ),
});
export type AppdxFormat = z.infer<typeof appdxFormatSchema>;

/**
 * 算式番号を表す要素です。
 */
export const arithFormulaNumSchema = z.object({
  tag: z.literal("ArithFormulaNum"),
  attr: z.object({}),
  children: z.array(
    z.union([lineSchema, rubySchema, supSchema, subSchema, stringSchema]),
  ),
});

/**
 * 付録を表す要素です。
 */
export const appdxSchema = z.object({
  tag: z.literal("Appdx"),
  attr: z.object({}),
  children: z.array(
    z.union([
      arithFormulaSchema,
      relatedArticleNumSchema,
      arithFormulaNumSchema,
      remarksSchema,
    ]),
  ),
});
export type Appdx = z.infer<typeof appdxSchema>;

/**
 * 別図名を表す要素です。
 */
export const appdxFigTitleSchema = z.object({
  tag: z.literal("AppdxFigTitle"),
  attr: z.object({
    WritingMode: z
      .enum(["vertical", "horizontal"])
      .nullish()
      .default("vertical"),
  }),
  children: z.array(
    z.union([lineSchema, rubySchema, supSchema, subSchema, stringSchema]),
  ),
});

/**
 * 別図を表す要素です。
 */
export const appdxFigSchema = z.object({
  tag: z.literal("AppdxFig"),
  attr: z.object({
    Num: z.string().nullish(),
  }),
  children: z.array(
    z.union([
      appdxFigTitleSchema,
      relatedArticleNumSchema,
      figStructSchema,
      remarksSchema,
    ]),
  ),
});
export type AppdxFig = z.infer<typeof appdxFigSchema>;
