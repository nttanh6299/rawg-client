import {
  FETCH_GAMES_REQUEST,
  FETCH_GAMES_SUCCESS
} from '../constants/ActionTypes';
import { fetchApi } from '../utils/apiCaller';
import { getGames } from '../selectors/CommonSelectors';

export const gamesFetchRequest = () => ({ type: FETCH_GAMES_REQUEST });

export const gamesFetchSuccess = (fetchedData, nextUrl) => ({
  type: FETCH_GAMES_SUCCESS,
  payload: { fetchedData, nextUrl }
});

export const fetchGames = (
  url,
  method,
  body,
  params,
  cancelToken
) => async dispatch => {
  try {
    dispatch(gamesFetchRequest());
    const data = await fetchApi(url, method, body, params, cancelToken);

    const { next, results } = data;

    dispatch(gamesFetchSuccess(results, next));
  } catch (err) {
    console.log('fetchGames error', err);
  }
};

export const fetchGamesNext = gamesNextUrl => async (dispatch, getState) => {
  const state = getState();
  const games = getGames(state);
  const { loading, nextUrl } = games;
  const shouldFetch = !loading && gamesNextUrl && nextUrl === gamesNextUrl;
  if (shouldFetch) {
    dispatch(fetchGames(gamesNextUrl, 'GET'));
  }
};
