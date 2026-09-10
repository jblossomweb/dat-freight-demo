import { createFileRoute } from '@tanstack/react-router';

import FreightLoadPage from '@/pages/FreightLoadPage';

export const Route = createFileRoute('/freight-load/$id')({
  staticData: {
    title: 'Freight Loads',
  },
  component: () => <FreightLoadPage />,
});
