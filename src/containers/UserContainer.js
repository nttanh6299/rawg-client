import { User } from '../components';
import { connect } from 'react-redux';
import { fetchUser, fetchUserLikes } from '../actions/UserActions';
import { changeRoute } from '../actions/RouterActions';
import {
  getUserProfile,
  getUsername,
  getWindowSize,
  getIsAuthenticated,
  getLikes
} from '../selectors/CommonSelectors';
import { isCurrentUser } from '../selectors/UserSelectors';
import { playFullVideo } from '../actions/AppActions';
import { toggleLike } from '../actions/UserActions';

const mapStateToProps = state => {
  return {
    ...getUserProfile(state),
    username: getUsername(state),
    isCurrentUser: isCurrentUser(state),
    windowSize: getWindowSize(state),
    likes: getLikes(state),
    isAuthenticated: getIsAuthenticated(state),
    fetchUserLikes
  };
};

export default connect(mapStateToProps, {
  fetchUser,
  changeRoute,
  playFullVideo,
  toggleLike
})(User);
