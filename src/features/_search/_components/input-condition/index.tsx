import { Input } from "@/components/ui/input";
import type { ComponentProps, FC } from "react";

type Props = {
  title: string;
} & ComponentProps<"input">;

export const InputCondition: FC<Props> = (props: Props) => {
  const { title, ...inputProps } = props;
  return (
    <div className="flex flex-col gap-2 rounded-md bg-white px-2 py-2">
      <p className="text-xs font-semibold">{title}</p>
      <Input
        {...inputProps}
        className="h-8"
      />
    </div>
  );
};
