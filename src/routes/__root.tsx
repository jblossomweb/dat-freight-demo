import { Outlet, createRootRoute, useMatches, useLocation } from '@tanstack/react-router';
// import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import AppLayout from '../layout/AppLayout';

export const Route = createRootRoute({
  component: RootComponent,
});

// eslint-disable-next-line react-refresh/only-export-components
function RootComponent() {
  const  { pathname } = useLocation();
  const matches = useMatches();
  const { staticData } = matches[matches.length - 1];
  const { title } = staticData;

  return (
    <>
      <AppLayout pageTitle={title} currentPath={pathname}>
        <Outlet />
      </AppLayout>
      {/* <TanStackRouterDevtools position="bottom-right" /> */}
    </>
  );
}
