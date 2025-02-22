// 様式等

import { z } from "zod";
import {
  lineSchema,
  rubySchema,
  stringSchema,
  subSchema,
  supSchema,
} from "./inline-element";
import { remarksSchema } from "./remark-supple";

// ************************************
// 記
// ************************************

/**
 * 記項目名を表す要素です。
 */
export const noteStructTitleSchema = z.object({
  tag: z.literal("NoteStructTitle"),
  attr: z.object({}),
  children: z.array(
    z.union([lineSchema, rubySchema, supSchema, subSchema, stringSchema]),
  ),
});
export type NoteStructTitle = z.infer<typeof noteStructTitleSchema>;

/**
 * 「記」を表す要素です。
 */
export const noteSchema = z.object({
  tag: z.literal("Note"),
  attr: z.object({}),
  children: z.array(z.any()),
});
export type Note = z.infer<typeof noteSchema>;

/**
 * 記項目を表す要素です。
 */
export const noteStructSchema = z.object({
  tag: z.literal("NoteStruct"),
  attr: z.object({}),
  children: z.array(
    z.union([noteStructTitleSchema, remarksSchema, noteSchema]),
  ),
});
export type NoteStruct = z.infer<typeof noteStructSchema>;

/**
 * 様式項目名を表す要素です。
 */
export const styleStructTitleSchema = z.object({
  tag: z.literal("StyleStructTitle"),
  attr: z.object({}),
  children: z.array(
    z.union([lineSchema, rubySchema, supSchema, subSchema, stringSchema]),
  ),
});

/**
 * 様式を表す要素です。
 */
export const styleSchema = z.object({
  tag: z.literal("Style"),
  attr: z.object({}),
  children: z.array(z.any()),
});

/**
 * 様式項目を表す要素です。
 */
export const styleStructSchema = z.object({
  tag: z.literal("StyleStruct"),
  attr: z.object({}),
  children: z.array(
    z.union([styleStructTitleSchema, remarksSchema, styleSchema]),
  ),
});
export type StyleStruct = z.infer<typeof styleStructSchema>;

// ************************************
// 書式項目
// ************************************

/**
 * 書式を表す要素です。
 */
export const formatSchema = z.object({
  tag: z.literal("Format"),
  attr: z.object({}),
  children: z.array(z.any()),
});

/**
 * 書式項目名を表す要素です。
 */
export const formatStructTitleSchema = z.object({
  tag: z.literal("FormatStructTitle"),
  attr: z.object({}),
  children: z.array(
    z.union([lineSchema, rubySchema, supSchema, subSchema, stringSchema]),
  ),
});

/**
 * 書式項目を表す要素です。
 */
export const formatStructSchema = z.object({
  tag: z.literal("FormatStruct"),
  attr: z.object({}),
  children: z.array(
    z.union([formatStructTitleSchema, remarksSchema, formatSchema]),
  ),
});
export type FormatStruct = z.infer<typeof formatStructSchema>;
