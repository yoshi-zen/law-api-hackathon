"use client";

import { Switch } from "@/components/ui/switch";
import { EditView } from "@/features/_edit/_components/textarea-view";
import { specificLawAtom } from "@/jotai/atoms";
import { InputConditionList } from "features/_search/_components/input-condition-list";
import { useAtomValue } from "jotai";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export default function Home() {
  const selectedLaw = useAtomValue(specificLawAtom);
  const [isVerticalMode, setIsVerticalMode] = useState(false);

  return (
    <main
      className={twMerge(
        isVerticalMode && "h-full max-h-full grid grid-rows-[auto_1fr]",
      )}
    >
      <div
        className={twMerge(
          "sticky top-0 flex items-center justify-end gap-2 py-2  bg-gray-100",
          isVerticalMode && "right-0",
        )}
      >
        <Switch
          checked={isVerticalMode}
          onCheckedChange={setIsVerticalMode}
        />
        <span>縦書きモード</span>
      </div>
      {selectedLaw ? (
        <EditView
          isV={isVerticalMode}
          setIsV={setIsVerticalMode}
        />
      ) : (
        <InputConditionList />
      )}
    </main>
  );
}
