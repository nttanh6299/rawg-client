import React from 'react';
import PropTypes from 'prop-types';
import GameItem from './GameItem';

const propTypes = {
  games: PropTypes.array,
  changeRoute: PropTypes.func.isRequired,
  playFullVideo: PropTypes.func.isRequired
};

const defaultProps = {
  games: []
};

const GameRendered = ({ games, changeRoute, playFullVideo }) => {
  const renderGames = games => {
    return games.map(game => (
      <GameItem
        key={game.id}
        {...game}
        changeRoute={changeRoute}
        playFullVideo={playFullVideo}
      />
    ));
  };

  return <div className="games-rendered">{renderGames(games)}</div>;
};

GameRendered.propTypes = propTypes;
GameRendered.defaultProps = defaultProps;

export default React.memo(GameRendered);
