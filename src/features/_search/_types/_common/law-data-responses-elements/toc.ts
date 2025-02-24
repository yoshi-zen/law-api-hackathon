// // ************************************
// // 目次
// // ************************************

// import { z } from "zod";
// import { articleCaptionSchema, articleTitleSchema } from "./article";
// import {
//   lineSchema,
//   rubySchema,
//   stringSchema,
//   subSchema,
//   supSchema,
// } from "./inline-element";
// import {
//   chapterTitleSchema,
//   divisionTitleSchema,
//   partTitleSchema,
//   sectionTitleSchema,
//   subsectionTitleSchema,
// } from "./part";
// import { supplProvisionLabelSchema } from "./provision";

// /**
//  * 目次のラベルを表す要素です。
//  */
// export const TOCLabelSchema = z.object({
//   tag: z.literal("TOCLabel"),
//   attr: z.object({}),
//   children: z.array(
//     z.union([lineSchema, rubySchema, supSchema, subSchema, stringSchema]),
//   ),
// });

// /**
//  * 目次の前文ラベルを表す要素です。
//  */
// export const TOCPreambleLabelSchema = z.object({
//   tag: z.literal("TOCPreambleLabel"),
//   attr: z.object({}),
//   children: z.array(
//     z.union([lineSchema, rubySchema, supSchema, subSchema, stringSchema]),
//   ),
// });

// /**
//  * 目次中の「別表」の項目を表す要素です。
//  */
// export const TOCAppdxTableLabelSchema = z.object({
//   tag: z.literal("TOCAppdxTableLabel"),
//   attr: z.object({}),
//   children: z.array(
//     z.union([lineSchema, rubySchema, supSchema, subSchema, stringSchema]),
//   ),
// });

// /**
//  * 目次中の項目に付記される条範囲を表す要素です。
//  */
// export const articleRangeSchema = z.object({
//   tag: z.literal("ArticleRange"),
//   attr: z.object({}),
//   children: z.array(z.union([lineSchema, rubySchema, stringSchema])),
// });

// /**
//  * 目次中の「条」の項目を表す要素です。
//  */
// export const TOCArticleSchema = z.object({
//   tag: z.literal("TOCArticle"),
//   attr: z.object({
//     Num: z.string(), // 番号です。
//     Delete: z.enum(["true", "false"]).nullish().default("false"), // 項目が効力を有さないものとして削除扱いとされている場合にtrueを指定します。
//   }),
//   children: z.array(z.union([articleTitleSchema, articleCaptionSchema])),
// });

// /**
//  * 目次中の「⽬」を表す要素です。
//  */
// export const TOCDivisionSchema = z.object({
//   tag: z.literal("TOCDivision"),
//   attr: z.object({
//     Num: z.string(), // 番号です。
//     Delete: z.enum(["true", "false"]).nullish().default("false"), // 項目が効力を有さないものとして削除扱いとされている場合にtrueを指定します。
//   }),
//   children: z.array(z.union([divisionTitleSchema, articleRangeSchema])),
// });

// /**
//  * 目次中の「款」の項目を表す要素です。
//  */
// export const TOCSubsectionSchema = z.object({
//   tag: z.literal("TOCSubsection"),
//   attr: z.object({
//     Num: z.string(), // 番号です。
//     Delete: z.enum(["true", "false"]).nullish().default("false"), // 項目が効力を有さないものとして削除扱いとされている場合にtrueを指定します。
//   }),
//   children: z.array(
//     z.union([subsectionTitleSchema, articleRangeSchema, TOCDivisionSchema]),
//   ),
// });

// /**
//  * 目次中の「節」の項目を表す要素です。
//  */
// export const TOCSectionSchema = z.object({
//   tag: z.literal("TOCSection"),
//   attr: z.object({
//     Num: z.string(), // 番号です。
//     Delete: z.enum(["true", "false"]).nullish().default("false"), // 項目が効力を有さないものとして削除扱いとされている場合にtrueを指定します。
//   }),
//   children: z.array(
//     z.union([
//       sectionTitleSchema,
//       articleRangeSchema,
//       TOCSubsectionSchema,
//       TOCDivisionSchema,
//     ]),
//   ),
// });

// /**
//  * 目次中の「章」の項目を表す要素です。
//  */
// export const TOCChapterSchema = z.object({
//   tag: z.literal("TOCChapter"),
//   attr: z.object({
//     Num: z.string(), // 番号です。
//     Delete: z.enum(["true", "false"]).nullish().default("false"), // 項目が効力を有さないものとして削除扱いとされている場合にtrueを指定します。
//   }),
//   children: z.array(
//     z.union([chapterTitleSchema, articleRangeSchema, TOCSectionSchema]),
//   ),
// });

// /**
//  * 目次中の「編」の項目を表す要素です。
//  */
// export const TOCPartSchema = z.object({
//   tag: z.literal("TOCPart"),
//   attr: z.object({
//     Num: z.string(), // 番号です。
//     Delete: z.enum(["true", "false"]).nullish().default("false"), // 項目が効力を有さないものとして削除扱いとされている場合にtrueを指定します。
//   }),
//   children: z.array(
//     z.union([partTitleSchema, articleRangeSchema, TOCChapterSchema]),
//   ),
// });

// // ************************************
// // 附則について
// // ************************************

// /**
//  * 目次中の「附則」の項目を表す要素です。
//  */
// export const TOCSupplProvisionSchema = z.object({
//   tag: z.literal("TOCSupplProvision"),
//   attr: z.object({}),
//   children: z.array(
//     z.union([
//       supplProvisionLabelSchema,
//       articleRangeSchema,
//       TOCArticleSchema,
//       TOCChapterSchema,
//     ]),
//   ),
// });

// /**
//  * 目次を表す要素です。
//  */
// export const TOCSchema = z.object({
//   tag: z.literal("TOC"),
//   attr: z.object({}),
//   children: z.array(
//     z.union([
//       TOCLabelSchema,
//       TOCPreambleLabelSchema,
//       TOCPartSchema,
//       TOCChapterSchema,
//       TOCSectionSchema,
//       TOCArticleSchema,
//       TOCSupplProvisionSchema,
//       TOCAppdxTableLabelSchema,
//     ]),
//   ),
// });
// export type TOC = z.infer<typeof TOCSchema>;
