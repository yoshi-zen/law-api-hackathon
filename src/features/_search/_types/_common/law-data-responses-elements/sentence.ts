// // 条文

// import { z } from "zod";
// import { arithFormulaSchema } from "./arithmetic";
// import {
//   lineSchema,
//   quoteStructSchema,
//   rubySchema,
//   stringSchema,
//   subSchema,
//   supSchema,
// } from "./inline-element";

// /**
//  * 条文を表す要素。「前段」「後段」「本文」「ただし書」などの部分ごとに要素を分けます。
//  */
// export const sentenseSchema = z.object({
//   tag: z.literal("Sentense"),
//   attr: z.object({
//     Num: z.string().nullish(),
//     Function: z.enum(["main", "proviso"]).nullish(), // mainは本文、provisoはただし書
//     Indent: z
//       .enum([
//         "Paragraph",
//         "Item",
//         "Subitem1",
//         "Subitem2",
//         "Subitem3",
//         "Subitem4",
//         "Subitem5",
//         "Subitem6",
//         "Subitem7",
//         "Subitem8",
//         "Subitem9",
//         "Subitem10",
//       ])
//       .nullish(),
//     WritingMode: z.enum(["vertical", "horizontal"]).nullish(),
//   }),
//   children: z.array(
//     z.union([
//       lineSchema,
//       quoteStructSchema,
//       arithFormulaSchema,
//       rubySchema,
//       supSchema,
//       subSchema,
//       stringSchema,
//     ]),
//   ),
// });
// export type Sentense = z.infer<typeof sentenseSchema>;

// /**
//  * 条文が空白区切りの場合、それぞれの部分を表す。
//  */
// export const columnSchema = z.object({
//   tag: z.literal("Column"),
//   attr: z.object({
//     Num: z.string().nullish(),
//     LineBreak: z.enum(["true", "false"]).nullish(),
//     Align: z.enum(["left", "center", "right", "justify"]).nullish(),
//   }),
//   children: z.array(sentenseSchema),
// });
