import type { IDoesFilterPassParams } from 'ag-grid-community';
import type { IsIsNot } from '../types/Operators';
import type { Load, LoadStatus } from '../types/Load';
import type { StatusCondition, StatusFilterModel } from '../types/StatusFilter';

import { useGridFilter } from 'ag-grid-react';

interface UseStatusFilter {
  model: StatusFilterModel | null;
  onModelChange: (model: StatusFilterModel | null) => void;
}

const createCondition = (status: LoadStatus, mode: IsIsNot): StatusCondition => ({
  filterType: 'text',
  type: mode === 'isNot' ? 'notEqual' : 'equals',
  filter: status,
});

const useStatusFilter = ({
  model,
  onModelChange,
}: UseStatusFilter) => {
  const firstStatus: LoadStatus | '' = model && 'conditions' in model
    ? model.conditions[0]?.filter ?? ''
    : model?.filter ?? '';
  const secondStatus: LoadStatus | '' = model && 'conditions' in model
    ? model.conditions[1]?.filter ?? ''
    : '';
  const filterMode: IsIsNot = model && 'conditions' in model
    ? model.conditions[0]?.type === 'notEqual' ? 'isNot' : 'is'
    : model?.type === 'notEqual' ? 'isNot' : 'is';

  useGridFilter({
    doesFilterPass: ({ data }: IDoesFilterPassParams<Load>) => {
      if (!model) {
        return true;
      }

      if ('conditions' in model) {
        const matches = model.conditions.map((condition) => (
          condition.type === 'notEqual'
            ? data.status !== condition.filter
            : data.status === condition.filter
        ));

        return model.operator === 'AND'
          ? matches.every(Boolean)
          : matches.some(Boolean);
      }

      return model.type === 'notEqual'
        ? data.status !== model.filter
        : data.status === model.filter;
    },
  });

  const updateFilter = (
    newMode: IsIsNot,
    newFirst: LoadStatus | '',
    newSecond: LoadStatus | '',
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
    updateFilter(
      newMode,
      firstStatus,
      secondStatus,
    );
  };

  const updateFirstStatus = (newStatus: LoadStatus | '') => {
    updateFilter(
      filterMode,
      newStatus,
      secondStatus,
    );
  };

  const updateSecondStatus = (newStatus: LoadStatus | '') => {
    updateFilter(
      filterMode,
      firstStatus,
      newStatus,
    );
  };

  return {
    firstStatus,
    secondStatus,
    filterMode,
    updateFilter,
    updateMode,
    updateFirstStatus,
    updateSecondStatus,
  };
};

export default useStatusFilter;
