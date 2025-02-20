"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { SelectProps } from "@radix-ui/react-select";
import {} from "components/ui/select";
import { Check, ChevronsUpDown } from "lucide-react";
import { type FC, useState } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  title: string;
  options: Array<{ value: string; label: string }>;
} & SelectProps;

export const SelectCondition: FC<Props> = (props: Props) => {
  const { title, options, ...selectProps } = props;

  const [label, setLabel] = useState<string | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col gap-2 rounded-md bg-white px-2 py-2">
      <p className="text-xs font-semibold">{title}</p>
      <Popover
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={isOpen}
            className={twMerge(
              "flex h-8 w-full items-center justify-between font-medium",
              label ? "text-gray-900" : "text-gray-500",
            )}
          >
            {label ?? "選択してください"}
            <ChevronsUpDown className="text-gray-500" />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Command>
            <CommandInput placeholder="検索..." />
            <CommandList>
              <CommandEmpty>検索結果がありません</CommandEmpty>
              <CommandGroup>
                {options.map((option, idx) => {
                  return (
                    <CommandItem
                      key={`${option.value}-${idx}`}
                      value={option.label}
                      className="cursor-pointer"
                      onSelect={(value) => {
                        setLabel(label === value ? undefined : value);
                        setIsOpen(false);
                      }}
                    >
                      {option.label}
                      <Check
                        className={twMerge(
                          "ml-auto",
                          label === option.label ? "opacity-100" : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {label && (
        <input
          type="hidden"
          value={options.find((option) => option.label === label)?.value}
          {...selectProps}
        />
      )}
    </div>
  );
};
