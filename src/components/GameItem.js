import React from 'react';
import PropTypes from 'prop-types';
import Background from './Background';
import { setMetacriticColor } from '../utils/helpers';

const propTypes = {
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  background_image: PropTypes.string.isRequired,
  metacritic: PropTypes.number.isRequired
};

const defaultProps = {};

const GameItem = ({ name, slug, background_image, metacritic }) => {
  return (
    <div className="game">
      <Background backgroundImage={background_image} />
      <div className="game__info">
        <span className="game__name">{name}</span>
        <span className={`game__meta ${setMetacriticColor(metacritic)}`}>
          {metacritic}
        </span>
      </div>
    </div>
  );
};

GameItem.propTypes = propTypes;
GameItem.defaultProps = defaultProps;

export default GameItem;
