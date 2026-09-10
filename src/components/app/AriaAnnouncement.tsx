import Box from '@mui/material/Box';

interface AriaAnnouncementProps {
  children: React.ReactNode;
  assertive?: boolean;
  atomic?: boolean;
  alert?: boolean;
}

const AriaAnnouncement: React.FC<AriaAnnouncementProps> = ({
  assertive = false,
  atomic = true,
  alert = false,
  children,
}) => (
  <Box
    role={alert ? 'alert' : 'status'}
    aria-live={alert ? undefined : assertive ? 'assertive' : 'polite'}
    aria-atomic={atomic}
    sx={{
      position: 'absolute',
      width: 1,
      height: 1,
      p: 0,
      m: -1,
      overflow: 'hidden',
      clip: 'rect(0 0 0 0)',
      whiteSpace: 'nowrap',
      border: 0,
    }}
  >
    {children}
  </Box>
);

export default AriaAnnouncement;
