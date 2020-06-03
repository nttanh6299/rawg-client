import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import GameItem from './GameItem';
import { WINDOW_SIZE } from '../constants/GlobalConstants';

const propTypes = {
  games: PropTypes.array,
  changeRoute: PropTypes.func.isRequired,
  playFullVideo: PropTypes.func.isRequired,
  windowSize: PropTypes.number.isRequired,
  toggleLike: PropTypes.func.isRequired,
  likes: PropTypes.object,
  isAuthenticated: PropTypes.bool.isRequired
};

const defaultProps = {
  games: []
};

function setCol(windowSize) {
  switch (windowSize) {
    case WINDOW_SIZE.all:
      return 4;
    case WINDOW_SIZE.desktop:
      return 3;
    case WINDOW_SIZE.laptop:
      return 2;
    case WINDOW_SIZE.tablet:
      return 1;
    default:
      return 1;
  }
}

const GameRendered = ({
  games,
  changeRoute,
  playFullVideo,
  windowSize,
  toggleLike,
  likes,
  isAuthenticated
}) => {
  const [gamesRendered, setGameRendered] = useState([]);
  const [colRendered, setColRendered] = useState(setCol(windowSize));

  useEffect(() => {
    let col = 0;
    const items = [];

    for (let i = 0; i < colRendered; i++) {
      items.push([]);
    }

    for (let i = 0; i < games.length; i++) {
      items[col].push(games[i]);
      col++;
      if (col === colRendered) {
        col = 0;
      }
    }
    setGameRendered(items);
  }, [games, colRendered]);

  useEffect(() => {
    setColRendered(setCol(windowSize));
  }, [windowSize]);

  return (
    <div
      className="games-rendered"
      style={{
        gridTemplateColumns: `repeat(${colRendered}, minmax(30rem, 50rem)`
      }}
    >
      {gamesRendered.map((set, index) => {
        return (
          <div className="col" key={'games-' + index}>
            {set.map(game => {
              return (
                <GameItem
                  key={game.id}
                  game={game}
                  changeRoute={changeRoute}
                  playFullVideo={playFullVideo}
                  toggleLike={toggleLike}
                  liked={!!likes[game.id]}
                  isAuthenticated={isAuthenticated}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

GameRendered.propTypes = propTypes;
GameRendered.defaultProps = defaultProps;

export default React.memo(GameRendered);
