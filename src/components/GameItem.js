import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Background from './Background';
import Video from './Video';
import { ReactComponent as PlayIcon } from '../images/SVG/play.svg';
import { setMetacriticColor } from '../utils/helpers';

const propTypes = {
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  backgroundImage: PropTypes.string,
  metacritic: PropTypes.number,
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

const GameItem = ({ name, slug, backgroundImage, metacritic, clip }) => {
  const [hover, setHover] = useState(false);

  const handleMouseEnter = e => {
    setHover(true);
  };

  const handleMouseLeave = e => {
    setHover(false);
  };

  const hasVideo = !!clip && !!clip.clip;
  const showVideo = hasVideo && hover;

  return (
    <div
      className="game"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Background backgroundImage={backgroundImage} hasVideo={hasVideo}>
        {hasVideo && <PlayIcon className="icon icon--play" />}
      </Background>
      {showVideo && <Video src={clip.clip} />}
      <div className="game__info">
        <span className="game__name" title={name}>
          {name}
        </span>
        <span className={`game__meta ${setMetacriticColor(metacritic)}`}>
          {metacritic}
        </span>
      </div>
    </div>
  );
};

GameItem.propTypes = propTypes;
GameItem.defaultProps = defaultProps;

export default React.memo(GameItem);
