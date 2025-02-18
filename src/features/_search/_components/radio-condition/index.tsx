"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { type ComponentProps, type FC, useState } from "react";

type Props = {
  title: string;
  options: Array<{ value: string; label: string }>;
} & ComponentProps<"input">;

export const RadioCondition: FC<Props> = (props: Props) => {
  const { title, options, ...inputProps } = props;

  const [value, setValue] = useState<string | undefined>(undefined);

  return (
    <div className="flex flex-col gap-2 rounded-md bg-white px-4 py-4">
      <p className="text-sm font-bold">{title}</p>
      <RadioGroup>
        {options.map((option, idx) => (
          <div
            className="flex items-center gap-2"
            key={`${option.value}-${idx}`}
          >
            <RadioGroupItem
              value={option.value}
              id={option.value}
              onClick={() => setValue(option.value)}
            />
            <Label
              htmlFor={option.value}
              className="cursor-pointer"
            >
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
      {value && (
        <input
          type="hidden"
          value={value}
          {...inputProps}
        />
      )}
    </div>
  );
};
