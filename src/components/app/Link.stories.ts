import type { Meta, StoryObj } from '@storybook/tanstack-react';

import { createElement } from 'react';

import Link from './Link';

const meta = {
  title: 'components/app/Link',
  component: Link,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    to: { control: 'text' },
    params: { control: 'object', optional: true },
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sample: Story = {
  args: {
    children: 'Home',
    to: '/',
  },
  render: args => createElement(Link, args),
};
