// // 条

// import { z } from "zod";
// import {
//   lineSchema,
//   rubySchema,
//   stringSchema,
//   subSchema,
//   supSchema,
// } from "./inline-element";
// import { supplNoteSchema } from "./remark-supple";

// /**
//  * 「条」を表す要素です。
//  */
// export const articleTitleSchema = z.object({
//   tag: z.literal("ArticleTitle"),
//   attr: z.object({}),
//   children: z.array(
//     z.union([lineSchema, rubySchema, supSchema, subSchema, stringSchema]),
//   ),
// });

// /**
//  * 条見出しを表す要素です。
//  */
// export const articleCaptionSchema = z.object({
//   tag: z.literal("ArticleCaption"),
//   attr: z.object({
//     CommonCaption: z
//       .union([z.literal("true"), z.literal("false")], z.boolean())
//       .nullish(),
//   }),
//   children: z.array(
//     z.union([lineSchema, rubySchema, supSchema, subSchema, stringSchema]),
//   ),
// });

// /**
//  * 「条」を表す要素です。
//  */
// export const articleSchema = z.object({
//   tag: z.literal("Article"),
//   attr: z.object({
//     Num: z.string().nullish(),
//     Delete: z
//       .union([z.literal("true"), z.literal("false"), z.boolean()])
//       .nullish(),
//     Hide: z
//       .union([z.literal("true"), z.literal("false"), z.boolean()])
//       .nullish(),
//   }),
//   children: z.array(
//     z.union([
//       articleCaptionSchema,
//       articleTitleSchema,
//       // paragraphSchema,
//       supplNoteSchema,
//     ]),
//   ),
// });
// export type Article = z.infer<typeof articleSchema>;
