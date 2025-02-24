// // 算式

// import { z } from "zod";
// import { stringSchema } from "./inline-element";

// /**
//  * 算式を表す要素です。
//  */
// export const arithFormulaSchema = z.object({
//   tag: z.literal("ArithFormula"),
//   attr: z.object({
//     Num: z.string().nullish(),
//   }),
//   children: z.array(stringSchema),
// });
