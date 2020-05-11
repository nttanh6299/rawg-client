import { CHANGE_ROUTE } from '../constants/ActionTypes';

export const changeRoute = route => ({
  type: CHANGE_ROUTE,
  payload: { route }
});

export const initRouter = () => dispatch => {
  const path = window.location.pathname;
  const options = {};
  if (path === '/') {
    dispatch(changeRoute({ path, keys: {}, options }));
    return;
  }

  const queries = new URLSearchParams(window.location.search);
  for (const query of queries) {
    const [key, value] = query;
    options[key] = value;
  }
  dispatch(changeRoute({ path, keys: {}, options }));
};
