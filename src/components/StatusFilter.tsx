import type { CustomFilterProps } from 'ag-grid-react';
import type { Load, LoadStatus } from '../types/Load';
import type { EnumFilterModel } from '../types/Filter';

import EnumFilter from './EnumFilter';
import StatusLabel from './StatusLabel';

type StatusFilterProps = CustomFilterProps<
  Load,
  unknown,
  EnumFilterModel<LoadStatus>
>;

const statuses: LoadStatus[] = [
  'Available',
  'In Transit',
  'Delivered',
];

const StatusFilter: React.FC<StatusFilterProps> = (props) => (
  <EnumFilter<Load, LoadStatus>
    {...props}
    fieldKey="status"
    options={statuses}
    ariaLabel="Filter by Status"
    secondAriaLabel="Filter by Second Status"
    emptyValueLabel="Any Status"
    emptyRequiredValueLabel="Select Status"
    renderValue={(status) => <StatusLabel status={status} />}
  />
);

export default StatusFilter;
