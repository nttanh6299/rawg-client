import { FETCH_GAME_SCREENSHOTS_SUCCESS } from '../constants/ActionTypes';
import { gamesFetchSuccess } from '../actions/GamesActions';
import { getGames } from '../selectors/CommonSelectors';
import { GAME_PATH } from '../constants/urlApi';
import { fetchApi } from '../utils/apiCaller';

const fetchGameScreenshotsSuccess = (collectionKey, screenshots) => ({
  type: FETCH_GAME_SCREENSHOTS_SUCCESS,
  payload: { collectionKey, screenshots }
});

const fetchGameScreenshots = (id, collectionKey) => async dispatch => {
  const url = `${GAME_PATH.replace(':slug', id)}/screenshots?page_size=20`;
  const data = await fetchApi(url);
  const { results } = data;
  dispatch(fetchGameScreenshotsSuccess(collectionKey, results));
};

const fetchGame = (collectionKey, url) => async dispatch => {
  const data = await fetchApi(url);
  const { id } = data;
  if (id) {
    dispatch(gamesFetchSuccess(collectionKey, [data], null));
    dispatch(fetchGameScreenshots(id, collectionKey));
  }
};

export const fetchGameIfNeeded = (slug, collectionKey) => async (
  dispatch,
  getState
) => {
  const state = getState();
  const games = getGames(state);
  const collection = games[collectionKey];
  const isExists = !!collection;
  const hasItems = isExists ? collection.games.length > 0 : false;
  if (!isExists || !hasItems) {
    const url = GAME_PATH.replace(':slug', slug);
    dispatch(fetchGame(collectionKey, url));
  }
};
