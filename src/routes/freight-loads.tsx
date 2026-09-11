import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router';

export const Route = createFileRoute('/freight-loads')({
  staticData: {
    title: 'Freight Loads',
  },
  component: lazyRouteComponent(() => import('@/pages/FreightLoadsPage')),
});
