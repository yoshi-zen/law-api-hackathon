// //

// import { z } from "zod";
// import { figStructSchema } from "./figure";
// import {
//   lineSchema,
//   rubySchema,
//   stringSchema,
//   subSchema,
//   supSchema,
// } from "./inline-element";
// import { listSchema } from "./list";
// import { styleStructSchema } from "./note";
// import { columnSchema, sentenseSchema } from "./sentence";
// import { tableSchema, tableStructSchema } from "./table";

// /**
//  * 「号名」を表す要素。
//  */
// export const itemTitleSchema = z.object({
//   tag: z.literal("ItemTitle"),
//   attr: z.object({}),
//   children: z.array(
//     z.union([lineSchema, rubySchema, supSchema, subSchema, stringSchema]),
//   ),
// });

// /**
//  * 号の文章（柱書）を表す要素です。
//  */
// export const itemSentenseSchema = z.object({
//   tag: z.literal("ItemSentense"),
//   attr: z.object({}),
//   children: z.array(z.union([sentenseSchema, columnSchema, tableSchema])),
// });

// // 号の細分についてベースとなるスキーマ
// const subitemBaseSchema = Array.from({ length: 10 }).map((_, i) =>
//   z.object({
//     tag: z.literal(`Subitem${String(i + 1)}`),
//     attr: z.object({
//       Num: z.string().nullish(),
//       Delete: z
//         .union([z.literal("true"), z.literal("false"), z.boolean()])
//         .nullish(),
//       Hide: z
//         .union([z.literal("true"), z.literal("false"), z.boolean()])
//         .nullish(),
//     }),
//   }),
// );

// /**
//  * 「号の細分」（1~10階層目）を表す要素です。
//  */
// export const subitemSchema = subitemBaseSchema.map((schema, i) => {
//   if (i === subitemBaseSchema.length - 1) {
//     return schema.extend({
//       children: z.array(
//         z.union([
//           subitemTitleSchemas[i],
//           subitemSentenseSchemas[i],
//           tableStructSchema,
//           figStructSchema,
//           styleStructSchema,
//           listSchema,
//         ]),
//       ),
//     });
//   }
//   return schema.extend({
//     children: z.array(
//       z.union([
//         subitemTitleSchemas[i],
//         subitemSentenseSchemas[i],
//         subitemBaseSchema[i + 1],
//         tableStructSchema,
//         figStructSchema,
//         styleStructSchema,
//         listSchema,
//       ]),
//     ),
//   });
// });

// /**
//  * 「号の細分名」（1~10階層目）を表す要素です。
//  */
// export const subitemTitleSchemas = Array.from({ length: 10 }).map((_, i) =>
//   z.object({
//     tag: z.literal(`Subitem${String(i + 1)}Title`),
//     attr: z.object({}),
//     children: z.array(
//       z.union([lineSchema, rubySchema, supSchema, subSchema, stringSchema]),
//     ),
//   }),
// );

// /**
//  * 号の細分（1~10階層目）の文章（柱書）を表す要素です。
//  */
// export const subitemSentenseSchemas = Array.from({ length: 10 }).map((_, i) =>
//   z.object({
//     tag: z.literal(`Subitem${String(i + 1)}Sentense`),
//     attr: z.object({}),
//     children: z.array(z.union([sentenseSchema, columnSchema, tableSchema])),
//   }),
// );

// /**
//  * 「号」を表す要素です。
//  */
// export const itemSchema = z.object({
//   tag: z.literal("Item"),
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
//       itemTitleSchema,
//       itemSentenseSchema,
//       subitemSchema[0],
//       tableStructSchema,
//       figStructSchema,
//       styleStructSchema,
//       listSchema,
//     ]),
//   ),
// });
// export type Item = z.infer<typeof itemSchema>;
