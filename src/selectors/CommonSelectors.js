// GAMES
export const getGames = state => state.games;

// ROUTER
export const getGenre = state =>
  state.router.route.options.query
    ? ''
    : state.router.route.options.genre || 'action';

export const getSearch = state => state.router.route.options.query;

// VIDEO
export const getVideoId = state => state.video.id;
