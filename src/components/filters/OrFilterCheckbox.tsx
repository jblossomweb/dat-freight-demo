import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

interface OrFilterCheckboxProps {
  checked?: boolean;
  onValueChange?: (checked: boolean) => void;
}

const OrFilterCheckbox: React.FC<OrFilterCheckboxProps> = ({
  checked,
  onValueChange = () => {
    // default
  },
}) => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <FormControlLabel
      control={(
        <Checkbox
          checked={checked}
          size="small"
          onChange={(event) => {
            onValueChange(event.target.checked);
          }}
        />
      )}
      label="OR"
    />
  </Box>
);

export default OrFilterCheckbox;
