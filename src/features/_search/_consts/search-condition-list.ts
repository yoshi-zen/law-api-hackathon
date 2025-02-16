import { lawNumEraMap } from "../_types/_common/law-num-era";

type SearchConditionsType = {
  title: string;
  placeholder: string;
  type: "input" | "select" | "multi-select";
  options?: Array<{ value: string; label: string }>;
};

const searchConditions: SearchConditionsType[] = [
  {
    title: "法令ID",
    placeholder: "322CO0000000016",
    type: "input",
  },
  {
    title: "法令番号",
    placeholder: "平成22年法律第16号",
    type: "input",
  },
  {
    title: "法令番号の元号",
    placeholder: "選択してください",
    type: "select",
    options: lawNumEraMap,
  },
  {
    title: "法令番号の号数",
    placeholder: "16",
    type: "input",
  },
  {
    title: "法令番号の法令種別",
    placeholder: "選択してください",
    type: "select",
  },
];
