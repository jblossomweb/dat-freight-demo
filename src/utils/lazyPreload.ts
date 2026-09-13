import { lazy } from 'react';

const lazyPreload = <Props>(
  loader: () => Promise<{ default: React.ComponentType<Props> }>,
): [
  React.LazyExoticComponent<React.ComponentType<Props>>,
  () => Promise<{ default: React.ComponentType<Props> }>,
] => {
  let loadPromise: Promise<{ default: React.ComponentType<Props> }> | undefined;

  const preload = () => {
    loadPromise ??= loader();

    return loadPromise;
  };

  return [lazy(preload), preload];
};

export default lazyPreload;
