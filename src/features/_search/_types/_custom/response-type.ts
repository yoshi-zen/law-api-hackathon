import type { ErrorInfoType } from "features/_search/_types/_common/error-info";

export type SuccessResponse<T> = {
  status: "success";
  timeStamp: number;
  data: T;
};

export type ErrorResponse = {
  status: "error";
  timeStamp: number;
  errorInfo: ErrorInfoType;
};
