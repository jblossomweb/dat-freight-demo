import type { Load } from '@/types/Load';

const LOADS_URL = new URL('../data/10000Loads.json', import.meta.url).href;
const SIMULATED_DELAY = 400;

// fake service to simulate fetching loads from an API
const fetchJsonLoads = async (): Promise<Load[]> => {
  const response = await fetch(LOADS_URL);

  if (!response.ok) {
    throw new Error(`Unable to load freight loads (${String(response.status)}).`);
  }

  const payload = await response.json() as { loads: Load[] };

  // fake delay to simulate API call
  await new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY));

  return payload.loads;
};

export default fetchJsonLoads;
