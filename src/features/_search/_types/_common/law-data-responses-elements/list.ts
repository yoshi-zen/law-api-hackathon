// // 列記

// import { z } from "zod";
// import { columnSchema, sentenseSchema } from "./sentence";

// /**
//  * 列記の条文を表す要素。
//  */
// export const listSentenseSchema = z.object({
//   tag: z.literal("ListSentense"),
//   attr: z.object({}),
//   children: z.array(z.union([sentenseSchema, columnSchema])),
// });

// /**
//  * 列記の細分（1~3段階目）の条文を表す要素です。
//  */
// export const sublistSentenses = Array.from({ length: 3 }).map((_, i) =>
//   z.object({
//     tag: z.literal(`Sublist${String(i + 1)}Sentense`),
//     attr: z.object({}),
//     children: z.array(z.union([sentenseSchema, columnSchema])),
//   }),
// );

// /**
//  * 列記の細分（1~3段階目）のスキーマです。
//  */
// const sublistBaseSchema = Array.from({ length: 3 }).map((_, i) =>
//   z.object({
//     tag: z.literal(`Sublist${String(i + 1)}`),
//     attr: z.object({}),
//   }),
// );

// /**
//  * 列記の細分（1~3段階目）を表す要素です。
//  */
// export const sublistSchemas = sublistBaseSchema.map((schema, i) => {
//   if (i === sublistBaseSchema.length - 1) {
//     return schema.extend({
//       children: z.array(sublistSentenses[i]),
//     });
//   }
//   return schema.extend({
//     children: z.array(z.union([sublistSentenses[i], sublistBaseSchema[i + 1]])),
//   });
// });

// /**
//  * 列記を表す要素です。
//  */
// export const listSchema = z.object({
//   tag: z.literal("List"),
//   attr: z.object({}),
//   children: z.array(z.union([listSentenseSchema, sublistSchemas[0]])),
// });
// export type List = z.infer<typeof listSchema>;
