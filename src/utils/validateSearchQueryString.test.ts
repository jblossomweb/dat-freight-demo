import { describe, expect, it } from 'vitest';

import validateSearchQueryString from './validateSearchQueryString';

describe('validateSearchQueryString', () => {
  it('retains a string q value', () => {
    expect(validateSearchQueryString({ q: 'Salt Lake' })).toEqual({
      q: 'Salt Lake',
      dataSource: undefined,
    });
  });

  it('returns undefined when q is missing', () => {
    expect(validateSearchQueryString({})).toEqual({ q: undefined, dataSource: undefined });
  });

  it('returns undefined when q is not a string', () => {
    expect(validateSearchQueryString({ q: 123 })).toEqual({ q: undefined, dataSource: undefined });
  });

  it('retains a valid dataSource value', () => {
    expect(validateSearchQueryString({ dataSource: 'api' })).toEqual({
      q: undefined,
      dataSource: 'api',
    });

    expect(validateSearchQueryString({ dataSource: 'json' })).toEqual({
      q: undefined,
      dataSource: 'json',
    });
  });

  it('returns undefined when dataSource is invalid', () => {
    expect(validateSearchQueryString({ dataSource: 'unsupported' })).toEqual({
      q: undefined,
      dataSource: undefined,
    });
  });
});
