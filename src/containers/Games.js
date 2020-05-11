import { connect } from 'react-redux';
import { Games } from '../components';
import { fetchGames, fetchGamesNext } from '../actions/GamesActions';
import { getGenre } from '../selectors/CommonSelectors';
import { getGamesKey } from '../selectors/GamesSelectors';
import { GENRES } from '../constants/GlobalConstants';
import { changeRoute } from '../actions/RouterActions';

const mapStateToProps = state => {
  return { ...getGamesKey(state), genres: GENRES, genre: getGenre(state) };
};

export default connect(mapStateToProps, {
  fetchGames,
  fetchGamesNext,
  changeRoute
})(Games);
