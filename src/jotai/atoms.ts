import type { LawDataResponseType } from "features/_search/_types/_common/law-data-response";
import { atom } from "jotai";

export const specificLaw = atom<LawDataResponseType | undefined>(undefined);
