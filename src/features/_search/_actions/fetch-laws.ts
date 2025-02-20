"use server";

import {
  ErrorInfoSchema,
  type ErrorInfoType,
} from "../_types/_common/error-info";
import {
  LawsResponseSchema,
  type LawsResponseType,
} from "../_types/_common/laws-response";
import { SchemaFetchLaws } from "../_types/_custom/schema-fetch-laws";

export type FetchLawsResponse =
  | {
      status: "error";
      timeStamp: number;
      errorInfo: ErrorInfoType;
    }
  | {
      status: "success";
      timeStamp: number;
      lawsResponse: LawsResponseType;
    };

const errorInfoCommon: ErrorInfoType = {
  code: "INVALID_FORM_DATA",
  message: "エラーが発生しました",
};

export const fetchLawList = async (
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  _prevState: any,
  formData: FormData,
): Promise<FetchLawsResponse> => {
  const obj = Object.fromEntries(formData);

  const result = SchemaFetchLaws.safeParse(obj);

  if (!result.success) {
    const timeStamp = Date.now();

    return {
      status: "error",
      timeStamp: timeStamp,
      errorInfo: errorInfoCommon,
    };
  }

  const data = result.data;

  // `law_num_year` は number に変換
  const law_num_year = data.law_num_year
    ? Number(data.law_num_year).toString()
    : undefined;

  // オブジェクトに整形
  const queryObj: Record<string, string> = Object.fromEntries(
    Object.entries({
      ...data,
      law_num_year,
    }).filter(([_, value]) => typeof value === "string" && value !== ""),
  ) as Record<string, string>;

  const query = new URLSearchParams(queryObj);
  console.log(query.toString());

  const apiEndpoint = process.env.API_ENDPOINT;

  const response = await fetch(`${apiEndpoint}/laws?${query}`);

  // fetch時の500エラーなどの処理
  if (!response.ok) {
    return {
      status: "error",
      timeStamp: Date.now(),
      errorInfo: errorInfoCommon,
    };
  }

  const json = await response.json();

  // console.log(JSON.stringify(json, null, 2));

  const parsedJson = LawsResponseSchema.safeParse(json);
  if (parsedJson.success) {
    // console.log(parsedJson.data.laws);
    return {
      status: "success",
      timeStamp: Date.now(),
      lawsResponse: parsedJson.data,
    };
  }
  // console.log(parsedJson.error);

  const errorJson = ErrorInfoSchema.safeParse(json);
  if (errorJson.success) {
    return {
      status: "error",
      timeStamp: Date.now(),
      errorInfo: errorJson.data,
    };
  }

  return {
    status: "error",
    timeStamp: Date.now(),
    errorInfo: errorInfoCommon,
  };
};
