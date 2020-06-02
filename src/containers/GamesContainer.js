import { connect } from 'react-redux';
import { Games } from '../components';
import {
  getGenre,
  getWindowSize,
  getLikes,
  getIsAuthenticated
} from '../selectors/CommonSelectors';
import { getGameCollectionData } from '../selectors/GamesSelectors';
import { GENRES } from '../constants/GlobalConstants';
import { changeRoute } from '../actions/RouterActions';
import { fetchGamesNext, fetchGamesIfNeeded } from '../actions/GamesActions';
import { playFullVideo } from '../actions/AppActions';
import { toggleLike } from '../actions/UserActions';

const mapStateToProps = state => {
  return {
    ...getGameCollectionData(state),
    genres: GENRES,
    genre: getGenre(state),
    windowSize: getWindowSize(state),
    likes: getLikes(state),
    isAuthenticated: getIsAuthenticated(state)
  };
};

export default connect(mapStateToProps, {
  fetchGamesNext,
  fetchGamesIfNeeded,
  changeRoute,
  playFullVideo,
  toggleLike
})(Games);
