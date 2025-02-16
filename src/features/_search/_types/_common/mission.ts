import { z } from "zod";

const missionList = ["New", "Partial"] as const;
const missionListLabel = ["新規制定または被改正法令", "一部改正法令"];

export const missionListMap = missionList.map((mission, index) => ({
  label: missionListLabel[index],
  value: mission,
}));

/**
 * 新規制定・一部改正を指す。
 */
export const MissionSchema = z.enum(missionList);

export type MissionType = z.infer<typeof MissionSchema>;
