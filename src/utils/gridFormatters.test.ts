import type { ValueFormatterParams } from 'ag-grid-community';
import { describe, expect, it } from 'vitest';

import { currencyFormatter, numberFormatter } from './gridFormatters';

const formatterParams = (value: number | null | undefined) => (
  { value } as ValueFormatterParams<unknown, number>
);

describe('gridFormatters', () => {
  describe('currencyFormatter', () => {
    it('formats numeric values as whole-dollar currency', () => {
      expect(currencyFormatter(formatterParams(2850))).toBe('$2,850');
    });

    it('returns an empty string for missing values', () => {
      expect(currencyFormatter(formatterParams(null))).toBe('');
      expect(currencyFormatter(formatterParams(undefined))).toBe('');
    });
  });

  describe('numberFormatter', () => {
    it('formats numeric values with thousands separators', () => {
      expect(numberFormatter(formatterParams(42000))).toBe('42,000');
    });

    it('returns an empty string for missing values', () => {
      expect(numberFormatter(formatterParams(null))).toBe('');
      expect(numberFormatter(formatterParams(undefined))).toBe('');
    });
  });
});
