import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { eraMap } from "../../_types/_common/law-num-era";
import { lawNumTypeMap } from "../../_types/_common/law-num-type";
import { InputCondition } from "../input-condition";

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
      <div className="rounded-md px-4 py-2">
        <p>法令番号の元号</p>
        <Select name="law_num_era">
          <SelectTrigger>
            <SelectValue placeholder="選択してください" />
          </SelectTrigger>
          <SelectContent>
            {eraMap.map((era, idx) => (
              <SelectItem
                key={`${era.en}-${idx}`}
                value={era.en}
              >
                {era.ja}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <InputCondition
        title="法令番号の号数"
        name="law_num_num"
      />
      <div className="rounded-md px-4 py-2">
        <p>法令番号の法令種別</p>
        <Select name="law_num_type">
          <SelectTrigger>
            <SelectValue placeholder="選択してください" />
          </SelectTrigger>
          <SelectContent>
            {lawNumTypeMap.map((lawNumType, idx) => (
              <SelectItem
                key={`${lawNumType.en}-${idx}`}
                value={lawNumType.en}
              >
                {lawNumType.ja}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
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
      <div className="rounded-md px-4 py-2">
        <p>法令種別</p>
        <Select name="law_type">
          <SelectTrigger>
            <SelectValue placeholder="選択してください" />
          </SelectTrigger>
          <SelectContent>
            {lawNumTypeMap.map((lawNumType, idx) => (
              <SelectItem
                key={`${lawNumType.en}-${idx}`}
                value={lawNumType.en}
              >
                {lawNumType.ja}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
