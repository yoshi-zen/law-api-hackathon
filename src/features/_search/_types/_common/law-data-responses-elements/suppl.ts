// // ************************************
// // 附則別表等
// // ************************************

// import { z } from "zod";
// import { arithFormulaNumSchema, relatedArticleNumSchema } from "./appendix";
// import { arithFormulaSchema } from "./arithmetic";
// import {
//   lineSchema,
//   rubySchema,
//   stringSchema,
//   subSchema,
//   supSchema,
// } from "./inline-element";
// import { styleStructSchema } from "./note";
// import { tableStructSchema } from "./table";

// /**
//  * 附則別表名を表す要素です。
//  */
// const supplProvisionAppdxTableTitleSchema = z.object({
//   tag: z.literal("SupplProvisionAppdxTableTitle"),
//   attr: z.object({
//     WritingMode: z
//       .enum(["vertical", "horizontal"])
//       .nullish()
//       .default("vertical"),
//   }),
//   children: z.array(
//     z.union([lineSchema, rubySchema, supSchema, subSchema, stringSchema]),
//   ),
// });

// /**
//  * 附則別表を表す要素です。
//  */
// export const supplProvisionAppdxTableSchema = z.object({
//   tag: z.literal("SupplProvisionAppdxTable"),
//   attr: z.object({
//     Num: z.string().nullish(),
//   }),
//   children: z.array(
//     z.union([
//       supplProvisionAppdxTableTitleSchema,
//       relatedArticleNumSchema,
//       tableStructSchema,
//     ]),
//   ),
// });
// export type SupplProvisionAppdxTable = z.infer<
//   typeof supplProvisionAppdxTableSchema
// >;

// /**
//  * 附則様式名を表す要素です。
//  */
// const supplProvisionAppdxStyleTitleSchema = z.object({
//   tag: z.literal("SupplProvisionAppdxStyleTitle"),
//   attr: z.object({
//     WritingMode: z
//       .enum(["vertical", "horizontal"])
//       .nullish()
//       .default("vertical"),
//   }),
//   children: z.array(
//     z.union([lineSchema, rubySchema, supSchema, subSchema, stringSchema]),
//   ),
// });

// /**
//  * 附則様式を表す要素です。
//  */
// export const supplProvisionAppdxStyleSchema = z.object({
//   tag: z.literal("SupplProvisionAppdxStyle"),
//   attr: z.object({
//     Num: z.string().nullish(),
//   }),
//   children: z.array(
//     z.union([
//       supplProvisionAppdxStyleTitleSchema,
//       relatedArticleNumSchema,
//       styleStructSchema,
//     ]),
//   ),
// });
// export type SupplProvisionAppdxStyle = z.infer<
//   typeof supplProvisionAppdxStyleSchema
// >;

// /**
//  * 附則付録を表す要素です。
//  */
// export const supplProvisionAppdxSchema = z.object({
//   tag: z.literal("SupplProvisionAppdx"),
//   attr: z.object({
//     Num: z.string().nullish(),
//   }),
//   children: z.array(
//     z.union([
//       arithFormulaNumSchema,
//       relatedArticleNumSchema,
//       arithFormulaSchema,
//     ]),
//   ),
// });
// export type SupplProvisionAppdx = z.infer<typeof supplProvisionAppdxSchema>;
