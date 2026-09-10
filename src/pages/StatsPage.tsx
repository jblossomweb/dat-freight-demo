import type { Load, LoadStatus, EquipmentType } from '@/types/Load';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

import loadsData from '@/data/mockLoads.json';
import countBy from '@/utils/countBy';

import PieChart from '@/components/charts/PieChart';
import EquipmentLabel from '@/components/labels/EquipmentLabel';
import StatusLabel from '@/components/labels/StatusLabel';

const loads = (loadsData as { loads: Load[] }).loads;

function StatsPage() {
  const theme = useTheme();
  const palette = theme.vars?.palette ?? theme.palette;

  const equipmentData = countBy(
    loads.map(load => load.equipmentType),
    ['Flatbed', 'Reefer', 'Van'] satisfies EquipmentType[],
  ).map((item, index) => ({
    ...item,
    color: [
      palette.equipment.flatbed,
      palette.equipment.reefer,
      palette.equipment.van,
    ][index],
  }));

  const statusData = countBy(
    loads.map(load => load.status),
    ['Available', 'In Transit', 'Delivered'] satisfies LoadStatus[],
  ).map((item, index) => ({
    ...item,
    color: [
      palette.status.available,
      palette.status.inTransit,
      palette.status.delivered,
    ][index],
  }));

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          flexWrap: 'wrap',
        }}
      >
        <PieChart
          title="Equipment Type"
          data={equipmentData}
          renderLabel={(label) => <EquipmentLabel equipmentType={label as EquipmentType} />}
        />
        <PieChart
          title="Load Status"
          data={statusData}
          renderLabel={(label) => <StatusLabel status={label as LoadStatus} />}
        />
      </Box>
    </Box>
  );
}

export default StatsPage;
