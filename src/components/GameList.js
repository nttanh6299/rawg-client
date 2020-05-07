import React from 'react';
import GameItem from './GameItem';
import { data } from '../mockData';

const GameList = () => {
  const renderGames = games => {
    const result = [];
    const length = games.length;
    const column_per_page = 4;
    const items_in_column = Math.ceil(length / column_per_page);

    for (let iC = 0; iC < column_per_page; iC++) {
      const column = [];
      let currentIndex = iC * items_in_column;
      for (let j = 0; j < items_in_column; j++, currentIndex++) {
        const game = games[currentIndex] ? games[currentIndex] : null;
        column.push(<GameItem key={game.id} {...game} />);
      }

      result.push(
        <div key={iC} className="column">
          {column}
        </div>
      );
    }

    return result;
  };

  return <div className="games">{renderGames(data.results)}</div>;
};

export default GameList;
