import { use } from 'react';

import { VideoPlayerContext, type VideoPlayerContextValue } from './VideoPlayerContext';

const useVideoPlayer = (): VideoPlayerContextValue => {
  const context = use(VideoPlayerContext);

  if (!context) {
    throw new Error('useVideoPlayer must be used within VideoPlayerProvider.');
  }

  return context;
};

export default useVideoPlayer;