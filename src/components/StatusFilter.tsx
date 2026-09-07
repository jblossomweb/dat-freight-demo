import type { CustomFilterProps } from 'ag-grid-react';
import type { Load, LoadStatus } from '../types/Load';
import type { StatusFilterModel } from '../types/StatusFilter';

import { useState } from 'react';

import Box from '@mui/material/Box';

import useStatusFilter from '../hooks/useStatusFilter';

import IsIsNotSelect from './IsIsNotSelect';
import FilterValueSelect from './FilterValueSelect';
import OrFilterCheckbox from './OrFilterCheckbox';
import StatusLabel from './StatusLabel';
import FilterActions from './FilterActions';

type StatusFilterProps = CustomFilterProps<Load, unknown, StatusFilterModel>;

const statuses: LoadStatus[] = [
  'Available',
  'In Transit',
  'Delivered',
];

const ANY_STATUS = 'Any Status';
const SELECT_STATUS = 'Select Status';

const StatusFilter: React.FC<StatusFilterProps> = ({
  api,
  model,
  onModelChange,
}) => {
  const statusFilter = useStatusFilter({ model, onModelChange });
  const [showSecondStatus, setShowSecondStatus] = useState(
    statusFilter.secondStatus !== '',
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
        value={statusFilter.filterMode}
        onValueChange={statusFilter.updateMode}
      />

      <FilterValueSelect<LoadStatus>
        ariaLabel="Filter by Status"
        value={statusFilter.firstStatus}
        options={statuses}
        showEmptyValue
        renderValue={(value: LoadStatus | '') =>
          value === ''
            ? statusFilter.filterMode === 'isNot' ? SELECT_STATUS : ANY_STATUS
            : (<StatusLabel status={value} />)
        }
        onValueChange={value => {
          if (statusFilter.filterMode === 'isNot' && value === '') {
            return;
          }

          statusFilter.updateFirstStatus(value);
        }}
      />

      {statusFilter.firstStatus !== '' && (
        <Box sx={{ mt: 1 }}>
          <OrFilterCheckbox
            checked={showSecondStatus}
            onValueChange={(checked) => {
              setShowSecondStatus(checked);

              if (!checked) {
                statusFilter.updateSecondStatus('');
              }
            }}
          />
          {showSecondStatus && (
            <FilterValueSelect<LoadStatus>
              ariaLabel="Filter by Second Status"
              value={statusFilter.secondStatus}
              options={statuses.filter(
                status => status !== statusFilter.firstStatus,
              )}
              showEmptyValue
              renderValue={(value: LoadStatus | '') =>
                value === ''
                  ? SELECT_STATUS
                  : (<StatusLabel status={value} />)
              }
              onValueChange={value => {
                if (statusFilter.filterMode === 'isNot' && value === '') {
                  return;
                }

                statusFilter.updateSecondStatus(value);
              }}
            />
          )}
        </Box>
      )}

      <FilterActions
        onClear={() => {
          onModelChange(null);
          setShowSecondStatus(false);
        }}
        onClose={() => {
          api.hidePopupMenu();
        }}
      />
    </Box>
  );
};

export default StatusFilter;
