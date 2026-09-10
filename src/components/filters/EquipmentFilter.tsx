import type { CustomFilterProps } from 'ag-grid-react';
import type { Load, EquipmentType } from '@/types/Load';
import type { EnumFilterModel } from '@/types/Filter';

import EquipmentLabel from '@/components/labels/EquipmentLabel';

import EnumFilter from './EnumFilter';

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
);

export default EquipmentFilter;
