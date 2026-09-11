import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  staticData: {
    title: 'Home',
  },
  component: lazyRouteComponent(() => import('@/pages/HomePage')),
});
