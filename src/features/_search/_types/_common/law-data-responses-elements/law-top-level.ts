import { z } from "zod";
import { LawNumEraSchema } from "../law-num-era";
import { LawTypeSchema } from "../law-type";
import {
  appdxFigSchema,
  appdxFormatSchema,
  appdxNoteSchema,
  appdxSchema,
  appdxStyleSchema,
  appdxTableSchema,
} from "./appendix";
import {
  lineSchema,
  rubySchema,
  stringSchema,
  subSchema,
  supSchema,
} from "./inline-element";
import { paragraphSchema } from "./paragraph-item";
import { mainProvisionSchema, supplProvisionSchema } from "./provision";
import { TOCSchema } from "./toc";

// 書き出しの要素
/**
 * 法令の題名（法令名）を表す要素です。
 */
export const lawTitleSchema = z.object({
  tag: z.literal("LawTitle"),
  attr: z.object({
    Kana: stringSchema.nullish(), // 法令名の読み（ひらがな）です。
    Abbrev: stringSchema.nullish(), // 法令の略称です。複数ある場合は","で区切って入力されます。
    AbbrevKana: stringSchema.nullish(), // 法令の略称の読み（ひらがな）です。複数ある場合は","で区切って入力されます。
  }),
  children: z.array(
    z.union([lineSchema, rubySchema, supSchema, subSchema, stringSchema]),
  ),
});
export type LawTitle = z.infer<typeof lawTitleSchema>;

/**
 * 制定文を表す要素です。
 */
export const enactStatementSchema = z.object({
  tag: z.literal("EnactStatement"),
  attr: z.object({}),
  children: z.array(
    z.union([lineSchema, rubySchema, supSchema, subSchema, stringSchema]),
  ),
});

/**
 * 前文を表す要素です。
 */
export const preambleSchema = z.object({
  tag: z.literal("Preamble"),
  attr: z.object({}),
  children: z.array(paragraphSchema),
});
export type Preamble = z.infer<typeof preambleSchema>;

// トップレベル要素
/**
 * 法令番号を表す要素です。
 */
export const lawNumSchema = z.object({
  tag: z.literal("LawNum"),
  attr: z.object({}),
  children: z.array(stringSchema),
});

export const lawBodySchema = z.object({
  tag: z.literal("LawBody"),
  attr: z.object({
    Subject: stringSchema.nullish(),
  }),
  children: z.array(
    z.union([
      lawTitleSchema,
      enactStatementSchema,
      TOCSchema,
      preambleSchema,
      mainProvisionSchema,
      supplProvisionSchema,
      appdxTableSchema,
      appdxNoteSchema,
      appdxStyleSchema,
      appdxSchema,
      appdxFigSchema,
      appdxFormatSchema,
    ]),
  ),
});
export type LawBody = z.infer<typeof lawBodySchema>;

/**
 * 法令XMLのルート要素です。法令の基本情報の属性を持っています。
 */
export const lawSchema = z.object({
  tag: z.literal("Law"),
  attr: z.object({
    Era: LawNumEraSchema, // 法令番号に含まれる元号です。
    Year: stringSchema, // 法令番号に含まれる年号です。
    Num: stringSchema, // 法令番号に含まれる番号です。
    PromulgateMonth: stringSchema, // 公布の月です。
    PromulgateDay: stringSchema, // 公布の日です。
    LawType: LawTypeSchema, // 法令の種別です。
    Lang: z.enum(["ja", "en"]), // 多言語対応を想定した属性です。e-Gov法令検索では"ja"が使用されています。
  }),
  children: z.array(z.union([lawNumSchema, lawBodySchema])),
});
