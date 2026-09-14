import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import CloseIcon from '@mui/icons-material/Close';
import MinimizeIcon from '@mui/icons-material/Minimize';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';

interface VideoPlayerDialogProps {
  videoId: string;
  videoTitle?: string;
  isVideoOpen: boolean;
  isVideoMinimized: boolean;
  closeVideo: () => void;
  minimizeVideo: (minimized: boolean) => void;
}

const VideoPlayerDialog: React.FC<VideoPlayerDialogProps> = ({
  videoId,
  videoTitle,
  isVideoOpen,
  isVideoMinimized,
  closeVideo,
  minimizeVideo,
}) => (
  <Dialog
    open={isVideoOpen}
    onClose={(_, reason) => {
      if (reason === 'backdropClick') {
        minimizeVideo(true);
      } else {
        closeVideo();
      }
    }}
    fullWidth={!isVideoMinimized}
    maxWidth={isVideoMinimized ? false : 'md'}
    hideBackdrop={isVideoMinimized}
    disableAutoFocus={isVideoMinimized}
    disableEnforceFocus={isVideoMinimized}
    disableRestoreFocus={isVideoMinimized}
    aria-modal={!isVideoMinimized}
    slotProps={{
      root: {
        sx: isVideoMinimized ? { pointerEvents: 'none' } : undefined,
      },
      paper: {
        sx: isVideoMinimized
          ? {
            position: 'fixed',
            right: { xs: 8, sm: 16 },
            bottom: { xs: 8, sm: 16 },
            m: 0,
            width: { xs: 'calc(100vw - 16px)', sm: 360 },
            pointerEvents: 'auto',
            boxShadow: 2,
          }
          : { boxShadow: 2 },
      },
    }}
  >
    <DialogTitle
      sx={{
        py: isVideoMinimized ? 0.5 : 2,
        pr: isVideoMinimized ? 1 : 1.5,
        fontSize: isVideoMinimized ? 16 : 24,
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: isVideoMinimized ? 0.5 : 1,
      }}
    >
      {videoTitle ?? 'Video'}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: isVideoMinimized ? 0.5 : 1, my: isVideoMinimized ? 0 : -1 }}>
        <Tooltip title={isVideoMinimized ? 'Expand video' : 'Minimize video'}>
          <IconButton
            aria-label={isVideoMinimized ? 'Expand video' : 'Minimize video'}
            onClick={() => {
              minimizeVideo(!isVideoMinimized);
            }}
            size={isVideoMinimized ? 'small' : 'medium'}
            sx={{
              color: 'common.white',
              bgcolor: 'dialog.minimize.main',
              borderRadius: 1,
              boxShadow: 2,
              p: isVideoMinimized ? 0.25 : 0.5,
              '& svg': { fontSize: isVideoMinimized ? '1rem' : '1.875rem' },
              '&:hover': { bgcolor: 'dialog.minimize.light' },
            }}
          >
            {isVideoMinimized ? <OpenInFullIcon /> : <MinimizeIcon />}
          </IconButton>
        </Tooltip>
        <Tooltip title="Close video">
          <IconButton
            aria-label="Close video"
            onClick={closeVideo}
            size={isVideoMinimized ? 'small' : 'medium'}
            sx={{
              color: 'common.white',
              bgcolor: 'dialog.close.main',
              borderRadius: 1,
              boxShadow: 2,
              p: isVideoMinimized ? 0.25 : 0.5,
              '& svg': { fontSize: isVideoMinimized ? '1rem' : '1.875rem' },
              '&:hover': { bgcolor: 'dialog.close.light' },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </DialogTitle>
    <DialogContent sx={{ p: 0 }}>
      {isVideoOpen && (
        <Box
          component="iframe"
          title={videoTitle ?? 'Video'}
          src={`https://www.youtube-nocookie.com/embed/${videoId}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          sx={{ display: 'block', width: '100%', aspectRatio: '16 / 9', border: 0 }}
        />
      )}
    </DialogContent>
  </Dialog>
);

export default VideoPlayerDialog;
