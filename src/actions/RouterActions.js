import { CHANGE_ROUTE } from '../constants/ActionTypes';
import { parseRoute } from '../utils/RouterUtils';

export const changeRoute = route => ({
  type: CHANGE_ROUTE,
  payload: { route }
});

export const initRouter = paths => dispatch => {
  window.onpopstate = () => {
    const { pathname, search } = window.location;
    const route = parseRoute(paths, pathname, search);
    dispatch(changeRoute(route));
  };

  const { pathname, search } = window.location;
  const route = parseRoute(paths, pathname, search);
  dispatch(changeRoute(route));
};
