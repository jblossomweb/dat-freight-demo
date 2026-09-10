import { describe, expect, it } from 'vitest';

import formatNumber from './formatNumber';

describe('formatNumber', () => {
  it('adds thousands separators', () => {
    expect(formatNumber(42000)).toBe('42,000');
  });

  it('formats zero', () => {
    expect(formatNumber(0)).toBe('0');
  });
});
