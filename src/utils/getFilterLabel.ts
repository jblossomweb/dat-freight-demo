import type {
  Filter,
  FilterCondition,
  FilterOperator,
  FilterValue,
  CombinedFilterValue,
  SetFilterValue,
} from '@/types/Filter';

const operatorLabels: Record<FilterOperator, string> = {
  blank: 'is blank',
  contains: 'contains',
  empty: 'is empty',
  endsWith: 'ends with',
  equals: '=',
  greaterThan: '>',
  greaterThanOrEqual: '>=',
  inRange: 'is between',
  lessThan: '<',
  lessThanOrEqual: '<=',
  notBlank: 'is not blank',
  notContains: 'does not contain',
  notEqual: '!=',
  startsWith: 'starts with',
};

const isCombinedFilter = (filter: Filter): filter is CombinedFilterValue =>
  'conditions' in filter && 'operator' in filter;

const isSetFilter = (filter: Filter): filter is SetFilterValue =>
  'values' in filter;

const formatValue = (value: FilterValue): string =>
  typeof value === 'string' ? `"${value}"` : String(value);

const formatCondition = (field: string, condition: FilterCondition): string => {
  const operator = condition.type;
  if (!operator) {
    return field;
  }

  const label = operatorLabels[operator];
  if (operator === 'blank' || operator === 'empty' || operator === 'notBlank') {
    return `${field} ${label}`;
  }

  if (operator === 'inRange') {
    const from = condition.filter === null || condition.filter === undefined
      ? ''
      : formatValue(condition.filter);
    const to = condition.filterTo === null || condition.filterTo === undefined
      ? ''
      : formatValue(condition.filterTo);
    return `${field} ${label} ${from} and ${to}`;
  }

  if (condition.filter === null || condition.filter === undefined) {
    return `${field} ${label}`;
  }

  return `${field} ${label} ${formatValue(condition.filter)}`;
};

const getFilterLabel = (field: string, filter: Filter): string => {
  if (isCombinedFilter(filter)) {
    return filter.conditions
      .map((condition) => formatCondition(field, condition))
      .join(` ${filter.operator} `);
  }

  if (isSetFilter(filter)) {
    const values = filter.values.filter((value): value is string => value !== null);
    return `${field} is ${values.map(formatValue).join(', ')}`;
  }

  return formatCondition(field, filter);
};

export default getFilterLabel;
