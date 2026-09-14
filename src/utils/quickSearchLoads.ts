import type { Load } from '@/types/Load';

// case-insensitive, substring match; any space-separated term matching is a hit (OR)
const quickSearchLoads = (loads: Load[], search: string): Load[] => {
  const terms = search
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);

  if (terms.length === 0) {
    return loads;
  }

  return loads.filter((load) => {
    const rowText = Object.values(load).join(' ').toLowerCase();

    return terms.some(term => rowText.includes(term));
  });
};

export default quickSearchLoads;
