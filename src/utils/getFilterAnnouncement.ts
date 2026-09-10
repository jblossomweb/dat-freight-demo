import type { FilterModel } from '../types/Filter';

import getFilterLabel from './getFilterLabel';
import getTableDataStatus from './getTableDataStatus';

interface getFilterAnnouncementArgs {
  searchQuery?: string;
  lastSearch?: string;
  filterModel: FilterModel;
  filteredRowCount: number;
  totalRowCount: number;
  rowUnits: string;
}

const getFilterAnnouncement = ({
  searchQuery,
  lastSearch,
  filterModel,
  filteredRowCount,
  totalRowCount,
  rowUnits,
}: getFilterAnnouncementArgs) => {
  const newFilterKeys = Object.keys(filterModel);

  const describeFilters = newFilterKeys.map(
    field => getFilterLabel(field, filterModel[field]),
  ).join(', ');

  return `${
    searchQuery?.length
      ? `Search Query: "${searchQuery}". `
      : lastSearch?.length
        ? 'Search Cleared.'
        : ''
  } ${
    newFilterKeys.length
      ? `Filtering by: ${describeFilters}.`
      : ''
  } ${
    getTableDataStatus(filteredRowCount, totalRowCount, rowUnits)
  }`;
};

export default getFilterAnnouncement;
