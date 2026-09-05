import type { ValueFormatterParams } from 'ag-grid-community';

import formatDollars from './formatDollars';
import formatNumber from './formatNumber';

export const currencyFormatter = <T>(params: ValueFormatterParams<T, number>): string =>
  params.value === undefined || params.value === null
    ? ''

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-conversion
    : formatDollars(Number(params.value));

export const numberFormatter = <T>(params: ValueFormatterParams<T, number>): string =>
  params.value === undefined || params.value === null
    ? ''

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-conversion
    : formatNumber(Number(params.value));
