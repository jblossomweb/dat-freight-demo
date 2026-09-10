import { createFileRoute } from '@tanstack/react-router';

import StyleGuidePage from '@/pages/StyleGuidePage';

export const Route = createFileRoute('/style-guide')({
  staticData: {
    title: 'Style Guide',
  },
  component: () => <StyleGuidePage />,
});
