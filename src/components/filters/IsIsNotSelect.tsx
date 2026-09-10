import type { IsIsNot } from '@/types/Operators';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

interface IsIsNotSelectProps {
  value: IsIsNot;
  focusRef?: React.RefObject<HTMLDivElement | null>;
  onValueChange: (value: IsIsNot) => void;
}

const IsIsNotSelect: React.FC<IsIsNotSelectProps> = ({
  value,
  focusRef,
  onValueChange,
}) => (
  <Select
    ref={focusRef}
    aria-label="Filter operator"
    fullWidth
    size="small"
    value={value}
    MenuProps={{ disablePortal: true }}
    renderValue={(value) => {
      const mode = value;

      return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, lineHeight: 1 }}>
          {mode === 'is'
            ? <CheckIcon sx={{ color: 'success.main', fontSize: 18 }} />
            : <CloseIcon sx={{ color: 'error.main', fontSize: 18 }} />}
          {mode === 'is' ? 'IS' : 'IS NOT'}
        </Box>
      );
    }}
    onChange={(event) => {
      onValueChange(event.target.value);
    }}
  >
    <MenuItem value="is" sx={{ gap: 1 }}>
      <CheckIcon sx={{ color: 'success.main' }} fontSize="small" />
      IS
    </MenuItem>
    <MenuItem value="isNot" sx={{ gap: 1 }}>
      <CloseIcon sx={{ color: 'error.main' }} fontSize="small" />
      IS NOT
    </MenuItem>
  </Select>
);

export default IsIsNotSelect;
