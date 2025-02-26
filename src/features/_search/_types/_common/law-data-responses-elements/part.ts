// // 章など

// import { z } from "zod";
// import { articleSchema } from "./article";
// import {
//   lineSchema,
//   rubySchema,
//   stringSchema,
//   subSchema,
//   supSchema,
// } from "./inline-element";

// // タイトル系
// /**
//  * 「編」の題名を表す要素です。
//  */
// export const partTitleSchema = z.object({
//   tag: z.literal("PartTitle"),
//   attr: z.object({}),
//   children: z.array(
//     z.union([lineSchema, rubySchema, supSchema, subSchema, stringSchema]),
//   ),
// });
// export type PartTitle = z.infer<typeof partTitleSchema>;

// /**
//  * 「章名」を表す要素です。
//  */
// export const chapterTitleSchema = z.object({
//   tag: z.literal("ChapterTitle"),
//   attr: z.object({}),
//   children: z.array(
//     z.union([lineSchema, rubySchema, supSchema, subSchema, stringSchema]),
//   ),
// });
// export type ChapterTitle = z.infer<typeof chapterTitleSchema>;

// /**
//  * 「節名」を表す要素です。
//  */
// export const sectionTitleSchema = z.object({
//   tag: z.literal("SectionTitle"),
//   attr: z.object({}),
//   children: z.array(
//     z.union([lineSchema, rubySchema, supSchema, subSchema, stringSchema]),
//   ),
// });
// export type SectionTitle = z.infer<typeof sectionTitleSchema>;

// /**
//  * 「款名」を表す要素です。
//  */
// export const subsectionTitleSchema = z.object({
//   tag: z.literal("SubsectionTitle"),
//   attr: z.object({}),
//   children: z.array(
//     z.union([lineSchema, rubySchema, supSchema, subSchema, stringSchema]),
//   ),
// });
// export type SubsectionTitle = z.infer<typeof subsectionTitleSchema>;

// /**
//  * 「目名」を表す要素です。
//  */
// export const divisionTitleSchema = z.object({
//   tag: z.literal("DivisionTitle"),
//   attr: z.object({}),
//   children: z.array(
//     z.union([lineSchema, rubySchema, supSchema, subSchema, stringSchema]),
//   ),
// });
// export type DivisionTitle = z.infer<typeof divisionTitleSchema>;

// /**
//  * 「目」を表す要素です。
//  */
// export const divisionSchema = z.object({
//   tag: z.literal("Division"),
//   attr: z.object({
//     Num: z.string(), // 番号です。
//     Delete: z.enum(["true", "false"]).nullish().default("false"), // この項目が効力を有さないものとして削除扱いとされている場合にtrueを指定します。
//     Hide: z.enum(["true", "false"]).nullish().default("false"), // 項目が非表示である場合にtrueを指定します。
//   }),
//   children: z.array(z.union([divisionTitleSchema, articleSchema])),
// });
// export type Division = z.infer<typeof divisionSchema>;

// /**
//  * 「款」を表す要素です。
//  */
// export const subsectionSchema = z.object({
//   tag: z.literal("Subsection"),
//   attr: z.object({
//     Num: z.string(), // 番号です。
//     Delete: z.enum(["true", "false"]).nullish().default("false"), // この項目が効力を有さないものとして削除扱いとされている場合にtrueを指定します。
//     Hide: z.enum(["true", "false"]).nullish().default("false"), // 項目が非表示である場合にtrueを指定します。
//   }),
//   children: z.array(
//     z.union([subsectionTitleSchema, articleSchema, divisionSchema]),
//   ),
// });
// export type Subsection = z.infer<typeof subsectionSchema>;

// /**
//  * 「節」を表す要素です。
//  */
// export const sectionSchema = z.object({
//   tag: z.literal("Section"),
//   attr: z.object({
//     Num: z.string(), // 番号です。
//     Delete: z.enum(["true", "false"]).nullish().default("false"), // この項目が効力を有さないものとして削除扱いとされている場合にtrueを指定します。
//     Hide: z.enum(["true", "false"]).nullish().default("false"), // 項目が非表示である場合にtrueを指定します。
//   }),
//   children: z.array(
//     z.union([
//       sectionTitleSchema,
//       articleSchema,
//       subsectionSchema,
//       divisionSchema,
//     ]),
//   ),
// });
// export type Section = z.infer<typeof sectionSchema>;

// /**
//  * 「章」を表す要素です。
//  */
// export const chapterSchema = z.object({
//   tag: z.literal("Chapter"),
//   attr: z.object({
//     Num: z.string(), // 番号です。
//     Delete: z.enum(["true", "false"]).nullish().default("false"), // この項目が効力を有さないものとして削除扱いとされている場合にtrueを指定します。
//     Hide: z.enum(["true", "false"]).nullish().default("false"), // 項目が非表示である場合にtrueを指定します。
//   }),
//   children: z.array(
//     z.union([chapterTitleSchema, articleSchema, sectionSchema]),
//   ),
// });
// export type Chapter = z.infer<typeof chapterSchema>;

// /**
//  * 「編」を表す要素です。
//  */
// export const partSchema = z.object({
//   tag: z.literal("Part"),
//   attr: z.object({
//     Num: z.string(), // 番号です。
//     Delete: z.enum(["true", "false"]).nullish().default("false"), // この項目が効力を有さないものとして削除扱いとされている場合にtrueを指定します。
//     Hide: z.enum(["true", "false"]).nullish().default("false"), // 項目が非表示である場合にtrueを指定します。
//   }),
//   children: z.array(z.union([partTitleSchema, articleSchema, chapterSchema])),
// });
// export type Part = z.infer<typeof partSchema>;
