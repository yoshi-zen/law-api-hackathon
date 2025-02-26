import type { LawDataResponseType } from "features/_search/_types/_common/law-data-response";
import { atom } from "jotai";

export const specificLawAtom = atom<LawDataResponseType | undefined>(undefined);

export const editModeAtom = atom<boolean>(false);
export const isV = atom<boolean>(false);
