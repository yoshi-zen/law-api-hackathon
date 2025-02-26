import { Scale } from "lucide-react";

export default function TabContentDefault() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="mb-4 text-[200%]">
        <Scale />
      </div>
      <div>法令を指定してください</div>
    </div>
  );
}
