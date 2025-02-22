import Mock from "@/features/_search/_mock/mock-data";
import type { LawDataResponseType } from "features/_search/_types/_common/law-data-response";
import { atom } from "jotai";

export const specificLawAtom = atom<LawDataResponseType | undefined>(
  Mock as LawDataResponseType,
);
