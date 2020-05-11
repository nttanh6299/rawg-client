import { CHANGE_ROUTE } from '../constants/ActionTypes';

const initialState = {
  route: {
    keys: {},
    options: {},
    path: ''
  }
};

function router(state = initialState, { type, payload }) {
  switch (type) {
    case CHANGE_ROUTE:
      return {
        ...state,
        route: payload.route
      };
    default:
      return state;
  }
}

export default router;
