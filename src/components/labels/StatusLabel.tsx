import type React from 'react';
import type { LoadStatus } from '@/types/Load';

import CheckIcon from '@mui/icons-material/Check';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

import LabelBox from './LabelBox';

interface StatusLabelProps {
  status?: LoadStatus | '';
}

const labelOptions = {
  Available: {
    color: 'status.available',
    icon: Inventory2OutlinedIcon,
  },
  'In Transit': {
    color: 'status.inTransit',
    icon: LocalShippingIcon,
  },
  Delivered: {
    color: 'status.delivered',
    icon: CheckIcon,
  },
};

const StatusLabel: React.FC<StatusLabelProps> = ({ status }) => {
  if (status === '' || !status) {
    return null;
  }

  const { color, icon } = labelOptions[status];

  return (
    <LabelBox
      text={status}
      color={color}
      icon={icon}
    />
  );
};

export default StatusLabel;
