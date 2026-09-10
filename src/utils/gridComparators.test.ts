import { describe, expect, it } from 'vitest';

import { dateStringComparator } from './gridComparators';

describe('gridComparators', () => {
  describe('dateStringComparator', () => {
    it('returns zero for equal dates', () => {
      expect(dateStringComparator('2024-06-15', '2024-06-15')).toBe(0);
    });

    it('returns a negative value when the first date is earlier', () => {
      expect(dateStringComparator('2024-06-15', '2024-07-01')).toBeLessThan(0);
    });

    it('returns a positive value when the first date is later', () => {
      expect(dateStringComparator('2024-07-01', '2024-06-15')).toBeGreaterThan(0);
    });

    it('treats missing dates as the earliest value', () => {
      expect(dateStringComparator(null, '2024-06-15')).toBeLessThan(0);
      expect(dateStringComparator(undefined, '2024-06-15')).toBeLessThan(0);
    });

    it('treats two missing dates as equal', () => {
      expect(dateStringComparator(null, undefined)).toBe(0);
    });
  });
});
