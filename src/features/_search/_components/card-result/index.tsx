import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "components/ui/accordion";
import { Badge } from "components/ui/badge";
import { format, parse } from "date-fns";
import { ja } from "date-fns/locale/ja";
import { CardGridItem } from "features/_search/_components/card-result/card-grid-item/index";
import { AmendmentTypeListMap } from "features/_search/_types/_common/amendment-type";
import { lawNumTypeMap } from "features/_search/_types/_common/law-num-type";
import type { LawsResponseType } from "features/_search/_types/_common/laws-response";
import { repealStatusListMap } from "features/_search/_types/_common/repeal-status";
import type { FC } from "react";
import { GoCalendar, GoLaw, GoNumber, GoSearch } from "react-icons/go";
import { TbCategory } from "react-icons/tb";
import { DialogSelectLaw } from "../dialog-select-law";

type Props = {
  law: LawsResponseType["laws"][number];
};

export const CardResult: FC<Props> = (props: Props) => {
  const { law } = props;

  return (
    <div className="w-full rounded-md border border-solid border-gray-200 bg-white px-2 py-2 pt-0">
      <Accordion type="multiple">
        <AccordionItem
          value="law"
          className="p-0"
        >
          <AccordionTrigger className="p-0 no-underline">
            <div className="flex flex-col gap-2 pb-0.5">
              <p className="flex items-end gap-2 text-2xs leading-4">
                <span className="block w-fit bg-gray-600 px-2 font-semibold text-white">
                  {
                    lawNumTypeMap.find(
                      (lawNumType) =>
                        lawNumType.value === law.law_info.law_type,
                    )?.label
                  }
                </span>
                <span className="flex items-center gap-1 leading-3">
                  <span>
                    {format(
                      parse(
                        law.law_info.promulgation_date,
                        "yyyy-MM-dd",
                        new Date(),
                      ),
                      "yyyy年MM月dd日",
                      { locale: ja },
                    )}
                  </span>
                  <span className="text-3xs">公布</span>
                </span>
              </p>
              <h3 className="text-left text-xs font-bold">
                <span>
                  {law.current_revision_info.law_title}（{law.law_info.law_num}
                  ）
                </span>
                {law.current_revision_info.repeal_status !== "None" && (
                  <Badge
                    variant="destructive"
                    className="p-0 px-1 text-2xs"
                  >
                    {
                      repealStatusListMap.find(
                        (repealStatusList) =>
                          repealStatusList.value ===
                          law.current_revision_info.repeal_status,
                      )?.label
                    }
                  </Badge>
                )}
              </h3>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-0">
            <hr className="text-gray-400" />
            <div className="flex flex-col gap-2 py-2">
              <div className="flex flex-col gap-2">
                <h4 className="text-xs font-semibold text-gray-800">
                  基本情報
                </h4>
                <div className="grid min-w-full grid-cols-[120px_1fr] items-center justify-start gap-x-1">
                  <CardGridItem
                    icon={<GoLaw size={10} />}
                    title="法令ID"
                    content={law.law_info.law_id}
                  />
                  <CardGridItem
                    icon={<GoNumber size={10} />}
                    title="法令番号"
                    content={law.law_info.law_num}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="text-xs font-semibold text-gray-800">
                  <span>最新の履歴における法令情報：</span>
                  <span className="rounded-sm bg-gray-700 px-2 py-0.5 text-2xs text-white">
                    {
                      AmendmentTypeListMap.find(
                        (amendmentType) =>
                          law.current_revision_info.amendment_type ===
                          amendmentType.value,
                      )?.label
                    }
                  </span>
                </h4>
                <div className="grid min-w-full grid-cols-[120px_1fr] items-center justify-start gap-x-1">
                  <CardGridItem
                    icon={<GoLaw size={10} />}
                    title="法令履歴ID"
                    content={law.current_revision_info.law_revision_id}
                  />
                  <CardGridItem
                    icon={<GoLaw size={10} />}
                    title="改正法令ID"
                    content={law.current_revision_info.amendment_law_id ?? "-"}
                  />
                  <CardGridItem
                    icon={<GoSearch size={10} />}
                    title="法令名"
                    content={law.current_revision_info.law_title}
                  />
                  <CardGridItem
                    icon={<TbCategory size={10} />}
                    title="法令分野分類"
                    content={law.current_revision_info.category}
                  />
                  <CardGridItem
                    icon={<GoCalendar size={10} />}
                    title="改正法令公布日"
                    content={format(
                      parse(
                        law.current_revision_info.amendment_promulgate_date,
                        "yyyy-MM-dd",
                        new Date(),
                      ),
                      "yyyy年MM月dd日",
                      { locale: ja },
                    )}
                  />
                  <CardGridItem
                    icon={<GoCalendar size={10} />}
                    title="改正法令施行日"
                    content={format(
                      parse(
                        law.current_revision_info.amendment_enforcement_date,
                        "yyyy-MM-dd",
                        new Date(),
                      ),
                      "yyyy年MM月dd日",
                      { locale: ja },
                    )}
                  />
                  <CardGridItem
                    icon={<GoSearch size={10} />}
                    title="改正法令名"
                    content={
                      law.current_revision_info.amendment_law_title ?? "-"
                    }
                  />
                </div>
              </div>
            </div>
            <DialogSelectLaw law={law} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
