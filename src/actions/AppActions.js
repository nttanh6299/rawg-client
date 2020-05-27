import {
  PLAY_FULL_VIDEO,
  CLOSE_FULL_VIDEO,
  WINDOW_RESIZE
} from '../constants/ActionTypes';

export const playFullVideo = videoId => ({
  type: PLAY_FULL_VIDEO,
  payload: { videoId }
});

export const closeFullVideo = () => ({
  type: CLOSE_FULL_VIDEO
});

export const windowResize = size => ({
  type: WINDOW_RESIZE,
  payload: { size }
});
