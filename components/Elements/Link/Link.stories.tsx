import { Meta, Story } from "@storybook/react";

import { CustomLink } from "./CustomLink";

const meta: Meta = {
  title: "Components/Elements/Link",
  component: CustomLink,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story = (props) => (
  <CustomLink to="/" {...props}>
    Hello
  </CustomLink>
);

export const Default = Template.bind({});
Default.args = {};
