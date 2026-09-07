import type React from 'react';
import type { EquipmentType } from '../types/Load';

import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import FireTruckIcon from '@mui/icons-material/FireTruck';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

import LabelBox from './LabelBox';

interface EquipmentLabelProps {
  equipmentType?: EquipmentType | '';
}

const labelOptions = {
  Van: {
    color: 'equipment.van',
    icon: AirportShuttleIcon,
  },
  Flatbed: {
    color: 'equipment.flatbed',
    icon: FireTruckIcon,
  },
  Reefer: {
    color: 'equipment.reefer',
    icon: LocalShippingIcon,
  },
};

const EquipmentLabel: React.FC<EquipmentLabelProps> = ({ equipmentType }) => {
  if (equipmentType === '' || !equipmentType) {
    return null;
  }

  const { color, icon } = labelOptions[equipmentType];

  return (
    <LabelBox
      text={equipmentType}
      color={color}
      icon={icon}
    />
  );
};

export default EquipmentLabel;
