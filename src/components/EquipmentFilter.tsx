import type { CustomFilterProps } from 'ag-grid-react';
import type { Load, EquipmentType } from '../types/Load';
import type { EnumFilterModel } from '../types/Filter';

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
  <EnumFilter<Load, EquipmentType>
    {...props}
    fieldKey="equipmentType"
    options={equipmentTypes}
    ariaLabel="Filter by Equipment Type"
    secondAriaLabel="Filter by Second Equipment Type"
    emptyValueLabel="Any Equipment Type"
    emptyRequiredValueLabel="Select Equipment Type"
    renderValue={(equipmentType) => <EquipmentLabel equipmentType={equipmentType} />}
  />
);

export default EquipmentFilter;
