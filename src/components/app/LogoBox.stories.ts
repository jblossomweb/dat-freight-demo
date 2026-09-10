import type { Meta, StoryObj } from '@storybook/tanstack-react';

import { createElement } from 'react';

import DarkBackground from '@/../.storybook/decorators/DarkBackground';

import LogoBox from './LogoBox';

const meta = {
  title: 'components/app/LogoBox',
  component: LogoBox,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    // this component is intended to be used against a dark background
    (Story) => createElement(DarkBackground, { Story }),
  ],
  tags: ['autodocs'],
  argTypes: {
    width: { control: 'number' },
  },
} satisfies Meta<typeof LogoBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Width: Story = {
  args: {
    width: 144,
  },
};
