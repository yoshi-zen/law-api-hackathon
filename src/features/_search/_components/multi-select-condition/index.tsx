import type { FC } from "react";

type Props = {
  title: string;
  options: Array<{ value: string; label: string }>;
};

export const MultiSelectCondition: FC<Props> = (props: Props) => {
  const { title, options } = props;

  return (
    <div className="flex flex-col gap-2 rounded-md bg-white px-4 py-4">
      <p>{title}</p>
    </div>
  );
};
