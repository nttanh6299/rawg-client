import React from 'react';
import PropTypes from 'prop-types';
import GameItem from './GameItem';

const propTypes = {
  games: PropTypes.array
};

const defaultProps = {
  games: []
};

const GameRendered = ({ games }) => {
  const renderGames = games => {
    return games.map(game => <GameItem key={game.id} {...game} />);
  };

  return <div className="games-rendered">{renderGames(games)}</div>;
};

GameRendered.propTypes = propTypes;
GameRendered.defaultProps = defaultProps;

export default React.memo(GameRendered);
