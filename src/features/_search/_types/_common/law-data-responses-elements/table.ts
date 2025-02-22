// 表

import { z } from "zod";
import { articleSchema } from "./article";
import { figStructSchema } from "./figure";
import {
  lineSchema,
  rubySchema,
  stringSchema,
  subSchema,
  supSchema,
} from "./inline-element";
import { itemSchema, subitemSchema } from "./item";
import { paragraphSchema } from "./paragraph-item";
import {
  chapterSchema,
  divisionSchema,
  partSchema,
  sectionSchema,
  subsectionSchema,
} from "./part";
import { remarksSchema } from "./remark-supple";
import { columnSchema, sentenseSchema } from "./sentence";

/**
 * 表項目名を表す要素です。
 */
export const tableStructTitleSchema = z.object({
  tag: z.literal("TableStructTitle"),
  attr: z.object({
    WritingMode: z.enum(["vertical", "horizontal"]).nullish(),
  }),
  children: z.array(
    z.union([lineSchema, rubySchema, supSchema, subSchema, stringSchema]),
  ),
});

/**
 * 表の列（欄）を表す要素です。
 */
export const tableColumnSchema = z.object({
  tag: z.literal("TableColumn"),
  attr: z.object({
    BorderTop: z
      .enum(["solid", "none", "dotted", "double"])
      .nullish()
      .default("solid"), // 上の枠線スタイルを表す要素です。
    BorderBottom: z
      .enum(["solid", "none", "dotted", "double"])
      .nullish()
      .default("solid"), // 下の枠線スタイルを表す要素です。
    BorderLeft: z
      .enum(["solid", "none", "dotted", "double"])
      .nullish()
      .default("solid"), // 左の枠線スタイルを表す要素です。
    BorderRight: z
      .enum(["solid", "none", "dotted", "double"])
      .nullish()
      .default("solid"), // 右の枠線スタイルを表す要素です。
    rowspan: stringSchema.nullish(), // 行（項）の方向の結合数を指定します。
    colspan: stringSchema.nullish(), // 列（欄）の方向の結合数を指定します。
    Align: z.enum(["left", "center", "right", "justify"]).nullish(), // 行（項）の方向の位置を指定します。
    Valign: z.enum(["top", "middle", "bottom"]).nullish(), // 列（欄）の方向の位置を指定します。
  }),
  children: z.array(
    z.union([
      partSchema,
      chapterSchema,
      sectionSchema,
      subsectionSchema,
      divisionSchema,
      articleSchema,
      paragraphSchema,
      itemSchema,
      ...subitemSchema,
      figStructSchema,
      remarksSchema,
      sentenseSchema,
      columnSchema,
    ]),
  ),
});
export type TableColumn = z.infer<typeof tableColumnSchema>;

/**
 * 表の欄名の列（欄）を表す要素です。
 */
export const tableHeaderColumnSchema = z.object({
  tag: z.literal("TableHeaderColumn"),
  attr: z.object({}),
  children: z.array(
    z.union([lineSchema, rubySchema, supSchema, subSchema, stringSchema]),
  ),
});

/**
 * 表の欄名の行（項）を表す要素です。
 */
export const tableHeaderRowSchema = z.object({
  tag: z.literal("TableHeaderRow"),
  attr: z.object({}),
  children: z.array(tableHeaderColumnSchema),
});

/**
 * 表の行（項）を表す要素です。
 */
export const tableRowSchema = z.object({
  tag: z.literal("TableRow"),
  attr: z.object({}),
  children: z.array(tableColumnSchema),
});
export type TableRow = z.infer<typeof tableRowSchema>;

/**
 * 表を表す要素です。
 */
export const tableSchema = z.object({
  tag: z.literal("Table"),
  attr: z.object({
    WritingMode: z.enum(["vertical", "horizontal"]).nullish(),
  }),
  children: z.array(z.union([tableHeaderRowSchema, tableRowSchema])),
});

/**
 * 表項目を表す要素です。
 */
export const tableStructSchema = z.object({
  tag: z.literal("TableStruct"),
  attr: z.object({}),
  children: z.array(
    z.union([tableStructTitleSchema, remarksSchema, tableSchema]),
  ),
});
export type TableStruct = z.infer<typeof tableStructSchema>;
