import type { FC, ReactNode } from "react";

type Props = {
  icon: ReactNode;
  title: string;
  content: ReactNode;
};

export const CardGridItem: FC<Props> = (props: Props) => {
  const { icon, title, content } = props;

  return (
    <div className="contents">
      <div className="flex items-center gap-1">
        {icon}
        <span className="text-2xs leading-3">{title}</span>
      </div>
      <span className="text-2xs leading-3 text-gray-600">{content}</span>
    </div>
  );
};
