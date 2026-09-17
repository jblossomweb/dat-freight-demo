import type { LoadStatus, EquipmentType } from '@/types/Load';

import { useNavigate, useSearch } from '@tanstack/react-router';
import { useTheme } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';

import countBy from '@/utils/countBy';
import quickSearchLoads from '@/utils/quickSearchLoads';
import useDataSource from '@/hooks/useDataSource';
import useFetchJsonLoads from '@/hooks/useLoadsJson';
import useStatsApi from '@/hooks/useStatsApi';

import StatsTemplate from '@/templates/StatsTemplate';
import PieChart from '@/components/charts/PieChart';
import SearchInput from '@/components/inputs/SearchInput';
import DataSourceToggle from '@/components/inputs/DataSourceToggle';
import EquipmentLabel from '@/components/labels/EquipmentLabel';
import StatusLabel from '@/components/labels/StatusLabel';

function StatsPage() {
  const from = '/stats';
  const theme = useTheme();
  const palette = theme.vars?.palette ?? theme.palette;
  const queryStringParams = useSearch({ from });
  const navigate = useNavigate({ from });
  const search = queryStringParams.q ?? '';
  const [dataSource, setDataSource] = useDataSource();
  const isJson = dataSource === 'json';

  const loadsJson = useFetchJsonLoads(isJson);
  const statsApi = useStatsApi(search, !isJson);

  const isLoading = isJson ? loadsJson.isLoading : statsApi.isLoading;
  const error = isJson ? loadsJson.error : statsApi.error;

  const handleSearchChange = (value: string) => {
    void navigate({
      search: (prev) => ({
        ...prev,
        q: value || undefined,
      }),
      replace: true,
    });
  };

  const filteredJsonLoads = isJson
    ? quickSearchLoads(loadsJson.loads, search)
    : [];

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
      filteredJsonLoads.map(load => load.equipmentType),
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
      filteredJsonLoads.map(load => load.status),
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
      <Box sx={{ width: '100%', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2 }}>
        <SearchInput
          placeholder="Search Loads..."
          ariaLabel="Search Loads"
          value={search}
          onSearchChange={handleSearchChange}
        />
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
