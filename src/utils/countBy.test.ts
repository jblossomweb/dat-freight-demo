import { describe, expect, it } from 'vitest';

import countBy from './countBy';

describe('countBy', () => {
  it('counts values in the requested category order', () => {
    expect(
      countBy(
        ['Van', 'Reefer', 'Van'],
        ['Flatbed', 'Reefer', 'Van'],
      ),
    ).toEqual([
      { label: 'Flatbed', value: 0 },
      { label: 'Reefer', value: 1 },
      { label: 'Van', value: 2 },
    ]);
  });

  it('counts repeated values', () => {
    expect(countBy(['Available', 'Available', 'Delivered'], ['Available'])).toEqual([
      { label: 'Available', value: 2 },
    ]);
  });

  it('includes categories that are absent from the values', () => {
    expect(countBy(['Van'], ['Van', 'Flatbed', 'Reefer'])).toEqual([
      { label: 'Van', value: 1 },
      { label: 'Flatbed', value: 0 },
      { label: 'Reefer', value: 0 },
    ]);
  });

  it('returns zero counts for empty input', () => {
    expect(countBy([], ['Available', 'Delivered'])).toEqual([
      { label: 'Available', value: 0 },
      { label: 'Delivered', value: 0 },
    ]);
  });
});
