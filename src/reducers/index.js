import { combineReducers } from 'redux';
import GamesReducer from './GamesReducer';
import RouterReducer from './RouterReducer';

export default combineReducers({ games: GamesReducer, router: RouterReducer });
