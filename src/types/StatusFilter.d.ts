import type { LoadStatus } from './Load';

export interface StatusCondition {
  filterType: 'text';
  type: 'equals' | 'notEqual';
  filter: LoadStatus;
};

export type StatusFilterModel =
  | StatusCondition
  | {
    operator: 'AND' | 'OR';
    conditions: StatusCondition[];
  };
