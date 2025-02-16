import {} from "@/components/ui/select";
import { categoryCdLabelMap } from "../../_types/_common/category-cd";
import { lawNumEraMap } from "../../_types/_common/law-num-era";
import { lawNumTypeMap } from "../../_types/_common/law-num-type";
import { missionListMap } from "../../_types/_common/mission";
import { InputCalendarCondition } from "../input-calendar-condition";
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
        title="法令種別（複数指定可）"
        name="law_type"
        options={lawNumTypeMap}
      />
      <InputCondition
        title="改正法令の法令ID（部分一致）"
        name="amendment_law_id"
      />
      <InputCondition
        title="改正法令の法令番号（部分一致）"
        name="amendment_law_num"
      />
      <InputCalendarCondition
        title="改正法令の施行日"
        name="asof"
      />
      <MultiSelectCondition
        title="事項別法令分類コード（複数指定可）"
        name="category_cd"
        options={categoryCdLabelMap}
        withValue
      />
      <MultiSelectCondition
        title="新規制定又は被改正法令・一部改正法令を指定（複数指定可）"
        name="mission"
        options={missionListMap}
      />
    </div>
  );
};
