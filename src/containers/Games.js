import { connect } from 'react-redux';
import { Games } from '../components';
import { fetchGames, fetchGamesNext } from '../actions/GamesActions';
import { getGames } from '../selectors/CommonSelectors';

const mapStateToProps = state => {
  const games = getGames(state);
  return { ...games };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchGames: (url, method, body, params, cancelToken) =>
      dispatch(fetchGames(url, method, body, params, cancelToken)),
    fetchGamesNext: gamesNextUrl => dispatch(fetchGamesNext(gamesNextUrl))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Games);
