import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ComponentDecorator } from 'twenty-ui';

import {
    TextInputV2,
    TextInputV2ComponentProps,
} from '@/ui/input/components/TextInputV2';

type RenderProps = TextInputV2ComponentProps;

const Render = (args: RenderProps) => {
  const [value, setValue] = useState(args.value);
  const handleChange = (text: string) => {
    args.onChange?.(text);
    setValue(text);
  };

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <TextInputV2 {...args} value={value} onChange={handleChange} />;
};

const meta: Meta<typeof TextInputV2> = {
  title: 'UI/Input/TextInputV2',
  component: TextInputV2,
  decorators: [ComponentDecorator],
  args: { placeholder: 'Vinícius' },
  render: Render,
};

export default meta;
type Story = StoryObj<typeof TextInputV2>;

export const Default: Story = {};

export const Filled: Story = {
  args: { value: 'Vinícius' },
};

export const Disabled: Story = {
  args: { disabled: true, value: 'Vinícius' },
};

export const AutoGrow: Story = {
  args: { autoGrow: true, value: 'Vinícius' },
};

export const AutoGrowWithPlaceholder: Story = {
  args: { autoGrow: true, placeholder: 'Vinícius' },
};

export const Small: Story = {
  args: { sizeVariant: 'sm', value: 'Vinícius' },
};

export const AutoGrowSmall: Story = {
  args: { autoGrow: true, sizeVariant: 'sm', value: 'Vinícius' },
};

export const WithLeftAdornment: Story = {
  args: {
    leftAdornment: 'https://',
  },
};

export const WithRightAdornment: Story = {
  args: {
    rightAdornment: '@twenty.com',
  },
};
