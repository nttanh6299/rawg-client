import React, { useState, useCallback, Fragment } from 'react';
import PropTypes from 'prop-types';
import GameItem from './GameItem';
import FullVideo from './FullVideo';

const propTypes = {
  games: PropTypes.array
};

const defaultProps = {
  games: []
};

const GameRendered = ({ games }) => {
  const [videoId, setVideoId] = useState('');

  const handleSetVideoId = useCallback(videoId => {
    setVideoId(videoId);
  }, []);

  const handleClose = useCallback(() => {
    setVideoId('');
  }, []);

  const renderGames = games => {
    return games.map(game => (
      <GameItem key={game.id} {...game} onClick={handleSetVideoId} />
    ));
  };

  return (
    <Fragment>
      <div className="games-rendered">{renderGames(games)}</div>
      <FullVideo onClose={handleClose} videoId={videoId} />
    </Fragment>
  );
};

GameRendered.propTypes = propTypes;
GameRendered.defaultProps = defaultProps;

export default React.memo(GameRendered);
