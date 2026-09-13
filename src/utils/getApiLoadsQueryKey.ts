import type { SortModel } from '@/types/Sort';
import type { FilterModel } from '@/types/Filter';

interface GetApiLoadsQueryKeyArgs {
  startRow: number,
  endRow: number,
  sortModel: SortModel,
  filterModel: FilterModel,
  quickSearch: string,
}

const getApiLoadsQueryKey = ({
  startRow,
  endRow,
  sortModel,
  filterModel,
  quickSearch,
}: GetApiLoadsQueryKeyArgs) => ([
  'api-loads',
  startRow,
  endRow,
  sortModel,
  filterModel,
  quickSearch,
]);

export default getApiLoadsQueryKey;
