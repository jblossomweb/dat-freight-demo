import { createFileRoute } from '@tanstack/react-router';

import Home from '../pages/Home';

export const Route = createFileRoute('/')({
  component: IndexComponent,
});

// eslint-disable-next-line react-refresh/only-export-components
function IndexComponent() {
  return (
    <Home />
  );
}
