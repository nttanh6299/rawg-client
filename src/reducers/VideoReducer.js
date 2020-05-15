import { PLAY_FULL_VIDEO, CLOSE_FULL_VIDEO } from '../constants/ActionTypes';

const initialState = {
  id: ''
};

function video(state = initialState, { type, payload }) {
  switch (type) {
    case PLAY_FULL_VIDEO:
      return {
        ...state,
        id: payload.videoId
      };
    case CLOSE_FULL_VIDEO:
      return {
        ...state,
        id: ''
      };
    default:
      return state;
  }
}

export default video;
