import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router';

import validateSearchQueryString from '@/utils/validateSearchQueryString';

export const Route = createFileRoute('/stats')({
  validateSearch: validateSearchQueryString,
  staticData: {
    title: 'Statistics',
  },
  component: lazyRouteComponent(() => import('@/pages/StatsPage')),
});
