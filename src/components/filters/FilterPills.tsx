import type React from 'react';
import type { FilterModel } from '@/types/Filter';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import CloseIcon from '@mui/icons-material/Close';

import getFilterLabel from '@/utils/getFilterLabel';

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
        component="div"
        label={getFilterLabel(field, filters[field])}
        onDelete={() => {
          onDeleteFilter(field);
        }}
        deleteIcon={<CloseIcon aria-label={`Remove ${field} filter`} />}
        aria-keyshortcuts="Delete Backspace"
        aria-description={`Delete or Backspace to Remove ${field} filter`}
        onKeyDown={(event) => {
          if (['Delete', 'Backspace'].includes(event.key)) {
            event.stopPropagation(); // pop the bubble
            onDeleteFilter(field);
          }
        }}
      />
    ))}
  </Box>
);

export default FilterPills;
