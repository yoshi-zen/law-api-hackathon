import type { Meta, StoryObj } from "@storybook/react";
import { InputConditionList } from ".";

const meta: Meta<typeof InputConditionList> = {
  title: "features/_search/input-condition-list",
  component: InputConditionList,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof InputConditionList>;

export const Default: Story = {
  args: {},
};
