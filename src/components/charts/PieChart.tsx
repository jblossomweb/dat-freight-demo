import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { PieChart as MuiPieChart } from '@mui/x-charts';

interface PieChartProps {
  title: string;
  data: {
    color: string;
    label: string;
    value: number;
  }[],
  renderLabel: (label: string) => React.ReactNode;
}

const PieChart: React.FC<PieChartProps> = ({ title,data, renderLabel }) => (
  <Box sx={{ flex: '1 1 360px', minWidth: 0 }}>
    <Typography variant="h4" align="center" gutterBottom>
      {title}
    </Typography>
    <MuiPieChart
      series={[{ data, innerRadius: 70, outerRadius: 120 }]}
      hideLegend
      width={360}
      height={300}
    />
    <Box component="ul" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, m: 0, p: 0, listStyle: 'none' }}>
      {data.map(item => (
        <Box component="li" key={item.label} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {renderLabel(item.label)}
          <Typography component="span" variant="body2">({item.value})</Typography>
        </Box>
      ))}
    </Box>
  </Box>
);

export default PieChart;
