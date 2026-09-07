import type { EquipmentType } from './Load';

export interface EquipmentCondition {
  filterType: 'text';
  type: 'equals' | 'notEqual';
  filter: EquipmentType;
};

export type StatusFilterModel =
  | EquipmentCondition
  | {
    operator: 'AND' | 'OR';
    conditions: EquipmentCondition[];
  };
