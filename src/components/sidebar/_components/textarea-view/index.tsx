import type { FullText } from "features/_search/_types/_common/law-data-response";
import type { FC } from "react";

type Props = {
  item: FullText;
};

export const EditView: FC<Props> = (props: Props) => {
  const { item } = props;
  return <div className="p-2 text-xs">{item.tag}</div>;
};
