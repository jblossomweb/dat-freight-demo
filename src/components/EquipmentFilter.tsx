import type { CustomFilterProps } from 'ag-grid-react';
import type { Load, EquipmentType } from '../types/Load';
import type { EnumFilterModel } from '../types/Filter';

// import AriaAnnouncement from './AriaAnnouncement';
import EnumFilter from './EnumFilter';
import EquipmentLabel from './EquipmentLabel';

type EquipmentFilterProps = CustomFilterProps<
  Load,
  unknown,
  EnumFilterModel<EquipmentType>
>;

const equipmentTypes: EquipmentType[] = [
  'Flatbed',
  'Reefer',
  'Van',
];

const EquipmentFilter: React.FC<EquipmentFilterProps> = (props) => (
  <>
    {/* <AriaAnnouncement>
      Filter by Equipment Type
    </AriaAnnouncement> */}
    <EnumFilter<Load, EquipmentType>
      {...props}
      fieldKey="equipmentType"
      options={equipmentTypes}
      ariaLabel="Equipment Type"
      secondAriaLabel="Second Type"
      emptyValueLabel="Any Type"
      emptyRequiredValueLabel="Select Type"
      renderValue={(equipmentType) => <EquipmentLabel equipmentType={equipmentType} />}
    />
  </>
);

export default EquipmentFilter;
