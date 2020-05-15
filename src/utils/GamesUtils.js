import { GAMES_PATH } from '../constants/urlApi';
import {
  GENRE_COLLECTION_TYPE,
  SEARCH_COLLECTION_TYPE
} from '../constants/GamesConstants';

const isFetching = (collections, collectionKey) =>
  !!collections[collectionKey] ? collections[collectionKey].loading : false;

const gamesUrlByGenre = genre => {
  const genreUriSegment = `genres=${genre}`;
  return `${GAMES_PATH}?${genreUriSegment}`;
};

const gamesUrlBySearch = search => {
  const searchUriSegment = `search=${search}`;
  return `${GAMES_PATH}?${searchUriSegment}`;
};

const gamesNextUrl = (collections, collectionKey) =>
  !!collections[collectionKey] ? collections[collectionKey].nextUrl : null;

const gamesByCollectionKey = (collections, collectionKey) =>
  !!collections[collectionKey] ? collections[collectionKey].games : [];

export const gameCollectionData = (games, genre, search) => {
  if (genre) {
    const collectionKey = [GENRE_COLLECTION_TYPE, genre].join('|');
    return {
      loading: isFetching(games, collectionKey),
      gamesUrl: gamesUrlByGenre(genre),
      gamesNextUrl: gamesNextUrl(games, collectionKey),
      games: gamesByCollectionKey(games, collectionKey),
      collectionKey
    };
  }

  const collectionKey = [SEARCH_COLLECTION_TYPE, search].join('|');
  return {
    loading: isFetching(games, collectionKey),
    gamesUrl: gamesUrlBySearch(search),
    gamesNextUrl: gamesNextUrl(games, collectionKey),
    games: gamesByCollectionKey(games, collectionKey),
    collectionKey
  };
};
