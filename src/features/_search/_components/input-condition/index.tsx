import { Input } from "@/components/ui/input";
import type { ComponentProps, FC } from "react";

type Props = {
  title: string;
} & ComponentProps<"input">;

export const InputCondition: FC<Props> = (props: Props) => {
  const { title, ...inputProps } = props;
  return (
    <div className="flex flex-col gap-2 rounded-md bg-white px-4 py-4">
      <p className="text-sm font-bold">{title}</p>
      <Input
        {...inputProps}
        className="h-8"
      />
    </div>
  );
};
