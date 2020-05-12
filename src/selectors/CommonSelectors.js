export const getGames = state => state.games;

export const getGenre = state =>
  state.router.route.options.query
    ? ''
    : state.router.route.options.genre || 'action';

export const getSearch = state => state.router.route.options.query;
