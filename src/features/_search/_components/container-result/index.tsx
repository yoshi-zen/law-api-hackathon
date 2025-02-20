import type { FC } from "react";
import type { FetchLawsResponse } from "../../_actions/fetch-laws";
import { CardResult } from "../card-result";

type Props = {
  result: FetchLawsResponse | null;
  isLoading: boolean;
};

export const ContainerResult: FC<Props> = (props: Props) => {
  const { result, isLoading } = props;

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (result === null) {
    return null;
  }

  if (result.status === "error") {
    return (
      <div>
        <p>{result.errorInfo.message}</p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <p className="text-xs text-gray-400">
        検索結果：
        <span className="text-sm text-gray-800">
          {result.lawsResponse.count}
        </span>
        &nbsp;件見つかりました。
      </p>
      <div className="grid w-full grid-cols-1 gap-2">
        {result.lawsResponse.laws.map((law) => (
          <CardResult
            key={law.law_info.law_id}
            law={law}
          />
        ))}
      </div>
    </div>
  );
};
