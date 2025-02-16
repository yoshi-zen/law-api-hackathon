import type { SelectProps } from "@radix-ui/react-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/ui/select";
import type { FC } from "react";

type Props = {
  title: string;
  options: Array<{ value: string; label: string }>;
} & SelectProps;

export const SelectCondition: FC<Props> = (props: Props) => {
  const { title, options, ...selectProps } = props;
  return (
    <div className="flex flex-col gap-2 rounded-md bg-white px-4 py-4">
      <p>{title}</p>
      <Select {...selectProps}>
        <SelectTrigger>
          <SelectValue placeholder="選択してください" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option, idx) => (
            <SelectItem
              key={`${option.value}-${idx}`}
              value={option.value}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
