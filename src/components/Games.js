import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import GamesRendered from './GamesRendered';
import Loading from './Loading';
import withInfiniteScroll from './HOCs/withInfiniteScroll';
import HeaderGenres from './HeaderGenres';

const propTypes = {
  loading: PropTypes.bool.isRequired,
  games: PropTypes.array,
  genres: PropTypes.array,
  genre: PropTypes.string,
  changeRoute: PropTypes.func.isRequired,
  fetchGamesIfNeeded: PropTypes.func.isRequired,
  collectionKey: PropTypes.string,
  gamesUrl: PropTypes.string,
  videoId: PropTypes.string,
  playFullVideo: PropTypes.func.isRequired,
  windowSize: PropTypes.number.isRequired,
  toggleLike: PropTypes.func.isRequired,
  likes: PropTypes.object,
  isAuthenticated: PropTypes.bool.isRequired
};

const defaultProps = {};

const Games = ({
  loading,
  games,
  genres,
  genre,
  changeRoute,
  fetchGamesIfNeeded,
  collectionKey,
  gamesUrl,
  playFullVideo,
  windowSize,
  toggleLike,
  likes,
  isAuthenticated
}) => {
  useEffect(() => {
    fetchGamesIfNeeded(collectionKey, gamesUrl);
  }, [fetchGamesIfNeeded, collectionKey, gamesUrl]);

  return (
    <div style={{ margin: '2rem 0 12rem 0' }}>
      <HeaderGenres genres={genres} genre={genre} changeRoute={changeRoute} />
      <GamesRendered
        games={games}
        changeRoute={changeRoute}
        playFullVideo={playFullVideo}
        windowSize={windowSize}
        toggleLike={toggleLike}
        likes={likes}
        isAuthenticated={isAuthenticated}
      />
      <Loading
        loading={loading}
        style={{ marginTop: '2rem' }}
        className="u-text-center"
      />
    </div>
  );
};

Games.propTypes = propTypes;
Games.defaultProps = defaultProps;

export default withInfiniteScroll(Games);
