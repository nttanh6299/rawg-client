export const getGames = state => state.games;

export const getGenre = state => state.router.route.options.genre || '';
