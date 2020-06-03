import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import GamesRendered from './GamesRendered';

const propTypes = {
  uid: PropTypes.string.isRequired,
  fetchUserLikes: PropTypes.func.isRequired,
  changeRoute: PropTypes.func.isRequired,
  playFullVideo: PropTypes.func.isRequired,
  windowSize: PropTypes.number.isRequired,
  toggleLike: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  likes: PropTypes.object
};

const defaultProps = {};

const UserLikesTab = ({
  uid,
  fetchUserLikes,
  changeRoute,
  playFullVideo,
  windowSize,
  toggleLike,
  isAuthenticated,
  likes
}) => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGamesUserLike = async () => {
      const res = await fetchUserLikes(uid);
      const data = res.data();
      if (data) {
        const gameArr = Object.keys(data).reduce(
          (arr, key) => [...arr, data[key]],
          []
        );
        setGames(gameArr);
      }
    };

    fetchGamesUserLike();
  }, [uid, fetchUserLikes]);

  return (
    <div className="user-likes">
      <GamesRendered
        games={games}
        likes={likes}
        changeRoute={changeRoute}
        playFullVideo={playFullVideo}
        windowSize={windowSize}
        toggleLike={toggleLike}
        isAuthenticated={isAuthenticated}
      />
    </div>
  );
};

UserLikesTab.propTypes = propTypes;
UserLikesTab.defaultProps = defaultProps;

export default UserLikesTab;
