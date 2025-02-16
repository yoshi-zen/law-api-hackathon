import type { Meta } from "@storybook/react";
import { InputCondition } from ".";

const meta: Meta<typeof InputCondition> = {
  title: "features/_search/input-condition",
  component: InputCondition,
  tags: ["autodocs"],
};

export default meta;

export const Default = {
  args: {
    title: "法令ID",
    placeholder: "322CO0000000016",
  },
};
