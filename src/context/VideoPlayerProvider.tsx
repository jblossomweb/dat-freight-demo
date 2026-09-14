import { useState, type ReactNode } from 'react';

import VideoPlayerDialog from '@/components/dialogs/VideoPlayerDialog';

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
      <VideoPlayerDialog
        videoId="Jh1OHzISXok"
        videoTitle="Eddie Rabbitt"
        isVideoOpen={isVideoOpen}
        isVideoMinimized={isVideoMinimized}
        closeVideo={closeVideo}
        minimizeVideo={setIsVideoMinimized}
      />
    </VideoPlayerContext>
  );
};
