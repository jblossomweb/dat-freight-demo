import type { DataSource } from '@/types/DataSource';

export interface ValidatedSearchQueryString {
  q?: string;
  dataSource?: DataSource;
}

export const isValidQuickSearch = (value: unknown): value is string => (
  typeof value === 'string' && value.trim().length > 0
);

export const isValidDataSource = (value: unknown): value is DataSource => (
  typeof value === 'string' && ['json', 'api'].includes(value)
);

const validateSearchQueryString = (
  { q, dataSource }: Record<string, unknown>,
): ValidatedSearchQueryString => ({
  q: isValidQuickSearch(q) ? q : undefined,
  dataSource: isValidDataSource(dataSource) ? dataSource : undefined,
});

export default validateSearchQueryString;
