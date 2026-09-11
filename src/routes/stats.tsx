import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router';

export const Route = createFileRoute('/stats')({
  staticData: {
    title: 'Statistics',
  },
  component: lazyRouteComponent(() => import('@/pages/StatsPage')),
});
