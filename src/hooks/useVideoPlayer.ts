import type { VideoPlayerContextValue } from '@/context/VideoPlayerContext';

import { use } from 'react';

import { VideoPlayerContext } from '@/context/VideoPlayerContext';

const useVideoPlayer = (): VideoPlayerContextValue => {
  const context = use(VideoPlayerContext);

  if (!context) {
    throw new Error('useVideoPlayer must be used within VideoPlayerProvider.');
  }

  return context;
};

export default useVideoPlayer;
