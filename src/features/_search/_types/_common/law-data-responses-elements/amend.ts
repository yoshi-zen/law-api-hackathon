// import { z } from "zod";
// import {
//   type Appdx,
//   type AppdxFig,
//   type AppdxFormat,
//   type AppdxNote,
//   type AppdxStyle,
//   type AppdxTable,
//   appdxFigSchema,
//   appdxFormatSchema,
//   appdxNoteSchema,
//   appdxSchema,
//   appdxStyleSchema,
//   appdxTableSchema,
// } from "./appendix";
// import { type Article, articleSchema } from "./article";
// import { type FigStruct, figStructSchema } from "./figure";
// import { type Item, itemSchema, subitemSchema } from "./item";
// import {
//   type LawBody,
//   type LawTitle,
//   type Preamble,
//   lawBodySchema,
//   lawTitleSchema,
//   preambleSchema,
// } from "./law-top-level";
// import { type List, listSchema } from "./list";
// import {
//   type FormatStruct,
//   type NoteStruct,
//   type StyleStruct,
//   formatStructSchema,
//   noteStructSchema,
//   styleStructSchema,
// } from "./note";
// import { type Paragraph, paragraphSchema } from "./paragraph-item";
// import {
//   type Chapter,
//   type ChapterTitle,
//   type Division,
//   type DivisionTitle,
//   type Part,
//   type PartTitle,
//   type Section,
//   type SectionTitle,
//   type Subsection,
//   type SubsectionTitle,
//   chapterSchema,
//   chapterTitleSchema,
//   divisionSchema,
//   divisionTitleSchema,
//   partSchema,
//   partTitleSchema,
//   sectionSchema,
//   sectionTitleSchema,
//   subsectionSchema,
//   subsectionTitleSchema,
// } from "./part";
// import {
//   type Remarks,
//   type SupplNote,
//   remarksSchema,
//   supplNoteSchema,
// } from "./remark-supple";
// import { type Sentense, sentenseSchema } from "./sentence";
// import {
//   type SupplProvisionAppdx,
//   type SupplProvisionAppdxStyle,
//   type SupplProvisionAppdxTable,
//   supplProvisionAppdxSchema,
//   supplProvisionAppdxStyleSchema,
//   supplProvisionAppdxTableSchema,
// } from "./suppl";
// import {
//   type TableColumn,
//   type TableRow,
//   type TableStruct,
//   tableColumnSchema,
//   tableRowSchema,
//   tableStructSchema,
// } from "./table";
// import { type TOC, TOCSchema } from "./toc";

// type NewProvision = {
//   tag: "NewProvision";
//   attr: Record<string, never>;
//   children: Array<
//     | LawTitle
//     | Preamble
//     | TOC
//     | Part
//     | PartTitle
//     | Chapter
//     | ChapterTitle
//     | Section
//     | SectionTitle
//     | Subsection
//     | SubsectionTitle
//     | Division
//     | DivisionTitle
//     | Article
//     | SupplNote
//     | Paragraph
//     | Item
//     | List
//     | Sentense
//     | AppdxTable
//     | AppdxNote
//     | AppdxStyle
//     | Appdx
//     | AppdxFig
//     | AppdxFormat
//     | SupplProvisionAppdxStyle
//     | SupplProvisionAppdxTable
//     | SupplProvisionAppdx
//     | TableStruct
//     | TableRow
//     | TableColumn
//     | FigStruct
//     | NoteStruct
//     | StyleStruct
//     | FormatStruct
//     | Remarks
//     | LawBody
//     | {
//         tag: "AmendProvision";
//         attr: Record<string, never>;
//         children: Array<AmendProvision | NewProvision>;
//       }
//   >;
// };

// // 改正規定
// export const newProvisionSchema: z.ZodSchema<NewProvision> = z.lazy(() =>
//   z.object({
//     tag: z.literal("NewProvision"),
//     attr: z.object({}),
//     children: z.array(
//       z.union([
//         lawTitleSchema,
//         preambleSchema,
//         TOCSchema,
//         partSchema,
//         partTitleSchema,
//         chapterSchema,
//         chapterTitleSchema,
//         sectionSchema,
//         sectionTitleSchema,
//         subsectionSchema,
//         subsectionTitleSchema,
//         divisionSchema,
//         divisionTitleSchema,
//         articleSchema,
//         supplNoteSchema,
//         paragraphSchema,
//         itemSchema,
//         ...subitemSchema,
//         listSchema,
//         sentenseSchema,
//         appdxTableSchema,
//         appdxNoteSchema,
//         appdxStyleSchema,
//         appdxSchema,
//         appdxFigSchema,
//         appdxFormatSchema,
//         supplProvisionAppdxStyleSchema,
//         supplProvisionAppdxTableSchema,
//         supplProvisionAppdxSchema,
//         tableStructSchema, // TODO
//         tableRowSchema, // TODO
//         tableColumnSchema,
//         figStructSchema,
//         noteStructSchema,
//         styleStructSchema,
//         formatStructSchema,
//         remarksSchema,
//         lawBodySchema,
//         z.object({
//           tag: z.literal("AmendProvision"),
//           attr: z.object({}),
//           children: z.array(
//             z.union([amendProvisionSentenceSchema, newProvisionSchema]),
//           ),
//         }),
//       ]),
//     ),
//   }),
// );

// /**
//  * 改正規定文を表す要素です。
//  */
// export const amendProvisionSentenceSchema = z.object({
//   tag: z.literal("AmendProvisionSentence"),
//   attr: z.object({}),
//   children: z.array(sentenseSchema),
// });

// /**
//  * 改正規定を表す要素です。
//  */
// export const amendProvisionSchema = z.lazy(() =>
//   z.object({
//     tag: z.literal("AmendProvision"),
//     attr: z.object({}),
//     children: z.array(
//       z.union([amendProvisionSentenceSchema, newProvisionSchema]),
//     ),
//   }),
// );
// export type AmendProvision = z.infer<typeof amendProvisionSchema>;
