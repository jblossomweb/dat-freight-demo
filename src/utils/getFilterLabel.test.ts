import { describe, expect, it } from 'vitest';

import type { Filter } from '@/types/Filter';

import getFilterLabel from './getFilterLabel';

describe('getFilterLabel', () => {
  it('formats a string equality condition with quotes', () => {
    const filter: Filter = {
      filterType: 'text',
      type: 'equals',
      filter: 'Available',
    };

    expect(getFilterLabel('status', filter)).toBe('status = "Available"');
  });

  it('formats numeric comparisons', () => {
    const filter: Filter = {
      filterType: 'number',
      type: 'greaterThanOrEqual',
      filter: 1000,
    };

    expect(getFilterLabel('price', filter)).toBe('price >= 1000');
  });

  it('formats conditions without a filter value', () => {
    const filter: Filter = {
      filterType: 'text',
      type: 'contains',
    };

    expect(getFilterLabel('companyName', filter)).toBe('companyName contains');
  });

  it('formats blank operators without a value', () => {
    const filter: Filter = {
      filterType: 'text',
      type: 'notBlank',
    };

    expect(getFilterLabel('origin', filter)).toBe('origin is not blank');
  });

  it('returns the field name when no operator is provided', () => {
    const filter: Filter = {
      filterType: 'text',
    };

    expect(getFilterLabel('destination', filter)).toBe('destination');
  });

  it('formats a complete numeric range', () => {
    const filter: Filter = {
      filterType: 'number',
      type: 'inRange',
      filter: 100,
      filterTo: 500,
    };

    expect(getFilterLabel('distance', filter)).toBe(
      'distance is between 100 and 500',
    );
  });

  it('preserves spacing for an incomplete numeric range', () => {
    const filter: Filter = {
      filterType: 'number',
      type: 'inRange',
      filterTo: 500,
    };

    expect(getFilterLabel('distance', filter)).toBe(
      'distance is between  and 500',
    );
  });

  it('preserves spacing for a range without an upper bound', () => {
    const filter: Filter = {
      filterType: 'number',
      type: 'inRange',
      filter: 100,
    };

    expect(getFilterLabel('distance', filter)).toBe(
      'distance is between 100 and ',
    );
  });

  it('formats set values and ignores null entries', () => {
    const filter: Filter = {
      filterType: 'set',
      values: ['Van', null, 'Reefer'],
    };

    expect(getFilterLabel('equipmentType', filter)).toBe(
      'equipmentType is "Van", "Reefer"',
    );
  });

  it('joins combined conditions with the filter operator', () => {
    const filter: Filter = {
      operator: 'OR',
      conditions: [
        { filterType: 'text', type: 'equals', filter: 'Chicago' },
        { filterType: 'text', type: 'equals', filter: 'Dallas' },
      ],
    };

    expect(getFilterLabel('origin', filter)).toBe(
      'origin = "Chicago" OR origin = "Dallas"',
    );
  });
});
