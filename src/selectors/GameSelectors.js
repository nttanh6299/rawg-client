import { createSelector } from 'reselect';
import { getSlug, getGames } from './CommonSelectors';
import { GAME_COLLECTION_TYPE } from '../constants/KeyConstants';

export const getCollectionKey = createSelector(getSlug, slug =>
  [GAME_COLLECTION_TYPE, slug].join('|')
);

export const getGame = createSelector(
  getGames,
  getCollectionKey,
  (games, key) => {
    const collection = games[key];
    return collection && collection.games.length > 0
      ? collection.games[0]
      : null;
  }
);

export const getScreenshots = createSelector(
  [getGames, getCollectionKey],
  (games, key) => {
    const collection = games[key];
    return collection && collection.screenshots ? collection.screenshots : [];
  }
);
