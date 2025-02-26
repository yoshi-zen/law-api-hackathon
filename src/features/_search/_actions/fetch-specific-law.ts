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
  elm?: string | null,
): Promise<ErrorResponse | SuccessResponse<LawDataResponseType>> => {
  const apiEndpoint = process.env.API_ENDPOINT;
  const url = elm
    ? `${apiEndpoint}/law_data/${lawId}?elm=${elm}`
    : `${apiEndpoint}/law_data/${lawId}`;
  const response = await fetch(url);

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

  const errorJson = ErrorInfoSchema.safeParse(data);
  if (errorJson.success) {
    const timeStamp = Date.now();
    return {
      status: "error",
      timeStamp: timeStamp,
      errorInfo: errorJson.data,
    };
  }

  const parsedJson = LawDataResponseSchema.safeParse(data);

  if (!parsedJson.success) {
    const timeStamp = Date.now();
    return {
      status: "error",
      timeStamp: timeStamp,
      errorInfo: {
        code: "TYPE_ERROR",
        message: parsedJson.error.message,
      },
    };
  }

  return {
    status: "success",
    timeStamp: Date.now(),
    data: parsedJson.data,
  };
};
