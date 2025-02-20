"use client";
import { getIndentedTexts } from "@/components/page/app-sidebar";
import { InputConditionList } from "@/features/_search/_components/input-condition-list";
import { Mock } from "@/features/_search/_mock/mock-data";

export default function Home() {
  const itemMock = Mock.law_full_text;
  const texts = getIndentedTexts(itemMock);

  return (
    <main className="flex">
      <div className="p-4">
        {texts.map((text, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <p key={index}>{text}</p>
        ))}
        <InputConditionList />
      </div>
    </main>
  );
}
