import type { Load } from '../types/Load';

import { useState } from 'react';

import Box from '@mui/material/Box';

import SearchInput from '../components/SearchInput';
import FilterPills from '../components/FilterPills';
import LoadsTable from '../components/LoadsTable';

import useFilterModel from '../hooks/useFilterModel';

import loadsData from '../data/mockLoads.json';

function FreightLoadsPage() {
  const loads = (loadsData as { loads: Load[] }).loads;
  const [search, setSearch] = useState('');
  const filterModel = useFilterModel<Load>();

  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', flexGrow: 1, gap: 1 }}>
      <SearchInput
        placeholder="Search Loads..."
        ariaLabel="Search Loads"
        onSearchChange={setSearch}
      />

      <FilterPills
        filters={filterModel.filters}
        onDeleteFilter={filterModel.onDeleteFilter}
      />

      <LoadsTable
        loads={loads}
        search={search}
        onReady={filterModel.onReady}
        onFilterChange={filterModel.onFilterChange}
      />
    </Box>
  );
}

export default FreightLoadsPage;
