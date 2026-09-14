import { createContext } from 'react';

export interface VideoPlayerContextValue {
  openVideo: () => void;
}

export const VideoPlayerContext = createContext<VideoPlayerContextValue | undefined>(undefined);