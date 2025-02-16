import { categoryCdLabelMap } from "../_types/_common/category-cd";
import { lawNumEraMap } from "../_types/_common/law-num-era";
import { lawNumTypeMap } from "../_types/_common/law-num-type";
import { missionListMap } from "../_types/_common/mission";
import { repealStatusListMap } from "../_types/_common/repeal-status";

type BaseSearchCondition = {
  title: string;
  placeholder: string;
  name: string;
};

type SelectCondition = BaseSearchCondition & {
  type: "select" | "multi-select";
  options: Array<{ value: string; label: string }>;
};

type OtherCondition = BaseSearchCondition & {
  type: "input" | "calendar";
  options?: never; // 他のタイプでは options を持たせない
};

type SearchConditionsType = SelectCondition | OtherCondition;

export const searchConditions: SearchConditionsType[] = [
  {
    title: "法令ID",
    placeholder: "322CO0000000016",
    name: "law_id",
    type: "input",
  },
  {
    title: "法令番号",
    placeholder: "平成22年法律第16号",
    name: "law_num",
    type: "input",
  },
  {
    title: "法令番号の元号",
    placeholder: "選択してください",
    name: "law_num_era",
    type: "select",
    options: lawNumEraMap,
  },
  {
    title: "法令番号の号数",
    placeholder: "16",
    name: "law_num_num",
    type: "input",
  },
  {
    title: "法令番号の法令種別",
    placeholder: "選択してください",
    name: "law_num_type",
    type: "select",
    options: lawNumTypeMap,
  },
  {
    title: "法令番号の年",
    placeholder: "22",
    name: "law_num_year",
    type: "input",
  },
  {
    title: "法令名又は法令略称（部分一致）",
    placeholder: "選択してください",
    name: "law_title",
    type: "input",
  },
  {
    title: "法令かな読み（部分一致）",
    placeholder: "選択してください",
    name: "law_title_kana",
    type: "input",
  },
  {
    title: "法令種別（複数指定可）",
    placeholder: "選択してください",
    name: "law_type",
    type: "multi-select",
    options: lawNumTypeMap,
  },
  {
    title: "改正法令の法令ID（部分一致）",
    placeholder: "選択してください",
    name: "amendment_law_id",
    type: "input",
  },
  {
    title: "改正法令の法令番号（部分一致）",
    placeholder: "選択してください",
    name: "amendment_law_num",
    type: "input",
  },
  {
    title: "改正法令の施行日",
    placeholder: "選択してください",
    name: "asof",
    type: "calendar",
  },
  {
    title: "事項別法令分類コード（複数指定可）",
    placeholder: "選択してください",
    name: "category_cd",
    type: "multi-select",
    options: categoryCdLabelMap,
  },
  {
    title: "新規制定又は被改正法令・一部改正法令を指定（複数指定可）",
    placeholder: "選択してください",
    name: "mission",
    type: "multi-select",
    options: missionListMap,
  },
  {
    title: "公布日(この日以降) ",
    placeholder: "選択してください",
    name: "promulgation_date_from",
    type: "calendar",
  },
  {
    title: "公布日(この日以前) ",
    placeholder: "選択してください",
    name: "promulgation_date_to",
    type: "calendar",
  },
  {
    title: "廃止等の状態",
    placeholder: "選択してください",
    name: "repeal_status",
    type: "select",
    options: repealStatusListMap,
  },
  {
    title: "取得上限値",
    placeholder: "選択してください",
    name: "limit",
    type: "input",
  },
  {
    title: "取得開始位置",
    placeholder: "選択してください",
    name: "offset",
    type: "input",
  },
];
