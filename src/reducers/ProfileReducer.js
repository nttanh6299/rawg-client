import { FETCH_VISITED_USER_SUCCESS } from '../constants/ActionTypes';

const initialState = {
  loadingUserProfile: true,
  visitedUserProfile: null
};

function profileReducer(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_VISITED_USER_SUCCESS:
      return {
        ...state,
        loadingUserProfile: false,
        visitedUserProfile: payload.user
      };
    default:
      return state;
  }
}

export default profileReducer;
