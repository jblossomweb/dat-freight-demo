import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

interface FilterValueSelectProps<TValue = string> {
  ariaLabel?: string;
  operator?: string;
  value: TValue | '';
  options: TValue[];
  focusRef?: React.RefObject<HTMLDivElement | null>;
  showEmptyValue?: boolean;
  emptyValueDisplay?: string;
  renderValue?: (value: TValue | '') => React.ReactNode;
  onValueChange: (value: TValue | '') => void;
}

const FilterValueSelect = <TValue extends string,>({
  ariaLabel = 'Select',
  operator,
  value,
  options,
  focusRef,
  showEmptyValue = false,
  emptyValueDisplay = '',
  renderValue = value => value,
  onValueChange,
}: FilterValueSelectProps<TValue>) => (
  <Select
    ref={focusRef}
    aria-label={`${ariaLabel} ${String(operator)}`}
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
