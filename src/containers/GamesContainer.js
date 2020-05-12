import { connect } from 'react-redux';
import { Games } from '../components';
import { getGenre } from '../selectors/CommonSelectors';
import { getGamesKey } from '../selectors/GamesSelectors';
import { GENRES } from '../constants/GlobalConstants';
import { changeRoute } from '../actions/RouterActions';
import { fetchGamesNext, fetchGamesIfNeeded } from '../actions/GamesActions';

const mapStateToProps = state => {
  return { ...getGamesKey(state), genres: GENRES, genre: getGenre(state) };
};

export default connect(mapStateToProps, {
  fetchGamesNext,
  fetchGamesIfNeeded,
  changeRoute
})(Games);
