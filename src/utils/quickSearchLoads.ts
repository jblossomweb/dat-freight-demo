import type { Load } from '@/types/Load';

import parseQuickSearchTerms from '@/utils/parseQuickSearchTerms';

// case-insensitive, substring match; any search term matching is a hit (OR)
const quickSearchLoads = (loads: Load[], search: string): Load[] => {
  const terms = parseQuickSearchTerms(search);

  if (terms.length === 0) {
    return loads;
  }

  return loads.filter((load) => {
    const rowText = Object.values(load).join(' ').toLowerCase();

    return terms.some(term => rowText.includes(term));
  });
};

export default quickSearchLoads;
