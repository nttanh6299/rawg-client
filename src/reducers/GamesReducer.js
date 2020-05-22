import {
  FETCH_GAMES_REQUEST,
  FETCH_GAMES_SUCCESS,
  FETCH_GAME_SCREENSHOTS_SUCCESS
} from '../constants/ActionTypes';

const initialState = {
  loading: false,
  nextUrl: null,
  games: []
};

function collection(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_GAMES_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_GAMES_SUCCESS:
      return {
        ...state,
        loading: false,
        nextUrl: payload.nextUrl,
        games: [...state.games, ...payload.fetchedData]
      };
    case FETCH_GAME_SCREENSHOTS_SUCCESS:
      return {
        ...state,
        screenshots: [...payload.screenshots]
      };
    default:
      return state;
  }
}

function games(state = {}, { type, payload }) {
  switch (type) {
    case FETCH_GAMES_REQUEST:
    case FETCH_GAMES_SUCCESS:
    case FETCH_GAME_SCREENSHOTS_SUCCESS:
      return {
        ...state,
        [payload.collectionKey]: collection(state[payload.collectionKey], {
          type,
          payload
        })
      };
    default:
      return state;
  }
}

export default games;
