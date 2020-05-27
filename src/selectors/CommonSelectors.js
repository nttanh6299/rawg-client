// GAMES
export const getGames = state => state.games;

// ROUTER
export const getGenre = state => {
  const { query, tag, genre } = state.router.route.options;
  return query || tag ? '' : genre || 'action';
};

export const getSearch = state => state.router.route.options.query;

export const getSlug = state => state.router.route.keys.slug || '';

export const getTag = state => {
  return state.router.route.options.tag;
};

// APP
export const getWindowSize = state => state.app.windowSize;
