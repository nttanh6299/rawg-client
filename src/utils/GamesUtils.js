import { GAMES_PATH } from '../constants/urlApi';
import {
  GENRE_COLLECTION_TYPE,
  SEARCH_COLLECTION_TYPE,
  TAG_COLLECTION_TYPE
} from '../constants/KeyConstants';

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

const gamesUrlByTag = tag => {
  const searchUriSegment = `tags=${tag}`;
  return `${GAMES_PATH}?${searchUriSegment}`;
};

const gamesNextUrl = (collections, collectionKey) =>
  !!collections[collectionKey] ? collections[collectionKey].nextUrl : null;

const gamesByCollectionKey = (collections, collectionKey) =>
  !!collections[collectionKey] ? collections[collectionKey].games : [];

export const gameCollectionData = (games, genre, search, tag) => {
  if (search) {
    const collectionKey = [SEARCH_COLLECTION_TYPE, search].join('|');
    return {
      loading: isFetching(games, collectionKey),
      gamesUrl: gamesUrlBySearch(search),
      gamesNextUrl: gamesNextUrl(games, collectionKey),
      games: gamesByCollectionKey(games, collectionKey),
      collectionKey
    };
  } else if (tag) {
    const collectionKey = [TAG_COLLECTION_TYPE, tag].join('|');
    return {
      loading: isFetching(games, collectionKey),
      gamesUrl: gamesUrlByTag(tag),
      gamesNextUrl: gamesNextUrl(games, collectionKey),
      games: gamesByCollectionKey(games, collectionKey),
      collectionKey
    };
  }

  const collectionKey = [GENRE_COLLECTION_TYPE, genre].join('|');
  return {
    loading: isFetching(games, collectionKey),
    gamesUrl: gamesUrlByGenre(genre),
    gamesNextUrl: gamesNextUrl(games, collectionKey),
    games: gamesByCollectionKey(games, collectionKey),
    collectionKey
  };
};
