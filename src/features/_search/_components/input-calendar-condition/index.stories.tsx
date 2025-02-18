import type { Meta } from "@storybook/react";
import { InputCalendarCondition } from ".";

const meta: Meta<typeof InputCalendarCondition> = {
  title: "features/_search/input-calendar-condition",
  component: InputCalendarCondition,
  tags: ["autodocs"],
};

export default meta;

export const Default = {
  args: {
    title: "事項別分類コード",
  },
};
