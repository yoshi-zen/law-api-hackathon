import type { Meta, StoryObj } from "@storybook/react";
import { MultiSelectCondition } from ".";

const meta: Meta<typeof MultiSelectCondition> = {
  title: "features/_search/multi-select-condition",
  component: MultiSelectCondition,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof MultiSelectCondition>;

export const Default: Story = {
  args: {
    title: "法令種別",
    options: [
      {
        label: "法令種別1",
        value: "1",
      },
      {
        label: "法令種別2",
        value: "2",
      },
      {
        label: "法令種別3",
        value: "3",
      },
    ],
  },
};
