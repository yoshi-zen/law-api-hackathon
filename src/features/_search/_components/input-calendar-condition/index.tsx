"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { type ComponentProps, type FC, useState } from "react";

type Props = {
  title: string;
} & ComponentProps<"input">;

export const InputCalendarCondition: FC<Props> = (props: Props) => {
  const { title, ...inputProps } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

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
            className="w-full justify-start font-normal"
          >
            {date ? format(date, "yyyy-MM-dd") : "選択してください"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            disabled={(date) =>
              date > new Date() || date < new Date("1850-01-01")
            }
            selected={date}
            onSelect={setDate}
          />
        </PopoverContent>
      </Popover>
      {date && (
        <input
          type="hidden"
          value={format(date, "yyyy-MM-dd")}
          {...inputProps}
        />
      )}
    </div>
  );
};
