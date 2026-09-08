import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

interface FilterValueSelectProps<TValue = string> {
  ariaLabel?: string;
  value: TValue | '';
  options: TValue[];
  showEmptyValue?: boolean;
  emptyValueDisplay?: string;
  renderValue?: (value: TValue | '') => React.ReactNode;
  onValueChange: (value: TValue | '') => void;
}

const FilterValueSelect = <TValue extends string,>({
  ariaLabel = 'Select',
  value,
  options,
  showEmptyValue = false,
  emptyValueDisplay = '',
  renderValue = value => value,
  onValueChange,
}: FilterValueSelectProps<TValue>) => (
  <Select
    aria-label={ariaLabel}
    fullWidth
    size="small"
    value={value}
    sx={{ mt: 1 }}
    MenuProps={{ disablePortal: true }}
    displayEmpty={showEmptyValue}
    renderValue={renderValue}
    onChange={(event) => {
      onValueChange(event.target.value as TValue | '');
    }}
  >
    {showEmptyValue && (
      <MenuItem value="">{emptyValueDisplay}</MenuItem>
    )}

    {options.map((option) => (
      <MenuItem key={option} value={option}>
        {renderValue(option)}
      </MenuItem>
    ))}
  </Select>
);

export default FilterValueSelect;
