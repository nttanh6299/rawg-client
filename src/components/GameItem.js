import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Background from './Background';
import Video from './Video';
import { setMetacriticColor } from '../utils/helpers';

const propTypes = {
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  background_image: PropTypes.string.isRequired,
  metacritic: PropTypes.number.isRequired,
  clip: PropTypes.shape({
    clip: PropTypes.string,
    clips: PropTypes.object
  })
};

const defaultProps = {
  clip: {
    clip: ''
  }
};

const GameItem = ({ name, slug, background_image, metacritic, clip }) => {
  const [hover, setHover] = useState(false);

  const handleMouseEnter = e => {
    setHover(true);
  };

  const handleMouseLeave = e => {
    setHover(false);
  };

  const showVideo = hover && clip && clip.clip;

  return (
    <div
      className="game"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Background backgroundImage={background_image} />
      {showVideo && <Video src={clip.clip} />}
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
