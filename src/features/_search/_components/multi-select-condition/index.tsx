"use client";
import { Badge } from "@/components/ui/badge";
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
import { Check, ChevronsUpDown } from "lucide-react";
import { type FC, useState } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  title: string;
  name: string;
  options: Array<{ value: string; label: string }>;
};

export const MultiSelectCondition: FC<Props> = (props: Props) => {
  const { title, options } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [labels, setLabels] = useState<
    Array<Props["options"][number]["label"]>
  >([]);

  const handleRemoveLabel = (label: string) => {
    setLabels(labels.filter((value) => value !== label));
  };

  return (
    <div className="flex flex-col gap-2 rounded-md bg-white px-4 py-4">
      <p>{title}</p>
      <Popover
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={isOpen}
            className="flex w-full items-center justify-between"
          >
            <div className="flex items-center gap-1">
              {labels
                ? options
                    .filter((option) => labels.includes(option.label))
                    .map((option, idx) => (
                      <Badge key={`${option.value}-${idx}`}>
                        {option.label}
                      </Badge>
                    ))
                : "選択してください"}
            </div>
            <ChevronsUpDown className="text-gray-500" />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Command>
            <CommandInput placeholder="法令種別を検索..." />
            <CommandList>
              <CommandEmpty>検索結果がありません</CommandEmpty>
              <CommandGroup>
                {options.map((option, idx) => {
                  return (
                    <CommandItem
                      key={`${option.value}-${idx}`}
                      value={option.label}
                      onSelect={(currentValue) => {
                        if (labels.includes(currentValue)) {
                          setLabels(
                            labels.filter((value) => value !== currentValue),
                          );
                        } else {
                          setLabels([...labels, currentValue]);
                        }
                      }}
                      className="cursor-pointer"
                    >
                      {option.label}
                      <Check
                        className={twMerge(
                          "ml-auto",
                          labels.includes(option.label)
                            ? "opacity-100"
                            : "opacity-0",
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
    </div>
  );
};
