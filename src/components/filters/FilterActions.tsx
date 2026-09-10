import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';

interface FilterActionsProps {
  onClear: () => void;
  onClose: () => void;
}

const FilterActions: React.FC<FilterActionsProps> = ({
  onClear,
  onClose,
}) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 1,
      mt: 1,
      pt: 1,
      borderTop: '1px solid',
      borderColor: 'divider',
    }}
  >
    <IconButton
      aria-label="Clear Filter"
      size="small"
      onClick={() => {
        onClear();
      }}
    >
      <FilterAltOffIcon fontSize="small" />
    </IconButton>
    <IconButton
      aria-label="Close"
      size="small"
      onClick={() => {
        onClose();
      }}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  </Box>
);

export default FilterActions;
