"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { fetchSpecificLaw } from "@/features/_search/_actions/fetch-specific-law";
import { editModeAtom, specificLawAtom } from "@/jotai/atoms";
import type { FullText } from "features/_search/_types/_common/law-data-response";
import { useAtom, useAtomValue } from "jotai";
import { Pencil } from "lucide-react";
import { useSearchParams } from "next/navigation";
import {
  type Dispatch,
  type FC,
  type SetStateAction,
  Suspense,
  useEffect,
  useState,
} from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  isV: boolean;
  setIsV: Dispatch<SetStateAction<boolean>>;
};

export const EditView: FC<Props> = (props: Props) => {
  const { isV, setIsV } = props;

  const [specificArticle, setSpecificArticle] = useState<FullText | null>(null);
  const [isEditMode, setIsEditMode] = useAtom(editModeAtom);
  const searchParams = useSearchParams();
  const law = useAtom(specificLawAtom);

  const elm = searchParams.get("elm");

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchSpecificLaw(
          law[0]?.law_info.law_id || "",
          elm,
        );
        if (response.status === "success") {
          setSpecificArticle(response.data.law_full_text as FullText);
          console.log("success", response);
        }
        console.log("error", response);
      } catch (e) {}
    };
    fetchData();
  }, [searchParams]);

  return (
    <Suspense>
      <div className="relative flex h-full w-full justify-end overflow-x-auto text-sm">
        <div
          className={twMerge(
            "flex flex-col p-2 h-full w-full",
            isV && "[writing-mode:vertical-rl] self-start",
          )}
        >
          {specificArticle?.children?.map((child, idx) => (
            <ViewerElementByTag
              items={child as FullText}
              key={`${(child as FullText).tag}-${idx}`}
              isV={isV}
            />
          ))}
        </div>
        <button
          type="button"
          className={twMerge(
            "fixed bottom-6 right-6 rounded-full cursor-pointer p-2 shadow-md bg-white border-2 border-solid border-blue-700 duration-150",
            isEditMode && "bg-blue-700",
          )}
          onClick={() => setIsEditMode(!isEditMode)}
        >
          <Pencil
            className={twMerge("text-blue-700", isEditMode && "text-white")}
          />
        </button>
      </div>
    </Suspense>
  );
};

const ViewerElementByTag = ({
  items,
  isV,
}: { items: FullText; isV: boolean }) => {
  const isEditMode = useAtomValue(editModeAtom);
  switch (items.tag) {
    case "ArticleCaption":
      return (
        <h2 className={twMerge("text-sm pb-2", isV && "p-0")}>
          <span>条見出し：</span>
          {isEditMode ? (
            <Input
              className={twMerge("inline h-5  w-fit", isV && "h-fit")}
              defaultValue={(items.children?.[0] as string) ?? ""}
            />
          ) : (
            <span className="font-bold">
              {(items.children?.[0] as string) ?? ""}
            </span>
          )}
        </h2>
      );
    case "ArticleTitle":
      return (
        <h2 className="text-sm font-bold">
          {(items.children?.[0] as string) ?? ""}
        </h2>
      );
    case "Paragraph":
      return (
        <div className="flex flex-col gap-5 pb-4">
          <div>
            {items.children?.map((c, idx) => {
              return (
                <ViewerElementByTag
                  key={`${(c as FullText).tag}-${idx}`}
                  items={c as FullText}
                  isV={isV}
                />
              );
            }) ?? null}
          </div>
          {isEditMode && (
            <Button
              type="button"
              variant="outline"
              className={twMerge("w-fit h-7", isV && "h-fit w-5")}
            >
              新しい項を追加
            </Button>
          )}
        </div>
      );
    case "ParagraphNum":
      return (
        <p className="font-bold">{(items.children?.[0] as string) ?? ""}</p>
      );
    case "ParagraphSentence":
      return items.children?.map((c, idx) => {
        return isEditMode ? (
          <Textarea
            key={`${(c as FullText).tag}-${idx}`}
            className={twMerge("inline h-5  w-full", isV && "w-auto h-full")}
            defaultValue={((c as FullText).children?.[0] as string) ?? ""}
          />
        ) : (
          <p key={`${(c as FullText).tag}-${idx}`}>
            {((c as FullText).children?.[0] as string) ?? ""}
          </p>
        );
      });
    case "Item":
      return (
        <div
          className={twMerge("flex flex-col gap-4 pb-6", isV ? "pt-4" : "pl-4")}
        >
          <div>
            {items.children?.map((c, idx) => {
              return (
                <div key={`${(c as FullText).tag}-${idx}`}>
                  <ViewerElementByTag
                    items={c as FullText}
                    isV={isV}
                  />
                </div>
              );
            }) ?? null}
          </div>
          {isEditMode && (
            <Button
              type="button"
              variant="outline"
              className={twMerge("w-fit h-7", isV && "h-fit w-5")}
            >
              新しい号を追加
            </Button>
          )}
        </div>
      );
    case "ItemTitle":
      return (
        <p className="font-bold">{(items.children?.[0] as string) ?? ""}</p>
      );

    case "ItemSentence":
      return items.children?.map((c, idx) => {
        return (
          <ViewerElementByTag
            key={`${(c as FullText).tag}-${idx}`}
            items={c as FullText}
            isV={isV}
          />
        );
      });
    case "Sentence":
      return isEditMode ? (
        <Textarea
          defaultValue={items.children?.[0] as string}
          className={twMerge("h-fit", isV && "w-auto h-full")}
        />
      ) : (
        <p>{items.children?.[0] as string}</p>
      );

    case "Column":
      return items.children?.map((c, idx) => {
        return (
          <ViewerElementByTag
            key={`${(c as FullText).tag}-${idx}`}
            items={c as FullText}
            isV={isV}
          />
        );
      });

    default:
      return <p>{items.tag}</p>;
  }
};
