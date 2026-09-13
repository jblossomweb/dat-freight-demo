import type { DataSource } from '@/types/DataSource';

const DATA_SOURCE_STORAGE_KEY = 'dat-freight-demo:data-source';

export const getDataSource = (): DataSource => {
  if (typeof window === 'undefined') {
    return 'json';
  }

  const value = window.localStorage.getItem(DATA_SOURCE_STORAGE_KEY);

  return value === 'api' || value === 'json' ? value : 'json';
};

export const setDataSource = (mode: DataSource) => {
  window.localStorage.setItem(DATA_SOURCE_STORAGE_KEY, mode);
};
