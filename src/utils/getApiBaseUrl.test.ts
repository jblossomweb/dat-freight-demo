import { afterEach, describe, expect, it, vi } from 'vitest';

const loadGetApiBaseUrl = async () => {
  vi.resetModules();
  return (await import('./getApiBaseUrl')).default;
};

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('getApiBaseUrl', () => {
  it('returns a valid configured API URL', async () => {
    vi.stubEnv('VITE_API_BASE_URL', 'https://api.example.com');

    const getApiBaseUrl = await loadGetApiBaseUrl();

    expect(getApiBaseUrl()).toEqual(new URL('https://api.example.com'));
  });

  it('throws an error when the API URL is not configured', async () => {
    vi.stubEnv('VITE_API_BASE_URL', '');

    const getApiBaseUrl = await loadGetApiBaseUrl();

    expect(getApiBaseUrl).toThrow('The API data source is not configured.');
  });

  it('throws an errorwhen the API URL is malformed', async () => {
    vi.stubEnv('VITE_API_BASE_URL', 'not a URL');

    const getApiBaseUrl = await loadGetApiBaseUrl();

    expect(getApiBaseUrl).toThrow('The API data source is malformed.');
  });
});
