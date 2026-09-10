import type { CustomFilterProps } from 'ag-grid-react';
import type React from 'react';
import type { EnumFilterModel } from '../types/Filter';
import type { StringKey } from '../types/StringKey';

import { useState } from 'react';

import Box from '@mui/material/Box';

import useEnumFilter from '../hooks/useEnumFilter';

import IsIsNotSelect from './IsIsNotSelect';
import FilterValueSelect from './FilterValueSelect';
import OrFilterCheckbox from './OrFilterCheckbox';
import FilterActions from './FilterActions';

interface EnumFilterProps<Data, Value extends string>
  extends CustomFilterProps<Data, unknown, EnumFilterModel<Value>> {
  fieldKey: StringKey<Data>;
  options: Value[];
  ariaLabel: string;
  secondAriaLabel: string;
  emptyValueLabel: string;
  emptyRequiredValueLabel: string;
  renderValue: (value: Value) => React.ReactNode;
}

const EnumFilter = <Data, Value extends string>({
  api,
  model,
  onModelChange,
  fieldKey,
  options,
  renderValue,
  ariaLabel,
  secondAriaLabel,
  emptyValueLabel,
  emptyRequiredValueLabel,
}: EnumFilterProps<Data, Value>) => {
  const enumFilter = useEnumFilter<Data, Value>({ model, onModelChange, fieldKey });
  const [showSecondValue, setShowSecondValue] = useState(
    enumFilter.secondValue !== '',
  );

  return (
    <Box
      sx={{
        p: 1,
        width: '100%',
        position: 'relative',
        '& .MuiOutlinedInput-root': {
          minHeight: 32,
          borderRadius: 0,
          fontSize: '0.8125rem',
        },
      }}
    >
      <IsIsNotSelect
        value={enumFilter.filterMode}
        onValueChange={enumFilter.updateMode}
      />

      <FilterValueSelect<Value>
        ariaLabel={ariaLabel}
        operator={enumFilter.filterMode}
        value={enumFilter.firstValue}
        options={options}
        focusRef={enumFilter.firstControlRef}
        showEmptyValue
        renderValue={(value: Value | '') => value === ''
          ? enumFilter.filterMode === 'isNot'
            ? emptyRequiredValueLabel
            : emptyValueLabel
          : renderValue(value)}
        onValueChange={(value) => {
          if (enumFilter.filterMode === 'isNot' && value === '') {
            return;
          }

          enumFilter.updateFirstValue(value);
        }}
      />

      {enumFilter.firstValue !== '' && (
        <Box sx={{ mt: 1 }}>
          <OrFilterCheckbox
            checked={showSecondValue}
            onValueChange={(checked) => {
              setShowSecondValue(checked);

              if (!checked) {
                enumFilter.updateSecondValue('');
              }
            }}
          />
          {showSecondValue && (
            <FilterValueSelect<Value>
              ariaLabel={secondAriaLabel}
              operator={enumFilter.filterMode}
              value={enumFilter.secondValue}
              options={options.filter(value => value !== enumFilter.firstValue)}
              showEmptyValue
              renderValue={(value: Value | '') => value === ''
                ? emptyRequiredValueLabel
                : renderValue(value)}
              onValueChange={(value) => {
                if (enumFilter.filterMode === 'isNot' && value === '') {
                  return;
                }

                enumFilter.updateSecondValue(value);
              }}
            />
          )}
        </Box>
      )}

      <FilterActions
        onClear={() => {
          onModelChange(null);
          setShowSecondValue(false);
        }}
        onClose={() => {
          api.hidePopupMenu();
        }}
      />
    </Box>
  );
};

export default EnumFilter;
