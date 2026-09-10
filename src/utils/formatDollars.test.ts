import { describe, expect, it } from 'vitest';

import formatDollars from './formatDollars';

describe('formatDollars', () => {
  it('formats whole-dollar USD values', () => {
    expect(formatDollars(2850)).toBe('$2,850');
  });

  it('rounds decimal values because fraction digits are disabled', () => {
    expect(formatDollars(2850.75)).toBe('$2,851');
  });
});
