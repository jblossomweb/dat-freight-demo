import { createFileRoute } from '@tanstack/react-router';

import FreightLoadsPage from '@/pages/FreightLoadsPage';

export const Route = createFileRoute('/freight-loads')({
  staticData: {
    title: 'Freight Loads',
  },
  component: () => <FreightLoadsPage />,
});
