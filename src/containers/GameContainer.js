import { connect } from 'react-redux';
import { Game } from '../components';
import { fetchGameIfNeeded } from '../actions/GameActions';
import { playFullVideo } from '../actions/AppActions';
import { changeRoute } from '../actions/RouterActions';
import { toggleLike } from '../actions/UserActions';
import {
  getGame,
  getCollectionKey,
  getScreenshots
} from '../selectors/GameSelectors';
import {
  getSlug,
  getIsAuthenticated,
  getLikes
} from '../selectors/CommonSelectors';

const mapStateToProps = state => {
  return {
    game: getGame(state),
    collectionKey: getCollectionKey(state),
    slug: getSlug(state),
    screenshots: getScreenshots(state),
    isAuthenticated: getIsAuthenticated(state),
    likes: getLikes(state)
  };
};

export default connect(mapStateToProps, {
  fetchGameIfNeeded,
  playFullVideo,
  changeRoute,
  toggleLike
})(Game);
