import type { Load } from '@/types/Load';

import fetchJsonLoads from './fetchJsonLoads';

// fake service to simulate fetching a single load from an API
const fetchLoadById = async (id: string): Promise<Load> => {
  // use the existing fake fetchJsonLoads service
  const loads = await fetchJsonLoads();
  const load = loads.find(load => load.id === id);

  if (!load) {
    throw new Error(`Load id ${id} not found.`);
  }

  return load;
};

export default fetchLoadById;
