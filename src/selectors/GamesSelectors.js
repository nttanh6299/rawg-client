import { createSelector } from 'reselect';
import { getGames, getGenre } from './CommonSelectors';

export const getGamesKey = createSelector(
  getGames,
  getGenre,
  (games, genre) => {
    const gamesKey = games[genre];
    if (gamesKey) {
      return { ...gamesKey };
    }
    return {
      loading: false,
      nextUrl: null,
      games: []
    };
  }
);
