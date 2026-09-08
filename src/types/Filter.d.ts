import type { JoinOperator } from 'ag-grid-community';

export type FilterOperator =
  | 'blank'
  | 'contains'
  | 'empty'
  | 'endsWith'
  | 'equals'
  | 'greaterThan'
  | 'greaterThanOrEqual'
  | 'inRange'
  | 'lessThan'
  | 'lessThanOrEqual'
  | 'notBlank'
  | 'notContains'
  | 'notEqual'
  | 'startsWith';

export type FilterValue = string | number;

export interface FilterCondition {
  filter?: FilterValue | null;
  filterTo?: FilterValue | null;
  filterType?: 'date' | 'number' | 'text';
  type?: FilterOperator | null;
}

export interface SetFilterValue {
  filterType?: 'set';
  values: (string | null)[];
}

export interface CombinedFilterValue {
  conditions: FilterCondition[];
  operator: JoinOperator;
}

export type Filter = FilterCondition | SetFilterValue | CombinedFilterValue;

export type FilterModel = Record<string, Filter>;

export interface EnumFilterCondition<Value extends string> {
  filterType: 'text';
  type: 'equals' | 'notEqual';
  filter: Value;
}

export type EnumFilterModel<Value extends string> =
  | EnumFilterCondition<Value>
  | {
    operator: 'AND' | 'OR';
    conditions: EnumFilterCondition<Value>[];
  }
