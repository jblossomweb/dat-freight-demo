import type { IDoesFilterPassParams } from 'ag-grid-community';
import type { StringKey } from '../types/StringKey';
import type { IsIsNot } from '../types/Operators';
import type { EnumFilterCondition, EnumFilterModel } from '../types/Filter';

import { useGridFilter } from 'ag-grid-react';

import useFilterPopupFocus from './useFilterPopupFocus';

interface UseEnumFilterOptions<Data, Value extends string> {
  fieldKey: StringKey<Data>;
  model: EnumFilterModel<Value> | null;
  onModelChange: (model: EnumFilterModel<Value> | null) => void;
}

const createCondition = <Value extends string>(
  value: Value,
  mode: IsIsNot,
): EnumFilterCondition<Value> => ({
  filterType: 'text',
  type: mode === 'isNot' ? 'notEqual' : 'equals',
  filter: value,
});

const useEnumFilter = <Data, Value extends string>({
  model,
  onModelChange,
  fieldKey,
}: UseEnumFilterOptions<Data, Value>) => {
  const filterPopupFocus = useFilterPopupFocus();
  const firstValue: Value | '' = model && 'conditions' in model
    ? model.conditions[0]?.filter ?? ''
    : model?.filter ?? '';
  const secondValue: Value | '' = model && 'conditions' in model
    ? model.conditions[1]?.filter ?? ''
    : '';
  const filterMode: IsIsNot = model && 'conditions' in model
    ? model.conditions[0]?.type === 'notEqual' ? 'isNot' : 'is'
    : model?.type === 'notEqual' ? 'isNot' : 'is';

  useGridFilter({
    afterGuiAttached: filterPopupFocus.afterGuiAttached,
    afterGuiDetached: filterPopupFocus.afterGuiDetached,
    doesFilterPass: ({ data }: IDoesFilterPassParams<Data>) => {
      if (!model) {
        return true;
      }

      const value = data[fieldKey as keyof Data] as Value;
      const matches = 'conditions' in model
        ? model.conditions.map((condition) => (
          condition.type === 'notEqual'
            ? value !== condition.filter
            : value === condition.filter
        ))
        : [model.type === 'notEqual' ? value !== model.filter : value === model.filter];

      if ('conditions' in model && model.operator === 'AND') {
        return matches.every(Boolean);
      }

      return matches.some(Boolean);
    },
  });

  const updateFilter = (
    newMode: IsIsNot,
    newFirst: Value | '',
    newSecond: Value | '',
  ) => {
    if (newFirst === '') {
      onModelChange(null);
      return;
    }

    onModelChange(
      newSecond === ''
        ? createCondition(newFirst, newMode)
        : {
          operator: newMode === 'isNot' ? 'AND' : 'OR',
          conditions: [
            createCondition(newFirst, newMode),
            createCondition(newSecond, newMode),
          ],
        },
    );
  };

  const updateMode = (newMode: IsIsNot) => {
    updateFilter(newMode, firstValue, secondValue);
  };

  const updateFirstValue = (newValue: Value | '') => {
    updateFilter(filterMode, newValue, secondValue);
  };

  const updateSecondValue = (newValue: Value | '') => {
    updateFilter(filterMode, firstValue, newValue);
  };

  return {
    firstControlRef: filterPopupFocus.focusRef,
    firstValue,
    secondValue,
    filterMode,
    updateFilter,
    updateMode,
    updateFirstValue,
    updateSecondValue,
  };
};

export default useEnumFilter;
