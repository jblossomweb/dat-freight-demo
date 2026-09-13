import type { DataSource } from '@/types/DataSource';

import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router';

export const Route = createFileRoute('/freight-load/$id')({
  validateSearch: (search: Record<string, unknown>): { dataSource?: DataSource } => ({
    dataSource: search.dataSource === 'api' || search.dataSource === 'json'
      ? search.dataSource
      : undefined,
  }),
  staticData: {
    title: 'Freight Loads',
  },
  component: lazyRouteComponent(() => import('@/pages/FreightLoadPage')),
});
