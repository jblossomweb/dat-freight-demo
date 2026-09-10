import { describe, expect, it } from 'vitest';

import getTableDataStatus from './getTableDataStatus';

describe('getTableDataStatus', () => {
  it('formats displayed and total row counts with units', () => {
    expect(getTableDataStatus(25, 100, 'loads')).toBe(
      'Showing 25 of 100 total loads',
    );
  });

  it('formats zero displayed rows', () => {
    expect(getTableDataStatus(0, 100, 'loads')).toBe(
      'Showing 0 of 100 total loads',
    );
  });

  it('formats large counts with thousands separators', () => {
    expect(getTableDataStatus(1250, 10000, 'items')).toBe(
      'Showing 1,250 of 10,000 total items',
    );
  });
});
