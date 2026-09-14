import { describe, expect, it, vi } from 'vitest';

import lazyPreload from './lazyPreload';

describe('lazyPreload', () => {
  it('loads a component once and reuses the same promise', async () => {
    const component = () => null;
    const componentModule = { default: component };
    const loader = vi.fn(() => Promise.resolve(componentModule));
    const [, preload] = lazyPreload(loader);

    const firstPreload = preload();
    const secondPreload = preload();

    expect(firstPreload).toBe(secondPreload);
    await expect(firstPreload).resolves.toBe(componentModule);
    expect(loader).toHaveBeenCalledOnce();
  });
});
