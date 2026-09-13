import type { DataSource } from '@/types/DataSource';

import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Tooltip from '@mui/material/Tooltip';

import DataObjectOutlinedIcon from '@mui/icons-material/DataObjectOutlined';
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';

interface DataSourceToggleProps {
  value: DataSource;
  onChange?: (value: DataSource) => void;
  readOnly?: boolean;
}

const DataSourceToggle: React.FC<DataSourceToggleProps> = ({
  value,
  onChange,
  readOnly = false,
}) => (
  <ToggleButtonGroup
    color="primary"
    value={value}
    exclusive
    size="small"
    aria-label="Data source"
    sx={(theme) => ({
      '& .MuiToggleButton-root.Mui-selected': {
        backgroundColor: 'primary.main',
        color: 'primary.contrastText',
        borderColor: 'primary.main',

        '&:hover': {
          backgroundColor: 'primary.dark',
        },
      },
      ...(theme.palette.mode === 'light' && {
        '& .MuiToggleButton-root:not(.Mui-selected)': {
          color: 'text.secondary',
        },
      }),
      ...(readOnly && {
        '& .MuiToggleButton-root': {
          cursor: 'default',
        },
        '& .MuiToggleButton-root:hover': {
          backgroundColor: 'transparent',
        },
      }),
    })}
    onChange={(_event, newValue: DataSource | null) => {
      // exclusive groups pass null when clicking the already-selected button
      if (!readOnly && newValue) {
        onChange?.(newValue);
      }
    }}
  >
    {(value === 'json' || !readOnly) && (
      <Tooltip title="Sample Loads: client-side paging, sorting, filtering, and search">
        <ToggleButton value="json" aria-label="Sample Loads" aria-disabled={readOnly}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <DataObjectOutlinedIcon sx={{ fontSize: 18 }} />
            Sample Loads
          </Box>
        </ToggleButton>
      </Tooltip>
    )}
    {(value === 'api' || !readOnly) && (
      <Tooltip title="Database / API: server-side paging, sorting, filtering, and search">
        <ToggleButton value="api" aria-label="Database / API" aria-disabled={readOnly}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <StorageOutlinedIcon sx={{ fontSize: 18 }} />
            Database / API
          </Box>
        </ToggleButton>
      </Tooltip>
    )}
  </ToggleButtonGroup>
);

export default DataSourceToggle;
