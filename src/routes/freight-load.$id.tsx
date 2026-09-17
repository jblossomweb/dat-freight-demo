import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router';

import validateSearchQueryString from '@/utils/validateSearchQueryString';

export const Route = createFileRoute('/freight-load/$id')({
  validateSearch: validateSearchQueryString,
  staticData: {
    title: 'Freight Loads',
  },
  component: lazyRouteComponent(() => import('@/pages/FreightLoadPage')),
});
