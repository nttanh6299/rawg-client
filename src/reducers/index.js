import { combineReducers } from 'redux';
import GamesReducer from './GamesReducer';
import RouterReducer from './RouterReducer';
import AppReducer from './AppReducer';

export default combineReducers({
  games: GamesReducer,
  router: RouterReducer,
  app: AppReducer
});
