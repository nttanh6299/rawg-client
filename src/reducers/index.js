import { combineReducers } from 'redux';
import GamesReducer from './GamesReducer';

export default combineReducers({ games: GamesReducer });
