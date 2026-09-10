import type { LoadStatus, EquipmentType } from '@/types/Load';

import { useTheme } from '@mui/material/styles';

import Alert from '@mui/material/Alert';

import countBy from '@/utils/countBy';
import useFetchLoads from '@/hooks/useFetchLoads';

import StatsTemplate from '@/templates/StatsTemplate';
import PieChart from '@/components/charts/PieChart';
import EquipmentLabel from '@/components/labels/EquipmentLabel';
import StatusLabel from '@/components/labels/StatusLabel';

function StatsPage() {
  const theme = useTheme();
  const palette = theme.vars?.palette ?? theme.palette;

  const { loads, isLoading, error } = useFetchLoads();

  if (isLoading) {
    return (
      <StatsTemplate>
        <PieChart
          title="Equipment Type"
          data={[]}
          isLoading={isLoading}
          renderLabel={() => null}
        />
        <PieChart
          title="Load Status"
          data={[]}
          isLoading={isLoading}
          renderLabel={() => null}
        />
      </StatsTemplate>
    );
  }

  if (error) {
    return (
      <StatsTemplate>
        <Alert severity="error">Error: {error.message}</Alert>
      </StatsTemplate>
    );
  }

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
    <StatsTemplate>
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
    </StatsTemplate>
  );
}

export default StatsPage;
