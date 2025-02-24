"use client";

import { EditView } from "@/components/sidebar/_components/textarea-view";
import { specificLawAtom } from "@/jotai/atoms";
import { InputConditionList } from "features/_search/_components/input-condition-list";
import { useAtomValue } from "jotai";

export default function Home() {
  const selectedLaw = useAtomValue(specificLawAtom);

  return (
    <main>
      {selectedLaw ? (
        <EditView item={selectedLaw.law_full_text} />
      ) : (
        <InputConditionList />
      )}
    </main>
  );
}
