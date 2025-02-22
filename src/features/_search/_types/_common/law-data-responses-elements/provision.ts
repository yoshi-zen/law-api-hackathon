import { z } from "zod";
import { articleSchema } from "./article";
import {
  lineSchema,
  rubySchema,
  stringSchema,
  subSchema,
  supSchema,
} from "./inline-element";
import { paragraphSchema } from "./paragraph-item";
import { chapterSchema, partSchema, sectionSchema } from "./part";
import {
  supplProvisionAppdxSchema,
  supplProvisionAppdxStyleSchema,
  supplProvisionAppdxTableSchema,
} from "./suppl";

// 本則及び附則
/**
 * 本則を表す要素です。
 */
export const mainProvisionSchema = z.object({
  tag: z.literal("MainProvision"),
  attr: z.object({
    Extract: z.enum(["true", "false"]).nullish(), // 本則の抄録（一部を抜粋して収録）している場合はtrueを指定します。
  }),
  children: z.array(
    z.union([
      partSchema,
      chapterSchema,
      sectionSchema,
      articleSchema,
      paragraphSchema,
    ]),
  ),
});

/**
 * 附則のラベルを表す要素です。
 */
export const supplProvisionLabelSchema = z.object({
  tag: z.literal("SupplProvisionLabel"),
  attr: z.object({}),
  children: z.array(
    z.union([lineSchema, rubySchema, supSchema, subSchema, stringSchema]),
  ),
});
type SupplProvisionLabel = z.infer<typeof supplProvisionLabelSchema>;

/**
 * 附則を表す要素です。
 */
export const supplProvisionSchema = z.object({
  tag: z.literal("SupplProvision"),
  attr: z.object({
    Type: z.enum(["New", "Amend"]).nullish(), // 制定時の場合は"New"、改正時の場合は"Amend"を指定します。
    AmendLawNum: stringSchema.nullish(), // 改正附則が属する改正法令の番号を指定します。
    Extract: z.enum(["true", "false"]).nullish(), // 抄録（一部を抜粋して収録）している場合はtrueを指定します。
  }),
  children: z.array(
    z.union([
      supplProvisionLabelSchema,
      chapterSchema,
      articleSchema,
      paragraphSchema,
      supplProvisionAppdxTableSchema,
      supplProvisionAppdxStyleSchema,
      supplProvisionAppdxSchema,
    ]),
  ),
});
export type SupplProvision = z.infer<typeof supplProvisionSchema>;
