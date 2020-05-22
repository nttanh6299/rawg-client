import { connect } from 'react-redux';
import { Game } from '../components';
import { fetchGameIfNeeded } from '../actions/GameActions';
import { playFullVideo } from '../actions/VideoActions';
import { changeRoute } from '../actions/RouterActions';
import {
  getGame,
  getCollectionKey,
  getScreenshots
} from '../selectors/GameSelectors';
import { getSlug } from '../selectors/CommonSelectors';

const mapStateToProps = state => {
  return {
    game: getGame(state),
    collectionKey: getCollectionKey(state),
    slug: getSlug(state),
    screenshots: getScreenshots(state)
  };
};

export default connect(mapStateToProps, {
  fetchGameIfNeeded,
  playFullVideo,
  changeRoute
})(Game);
