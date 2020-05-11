import {
  FETCH_GAMES_REQUEST,
  FETCH_GAMES_SUCCESS
} from '../constants/ActionTypes';
import { fetchApi } from '../utils/apiCaller';
import { getGames } from '../selectors/CommonSelectors';

export const gamesFetchRequest = genre => ({
  type: FETCH_GAMES_REQUEST,
  payload: { genre }
});

export const gamesFetchSuccess = (genre, fetchedData, nextUrl) => ({
  type: FETCH_GAMES_SUCCESS,
  payload: { genre, fetchedData, nextUrl }
});

export const fetchGames = (genre, url, method) => async dispatch => {
  try {
    dispatch(gamesFetchRequest(genre));
    const data = await fetchApi(url, method);

    const { next, results } = data;

    dispatch(gamesFetchSuccess(genre, results, next));
  } catch (err) {
    console.log('fetchGames error', err);
  }
};

export const fetchGamesNext = (genre, gamesNextUrl) => async (
  dispatch,
  getState
) => {
  const state = getState();
  const games = getGames(state);
  const gamesKey = games[genre];

  const isFetching = !!gamesKey ? gamesKey.loading : false;
  const shouldFetch = !isFetching && gamesNextUrl;
  if (shouldFetch) {
    dispatch(fetchGames(genre, gamesNextUrl));
  }
};
