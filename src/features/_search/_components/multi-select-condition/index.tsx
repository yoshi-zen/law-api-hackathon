"use client";

import { Badge } from "components/ui/badge";
import { Button } from "components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "components/ui/popover";
import { Check, ChevronsUpDown, CircleX } from "lucide-react";
import { type FC, useState } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  title: string;
  name: string;
  options: Array<{ value: string; label: string }>;
  withValue?: boolean;
};

export const MultiSelectCondition: FC<Props> = (props: Props) => {
  const { title, name, options, withValue } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [labels, setLabels] = useState<
    Array<Props["options"][number]["label"]>
  >([]);

  const handleRemoveLabel = (label: string) => {
    setLabels(labels.filter((value) => value !== label));
  };

  const handleAddLabel = (label: string) => {
    setLabels([...labels, label]);
  };

  return (
    <div className="col-span-2 flex flex-col gap-2 rounded-md bg-white px-3 py-3">
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
            className="flex h-fit w-full items-center justify-between"
          >
            <div className="flex grid-cols-2 flex-wrap items-center gap-1">
              {labels
                ? options
                    .filter((option) => labels.includes(option.label))
                    .map((option, idx) => (
                      <Badge
                        key={`${option.value}-${idx}`}
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        {withValue
                          ? `${option.value} - ${option.label}`
                          : option.label}
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveLabel(option.label);
                          }}
                        >
                          <CircleX className="h-1 w-1" />
                        </div>
                      </Badge>
                    ))
                : "選択してください"}
            </div>
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
                      value={
                        withValue
                          ? `${option.value} - ${option.label}`
                          : option.label
                      }
                      onSelect={(currentValue) => {
                        if (labels.includes(currentValue)) {
                          handleRemoveLabel(currentValue);
                        } else {
                          handleAddLabel(currentValue);
                        }
                      }}
                      className="cursor-pointer"
                    >
                      {withValue
                        ? `${option.value} - ${option.label}`
                        : option.label}
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
      {labels.length > 0 && (
        <input
          type="hidden"
          name={name}
          value={labels
            .map(
              (label) =>
                options.find((option) => option.label === label)?.value,
            )
            .join(",")}
        />
      )}
    </div>
  );
};
