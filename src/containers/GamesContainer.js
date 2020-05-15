import { connect } from 'react-redux';
import { Games } from '../components';
import { getGenre, getVideoId } from '../selectors/CommonSelectors';
import { getGameCollectionData } from '../selectors/GamesSelectors';
import { GENRES } from '../constants/GlobalConstants';
import { changeRoute } from '../actions/RouterActions';
import { fetchGamesNext, fetchGamesIfNeeded } from '../actions/GamesActions';
import { playFullVideo, closeFullVideo } from '../actions/VideoActions';

const mapStateToProps = state => {
  return {
    ...getGameCollectionData(state),
    genres: GENRES,
    genre: getGenre(state),
    videoId: getVideoId(state)
  };
};

export default connect(mapStateToProps, {
  fetchGamesNext,
  fetchGamesIfNeeded,
  changeRoute,
  playFullVideo,
  closeFullVideo
})(Games);
