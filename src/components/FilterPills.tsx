import type React from 'react';
import type { FilterModel } from '../types/Filter';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

import getFilterLabel from '../utils/getFilterLabel';

interface FilterPillsProps {
  filters: FilterModel;
  onDeleteFilter: (field: string) => void;
}

const FilterPills: React.FC<FilterPillsProps> = ( { filters, onDeleteFilter }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: { xs: 'column', md: 'row' },
      justifyContent: 'left',
      alignItems: { xs: 'flex-start', md: 'center' },
      gap: 1,
      minHeight: 32,
    }}
  >
    {Object.keys(filters).map((field) => (
      <Chip
        key={field}
        label={getFilterLabel(field, filters[field])}
        onDelete={() => {
          onDeleteFilter(field);
        }}
      />
    ))}
  </Box>
);

export default FilterPills;
