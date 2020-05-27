import {
  PLAY_FULL_VIDEO,
  CLOSE_FULL_VIDEO,
  WINDOW_RESIZE
} from '../constants/ActionTypes';
import { WINDOW_SIZE } from '../constants/GlobalConstants';

const initialState = {
  videoId: '',
  windowSize: WINDOW_SIZE.all
};

function app(state = initialState, { type, payload }) {
  switch (type) {
    case PLAY_FULL_VIDEO:
      return {
        ...state,
        videoId: payload.videoId
      };
    case CLOSE_FULL_VIDEO:
      return {
        ...state,
        videoId: ''
      };
    case WINDOW_RESIZE:
      return {
        ...state,
        windowSize: payload.size
      };
    default:
      return state;
  }
}

export default app;
