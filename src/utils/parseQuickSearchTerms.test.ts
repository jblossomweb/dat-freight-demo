import { describe, expect, it } from 'vitest';

import parseQuickSearchTerms from './parseQuickSearchTerms';

describe('parseQuickSearchTerms', () => {
  it('splits unquoted terms on whitespace', () => {
    expect(parseQuickSearchTerms('Van   Chicago')).toEqual(['van', 'chicago']);
  });

  it('preserves a quoted phrase as one term', () => {
    expect(parseQuickSearchTerms('Van "New York"')).toEqual(['van', 'new york']);
  });

  it('decodes escaped quotes inside a quoted phrase', () => {
    expect(parseQuickSearchTerms('"Acme \\"Express\\""')).toEqual(['acme "express"']);
  });

  it('treats the remainder after an unmatched quote as one term', () => {
    expect(parseQuickSearchTerms('Van "New York')).toEqual(['van', 'new york']);
  });

  it('returns no terms for whitespace only', () => {
    expect(parseQuickSearchTerms('   ')).toEqual([]);
  });
});