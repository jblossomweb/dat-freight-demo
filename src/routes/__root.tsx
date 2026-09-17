import { Outlet, createRootRoute, useMatches, useLocation } from '@tanstack/react-router';
import AppLayout from '@/layout/AppLayout';
import validateSearchQueryString from '@/utils/validateSearchQueryString';

export const Route = createRootRoute({
  validateSearch: validateSearchQueryString,
  component: RootComponent,
});

// eslint-disable-next-line react-refresh/only-export-components
function RootComponent() {
  const { pathname, search: { q: quickSearch, dataSource } } = useLocation();
  const matches = useMatches();
  const { staticData } = matches[matches.length - 1];
  const { title } = staticData;

  return (
    <>
      <AppLayout
        pageTitle={title}
        currentPath={pathname}
        quickSearch={quickSearch}
        dataSource={dataSource}
      >
        <Outlet />
      </AppLayout>
    </>
  );
}
