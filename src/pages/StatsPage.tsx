import type { LoadStatus, EquipmentType } from '@/types/Load';

import { useTheme } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';

import countBy from '@/utils/countBy';
import useDataSource from '@/hooks/useDataSource';
import useFetchJsonLoads from '@/hooks/useLoadsJson';
import useStatsApi from '@/hooks/useStatsApi';

import StatsTemplate from '@/templates/StatsTemplate';
import PieChart from '@/components/charts/PieChart';
import DataSourceToggle from '@/components/inputs/DataSourceToggle';
import EquipmentLabel from '@/components/labels/EquipmentLabel';
import StatusLabel from '@/components/labels/StatusLabel';

function StatsPage() {
  const theme = useTheme();
  const palette = theme.vars?.palette ?? theme.palette;
  const [dataSource, setDataSource] = useDataSource();
  const isJson = dataSource === 'json';

  const loadsJson = useFetchJsonLoads(isJson);
  const statsApi = useStatsApi(!isJson);

  const isLoading = isJson ? loadsJson.isLoading : statsApi.isLoading;
  const error = isJson ? loadsJson.error : statsApi.error;

  const equipmentColors: Record<EquipmentType, string> = {
    Flatbed: palette.equipment.flatbed,
    Reefer: palette.equipment.reefer,
    Van: palette.equipment.van,
  };

  const statusColors: Record<LoadStatus, string> = {
    Available: palette.status.available,
    'In Transit': palette.status.inTransit,
    Delivered: palette.status.delivered,
  };

  const equipmentData = isJson
    ? countBy(
      loadsJson.loads.map(load => load.equipmentType),
      ['Flatbed', 'Reefer', 'Van'] satisfies EquipmentType[],
    ).map(item => ({
      ...item,
      color: equipmentColors[item.label],
    }))
    : statsApi.totals?.equipmentType.map(item => ({
      ...item,
      color: equipmentColors[item.label],
    })) ?? [];

  const statusData = isJson
    ? countBy(
      loadsJson.loads.map(load => load.status),
      ['Available', 'In Transit', 'Delivered'] satisfies LoadStatus[],
    ).map(item => ({
      ...item,
      color: statusColors[item.label],
    }))
    : statsApi.totals?.status.map(item => ({
      ...item,
      color: statusColors[item.label],
    })) ?? [];

  return (
    <StatsTemplate>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
        <DataSourceToggle value={dataSource} onChange={setDataSource} />
      </Box>
      {error ? (
        <Alert severity="error">{error.message || 'Unable to load statistics.'}</Alert>
      ) : (
        <>
          <PieChart
            title="Equipment Type"
            data={isLoading ? [] : equipmentData}
            isLoading={isLoading}
            renderLabel={(label) => <EquipmentLabel equipmentType={label as EquipmentType} />}
          />
          <PieChart
            title="Load Status"
            data={isLoading ? [] : statusData}
            isLoading={isLoading}
            renderLabel={(label) => <StatusLabel status={label as LoadStatus} />}
          />
        </>
      )}
    </StatsTemplate>
  );
}

export default StatsPage;
