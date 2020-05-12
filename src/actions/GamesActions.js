import {
  FETCH_GAMES_REQUEST,
  FETCH_GAMES_SUCCESS
} from '../constants/ActionTypes';
import { fetchApi } from '../utils/apiCaller';
import { getGames } from '../selectors/CommonSelectors';

export const gamesFetchRequest = collectionKey => ({
  type: FETCH_GAMES_REQUEST,
  payload: { collectionKey }
});

export const gamesFetchSuccess = (collectionKey, fetchedData, nextUrl) => ({
  type: FETCH_GAMES_SUCCESS,
  payload: { collectionKey, fetchedData, nextUrl }
});

export const fetchGames = (collectionKey, url, method) => async dispatch => {
  try {
    dispatch(gamesFetchRequest(collectionKey));
    const data = await fetchApi(url, method);

    const { next, results } = data;

    dispatch(gamesFetchSuccess(collectionKey, results, next));
  } catch (err) {
    console.log('fetchGames error', err);
  }
};

export const fetchGamesNext = (collectionKey, gamesNextUrl) => async (
  dispatch,
  getState
) => {
  const state = getState();
  const games = getGames(state);
  const collection = games[collectionKey];
  const isExist = !!collection;
  const isFetching = isExist ? collection.loading : false;
  const shouldFetch = isExist && !isFetching && gamesNextUrl;
  if (shouldFetch) {
    dispatch(fetchGames(collectionKey, gamesNextUrl));
  }
};

export const fetchGamesIfNeeded = (collectionKey, url) => async (
  dispatch,
  getState
) => {
  const state = getState();
  const games = getGames(state);
  const collection = games[collectionKey];
  const isExists = !!collection;
  const isFetching = isExists ? collection.loading : false;
  const hasItems = isExists ? collection.games.length > 0 : false;
  if (!isExists || (!hasItems && !isFetching)) {
    dispatch(fetchGames(collectionKey, url));
  }
};
