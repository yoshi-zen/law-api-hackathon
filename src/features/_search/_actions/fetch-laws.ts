"use server";

import { ErrorInfoSchema } from "../_types/_common/error-info";
import { LawsResponseSchema } from "../_types/_common/laws-response";
import { SchemaFetchLaws } from "../_types/_custom/schema-fetch-laws";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const fetchLawList = async (_prevState: any, formData: FormData) => {
  const obj = Object.fromEntries(formData);

  const result = SchemaFetchLaws.safeParse(obj);

  if (!result.success) {
    const timeStamp = Date.now();
    console.log(result.error);
    return {
      toast: {
        status: "error",
        message: "入力内容に誤りがあります",
        timeStamp: timeStamp,
      },
      laws: null,
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

  if (!response.ok) {
    return {
      toast: {
        status: "error",
        message: "エラーが発生しました",
        timeStamp: Date.now(),
      },
    };
  }

  const json = await response.json();

  console.log(JSON.stringify(json, null, 2));

  const parsedJson = LawsResponseSchema.safeParse(json);
  if (parsedJson.success) {
    console.log(parsedJson.data.laws);
    return {
      toast: {
        status: "success",
        message: "取得しました",
        timeStamp: Date.now(),
      },
      laws: parsedJson.data.laws,
    };
  }
  console.log(parsedJson.error);

  const errorJson = ErrorInfoSchema.safeParse(json);
  if (errorJson.success) {
    return {
      toast: {
        status: "error",
        message: errorJson.data.message,
        timeStamp: Date.now(),
      },
    };
  }

  return {
    toast: {
      status: "error",
      message: "エラーが発生しました",
      timeStamp: Date.now(),
    },
  };
};
