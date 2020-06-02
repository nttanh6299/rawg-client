import {
  LOGIN_SUCCESS,
  CLEAR_USER,
  UPDATE_USER_USERNAME,
  FETCH_USER_LIKES_SUCCESS,
  TOGGLE_LIKE
} from '../constants/ActionTypes';

const initialState = {
  currentUser: null,
  loadedAuth: false,
  likes: {}
};

export default function user(state = initialState, { type, payload }) {
  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        currentUser: payload.user,
        loadedAuth: true
      };
    case CLEAR_USER:
      return {
        ...state,
        currentUser: null,
        loadedAuth: true
      };
    case UPDATE_USER_USERNAME:
      return {
        ...state,
        currentUser: { ...state.currentUser, displayName: payload.username }
      };
    case FETCH_USER_LIKES_SUCCESS:
      return {
        ...state,
        likes: { ...payload.likes }
      };
    case TOGGLE_LIKE:
      return {
        ...state,
        likes: { ...state.likes, [payload.id]: payload.liked }
      };
    default:
      return state;
  }
}
