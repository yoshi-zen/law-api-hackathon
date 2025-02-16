import { Input } from "components/ui/input";

export const InputConditionList = () => {
  return (
    <div className="flex flex-col gap-4 bg-gray-50">
      <div className="rounded-md px-4 py-2">
        <p>法令ID</p>
        <Input />
      </div>
    </div>
  );
};
