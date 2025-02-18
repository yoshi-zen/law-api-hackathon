"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {} from "lucide-react";
import { useActionState, useCallback, useState } from "react";
import { twMerge } from "tailwind-merge";
import { fetchLawList } from "../../_actions/fetch-laws";
import { searchConditions } from "../../_consts/search-condition-list";
import { InputCalendarCondition } from "../input-calendar-condition";
import { InputCondition } from "../input-condition";
import { MultiSelectCondition } from "../multi-select-condition";
import { SelectCondition } from "../select-condition";

export const InputConditionList = () => {
  const [message, formAction, isPending] = useActionState(fetchLawList, null);

  /** 開かれているAccordionItemの識別 */
  const [openingAccordionItem, setOpeningAccordionItem] = useState("");

  /** Accordionの開閉状態を変更する関数 */
  const onValueChange = useCallback((value: string) => {
    setOpeningAccordionItem(value);
  }, []);

  const handleCloseAccordion = () => {
    setOpeningAccordionItem("");
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="flex w-full flex-col gap-2">
        <h2 className="self-start font-bold">法令検索</h2>
        <Accordion
          type="single"
          collapsible
          value={openingAccordionItem}
          onValueChange={onValueChange}
        >
          <AccordionItem value="search">
            <form action={formAction}>
              <div className="grid w-full grid-cols-[1fr_auto] gap-2">
                <div className="relative grid w-full grid-cols-[1fr_auto]">
                  <Input
                    name="law_title"
                    placeholder="例：個人情報保護法"
                    className="z-10 mb-2 h-10 rounded-r-none"
                  />
                  <AccordionTrigger
                    className={twMerge(
                      "flex gap-2 cursor-pointer h-10 items-center justify-center rounded-r-md font-bold text-sm border border-l-0 duration-150 px-3",
                      openingAccordionItem === "search"
                        ? "text-white bg-gray-600"
                        : "text-gray-600 bg-white",
                    )}
                  >
                    詳細検索
                  </AccordionTrigger>
                </div>
                <Button
                  type="submit"
                  onClick={handleCloseAccordion}
                >
                  検索
                </Button>
              </div>
              <AccordionContent>
                <div className="grid w-full grid-cols-3 gap-1 overflow-scroll pt-4">
                  {searchConditions.map((cond, idx) => {
                    switch (cond.type) {
                      case "input":
                        return (
                          <InputCondition
                            key={`${cond.name}-${idx}`}
                            title={cond.title}
                            placeholder={cond.placeholder}
                            name={cond.name}
                          />
                        );
                      case "select":
                        return (
                          <SelectCondition
                            key={`${cond.name}-${idx}`}
                            title={cond.title}
                            name={cond.name}
                            options={cond.options}
                          />
                        );
                      case "multi-select":
                        return (
                          <MultiSelectCondition
                            key={`${cond.name}-${idx}`}
                            title={cond.title}
                            name={cond.name}
                            options={cond.options}
                          />
                        );
                      case "calendar":
                        return (
                          <InputCalendarCondition
                            key={`${cond.name}-${idx}`}
                            title={cond.title}
                            name={cond.name}
                          />
                        );
                    }
                  })}
                </div>
              </AccordionContent>
            </form>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};
