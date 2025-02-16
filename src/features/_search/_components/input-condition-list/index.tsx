import {} from "components/ui/select";
import { categoryCdLabelMap } from "features/_search/_types/_common/category-cd";
import { lawNumEraMap } from "features/_search/_types/_common/law-num-era";
import { lawNumTypeMap } from "../../_types/_common/law-num-type";
import { missionListMap } from "../../_types/_common/mission";
import { repealStatusListMap } from "../../_types/_common/repeal-status";
import { InputCalendarCondition } from "../input-calendar-condition";
import { InputCondition } from "../input-condition";
import { MultiSelectCondition } from "../multi-select-condition";
import { RadioCondition } from "../radio-condition";
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
      <RadioCondition
        title="法令の時点（`asof`）に依存しない現在以前の最新の版の情報（current_revision_info）をレスポンスに含めるか"
        name="omit_current_revision_info"
        options={[
          { value: "true", label: "含めない" },
          { value: "false", label: "含める" },
        ]}
      />
      <InputCalendarCondition
        title="公布日(指定日を含む、指定日以降の法令を検索)"
        name="promulgation_date_from"
      />
      <InputCalendarCondition
        title="公布日(指定日を含む、指定日以前の法令を検索)"
        name="promulgation_date_to"
      />
      <SelectCondition
        title="廃止等の状態"
        name="repeal_status"
        options={repealStatusListMap}
      />
      <InputCondition
        title="取得件数の上限値"
        name="limit"
      />
      <InputCondition
        title="取得開始位置"
        name="offset"
      />
    </div>
  );
};
