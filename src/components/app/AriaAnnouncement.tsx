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
      position: 'fixed',
      top: 0,
      left: 0,
      width: '1px',
      height: '1px',
      p: 0,
      m: '-1px',
      overflow: 'hidden',
      clip: 'rect(0 0 0 0)',
      clipPath: 'inset(50%)',
      whiteSpace: 'nowrap',
      border: 0,
    }}
  >
    {children}
  </Box>
);

export default AriaAnnouncement;
