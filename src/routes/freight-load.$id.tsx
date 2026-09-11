import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router';

export const Route = createFileRoute('/freight-load/$id')({
  staticData: {
    title: 'Freight Loads',
  },
  component: lazyRouteComponent(() => import('@/pages/FreightLoadPage')),
});
