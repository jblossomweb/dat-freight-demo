import type { Load } from '@/types/Load';

import fetchLoads from './fetchLoads';

// fake service to simulate fetching a single load from an API
const fetchLoadById = async (id: string): Promise<Load> => {
  // use the existing fake fetchLoads service
  const loads = await fetchLoads();
  const load = loads.find(load => load.id === id);

  if (!load) {
    throw new Error(`Load id ${id} not found.`);
  }

  return load;
};

export default fetchLoadById;
