import type { CustomFilterProps } from 'ag-grid-react';
import type { Load, LoadStatus } from '../types/Load';
import type { EnumFilterModel } from '../types/Filter';

// import AriaAnnouncement from './AriaAnnouncement';
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
  <>
    {/* <AriaAnnouncement>
      Filter by Status
    </AriaAnnouncement> */}
    <EnumFilter<Load, LoadStatus>
      {...props}
      fieldKey="status"
      options={statuses}
      ariaLabel="Status"
      secondAriaLabel="Second Status"
      emptyValueLabel="Any Status"
      emptyRequiredValueLabel="Select Status"
      renderValue={(status) => <StatusLabel status={status} />}
    />
  </>
);

export default StatusFilter;
