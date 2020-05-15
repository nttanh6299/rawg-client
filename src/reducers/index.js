import { combineReducers } from 'redux';
import GamesReducer from './GamesReducer';
import RouterReducer from './RouterReducer';
import VideoReducer from './VideoReducer';

export default combineReducers({
  games: GamesReducer,
  router: RouterReducer,
  video: VideoReducer
});
