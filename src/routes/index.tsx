import { createFileRoute } from '@tanstack/react-router';

import HomePage from '../pages/HomePage';

export const Route = createFileRoute('/')({
  staticData: {
    title: 'Home Page',
  },
  component: () => <HomePage />,
});
