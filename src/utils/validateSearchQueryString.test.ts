import { describe, expect, it } from 'vitest';

import validateSearchQueryString from './validateSearchQueryString';

describe('validateSearchQueryString', () => {
  it('retains a string q value', () => {
    expect(validateSearchQueryString({ q: 'Salt Lake' })).toEqual({
      q: 'Salt Lake',
    });
  });

  it('returns undefined when q is missing', () => {
    expect(validateSearchQueryString({})).toEqual({ q: undefined });
  });

  it('returns undefined when q is not a string', () => {
    expect(validateSearchQueryString({ q: 123 })).toEqual({ q: undefined });
  });
});
