import { z } from "zod";
import { MockFullTextSchema } from "./mock-full-text-schema";

export const MockSchema = z.object({
  law_data_response: z.object({
    attached_files_info: z.object({
      // 添付ファイルデータ（例: Base64 エンコードされた Zip ファイル）
      image_data: z.string(),
      // 添付ファイル一覧
      attached_files: z.array(
        z.object({
          // 法令ID（履歴ID）
          law_revision_id: z.string(),
          // 法令XML中の Fig 要素の src 属性
          src: z.string(),
          // 正誤等による更新日時（ISO 8601 形式の文字列）
          updated: z.string(),
        }),
      ),
    }),
    law_info: z.object({
      // 法令種別
      law_type: z.enum([
        "Constitution",
        "Act",
        "CabinetOrder",
        "ImperialOrder",
        "MinisterialOrdinance",
        "Rule",
        "Misc",
      ]),
      // 法令ID
      law_id: z.string(),
      // 法令番号（例: 昭和二十二年政令第十六号）
      law_num: z.string(),
      // 法令番号の元号
      law_num_era: z.enum(["Meiji", "Taisho", "Showa", "Heisei", "Reiwa"]),
      // 法令番号の年
      law_num_year: z.number(),
      // 法令番号の法令種別
      law_num_type: z.enum([
        "Constitution",
        "Act",
        "CabinetOrder",
        "ImperialOrder",
        "MinisterialOrdinance",
        "Rule",
        "Misc",
      ]),
      // 法令番号の号数
      law_num_num: z.string(),
      // 公布日（例: 2023-07-01）
      promulgation_date: z.string(),
    }),
    revision_info: z.object({
      // 法令履歴ID
      law_revision_id: z.string(),
      // 法令種別
      law_type: z.enum([
        "Constitution",
        "Act",
        "CabinetOrder",
        "ImperialOrder",
        "MinisterialOrdinance",
        "Rule",
        "Misc",
      ]),
      // 法令名
      law_title: z.string(),
      // 法令名読み
      law_title_kana: z.string(),
      // 法令略称
      abbrev: z.string(),
      // 法令分野分類
      category: z.string(),
      // 正誤等による更新日時（ISO 8601 形式の文字列）
      updated: z.string(),
      // 改正法令公布日（例: 2023-07-01）
      amendment_promulgate_date: z.string(),
      // 改正法令施行期日（例: 2023-07-01）
      amendment_enforcement_date: z.string(),
      // 施行期日規定等の参考情報
      amendment_enforcement_comment: z.string(),
      // 擬似的な施行期日（例: 2023-07-01）
      amendment_scheduled_enforcement_date: z.string(),
      // 改正法令の法令ID
      amendment_law_id: z.string(),
      // 改正法令名
      amendment_law_title: z.string(),
      // 改正法令名読み
      amendment_law_title_kana: z.string(),
      // 改正法令番号
      amendment_law_num: z.string(),
      // 改正種別（Enum の値は文字列で "1", "3", "8" としています）
      amendment_type: z.enum(["1", "3", "8"]),
      // 廃止等の状態
      repeal_status: z.enum([
        "None",
        "Repeal",
        "Expire",
        "Suspend",
        "LossOfEffectiveness",
      ]),
      // 廃止日（nullable）
      repeal_date: z.string().nullable(),
      // 廃止後の効力（nullable）
      remain_in_force: z.boolean().nullable(),
      // 新規制定又は被改正法令（New）・一部改正法令（Partial）
      mission: z.enum(["New", "Partial"]),
      // 履歴の状態
      current_revision_status: z.enum([
        "CurrentEnforced",
        "UnEnforced",
        "PreviousEnforced",
        "Repeal",
      ]),
    }),
    // 法令本文。law_full_text_format と response_format が異なる場合は string 型、それ以外は object 型で返却
    law_full_text: MockFullTextSchema
  }),
});

export type MockType = z.infer<typeof MockSchema>;
