"use server";

import { ErrorInfoSchema } from "features/_search/_types/_common/error-info";
import {
  LawDataResponseSchema,
  type LawDataResponseType,
} from "features/_search/_types/_common/law-data-response";
import type {
  ErrorResponse,
  SuccessResponse,
} from "features/_search/_types/_custom/response-type";

export const fetchSpecificLaw = async (
  lawId: string,
): Promise<ErrorResponse | SuccessResponse<LawDataResponseType>> => {
  const apiEndpoint = process.env.API_ENDPOINT;
  const response = await fetch(`${apiEndpoint}/law_data/${lawId}`);

  if (!response.ok) {
    const timeStamp = Date.now();
    const errorInfo = await response.json();

    return {
      status: "error",
      timeStamp: timeStamp,
      errorInfo: errorInfo,
    };
  }

  const data = await response.json();
  const parsedJson = LawDataResponseSchema.safeParse(data);

  if (parsedJson.success) {
    const timeStamp = Date.now();
    return {
      status: "success",
      timeStamp: timeStamp,
      data: parsedJson.data,
    };
  }

  const errorJson = ErrorInfoSchema.safeParse(data);
  if (errorJson.success) {
    const timeStamp = Date.now();
    return {
      status: "error",
      timeStamp: timeStamp,
      errorInfo: errorJson.data,
    };
  }

  return {
    status: "error",
    timeStamp: Date.now(),
    errorInfo: {
      code: "UNKNOWN_ERROR",
      message: "不明なエラーが発生しました",
    },
  };
};
