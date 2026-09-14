import { useState, type ReactNode } from 'react';

import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import CloseIcon from '@mui/icons-material/Close';
import MinimizeIcon from '@mui/icons-material/Minimize';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';

import { VideoPlayerContext } from './VideoPlayerContext';

export const VideoPlayerProvider = ({ children }: { children: ReactNode }) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isVideoMinimized, setIsVideoMinimized] = useState(false);

  const openVideo = () => {
    setIsVideoOpen(true);
    setIsVideoMinimized(false);
  };

  const closeVideo = () => {
    setIsVideoOpen(false);
    setIsVideoMinimized(false);
  };

  return (
    <VideoPlayerContext value={{ openVideo }}>
      {children}
      <Dialog
        open={isVideoOpen}
        onClose={(_, reason) => {
          if (reason === 'backdropClick') {
            setIsVideoMinimized(true);
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
              }
              : undefined,
          },
        }}
      >
        <DialogTitle sx={{ py: isVideoMinimized ? 0.5 : 2, bgcolor: 'primary.main', color: 'primary.contrastText' }}>
          Eddie Rabbitt
          <Tooltip title={isVideoMinimized ? 'Expand video' : 'Minimize video'}>
            <IconButton
              aria-label={isVideoMinimized ? 'Expand video' : 'Minimize video'}
              onClick={() => {
                setIsVideoMinimized(!isVideoMinimized);
              }}
              sx={{ position: 'absolute', right: 48, top: isVideoMinimized ? 0 : 8, color: 'inherit' }}
            >
              {isVideoMinimized ? <OpenInFullIcon /> : <MinimizeIcon />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Close video">
            <IconButton
              aria-label="Close video"
              onClick={closeVideo}
              sx={{ position: 'absolute', right: 8, top: isVideoMinimized ? 0 : 8, color: 'inherit' }}
            >
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          {isVideoOpen && (
            <Box
              component="iframe"
              title="Eddie Rabbitt"
              src="https://www.youtube-nocookie.com/embed/Jh1OHzISXok"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              sx={{ display: 'block', width: '100%', aspectRatio: '16 / 9', border: 0 }}
            />
          )}
        </DialogContent>
      </Dialog>
    </VideoPlayerContext>
  );
};