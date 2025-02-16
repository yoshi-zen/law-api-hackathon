import {} from "@/components/ui/select";
import { lawNumEraMap } from "../../_types/_common/law-num-era";
import { lawNumTypeMap } from "../../_types/_common/law-num-type";
import { InputCondition } from "../input-condition";
import { MultiSelectCondition } from "../multi-select-condition";
import { SelectCondition } from "../select-condition";

export const InputConditionList = () => {
  return (
    <div className="flex flex-col gap-4 bg-gray-100 p-4">
      <InputCondition
        title="法令ID"
        name="law_id"
      />
      <InputCondition
        title="法令番号"
        name="law_num"
      />
      <SelectCondition
        title="法令番号の元号"
        name="law_num_era"
        options={lawNumEraMap}
      />
      <InputCondition
        title="法令番号の号数"
        name="law_num_num"
      />
      <SelectCondition
        title="法令番号の法令種別"
        name="law_num_type"
        options={lawNumTypeMap}
      />
      <InputCondition
        title="法令番号の年"
        name="law_num_year"
      />
      <InputCondition
        title="法令名又は法令略称（部分一致）"
        name="law_title"
      />
      <InputCondition
        title="法令名読み（部分一致）"
        name="law_title_kana"
      />
      <InputCondition
        title="法令名かな読み（部分一致）"
        name="law_title_kana"
      />
      <MultiSelectCondition
        title="法令種別"
        name="law_type"
        options={lawNumTypeMap}
      />
    </div>
  );
};
