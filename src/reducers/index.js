import { combineReducers } from 'redux';
import GamesReducer from './GamesReducer';
import RouterReducer from './RouterReducer';
import AppReducer from './AppReducer';
import UserReducer from './UserReducer';
import profileReducer from './ProfileReducer';

export default combineReducers({
  games: GamesReducer,
  router: RouterReducer,
  app: AppReducer,
  user: UserReducer,
  profile: profileReducer
});
