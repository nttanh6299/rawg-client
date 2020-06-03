import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import GamesRendered from './GamesRendered';
import Loading from './Loading';

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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchGamesUserLike = async () => {
      setLoading(true);
      const res = await fetchUserLikes(uid);
      const data = res.data();
      if (data) {
        const gameArr = Object.keys(data)
          .filter(key => !!data[key])
          .reduce((arr, key) => [...arr, data[key]], []);
        setGames(gameArr);
      }
      setLoading(false);
    };

    fetchGamesUserLike();
  }, [uid, fetchUserLikes]);

  if (loading) {
    return <Loading loading={true} className="u-text-center" />;
  }

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
