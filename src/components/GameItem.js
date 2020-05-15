import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Background from './Background';
import Video from './Video';
import CustomLink from './CustomLink';
import { ReactComponent as PlayIcon } from '../images/SVG/play.svg';
import { setMetacriticColor } from '../utils/helpers';
import { GAME_PATH } from '../constants/urlApi';

const propTypes = {
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  backgroundImage: PropTypes.string,
  metacritic: PropTypes.number,
  clip: PropTypes.shape({
    clip: PropTypes.string,
    video: PropTypes.string
  }),
  handleSetVideoId: PropTypes.func,
  changeRoute: PropTypes.func
};

const defaultProps = {
  clip: {
    clip: '',
    video: ''
  }
};

const GameItem = ({
  name,
  slug,
  backgroundImage,
  metacritic,
  clip,
  handleSetVideoId,
  changeRoute
}) => {
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
      {showVideo && (
        <Video
          src={clip.clip}
          videoId={clip.video}
          handleSetVideoId={handleSetVideoId}
        />
      )}
      <div className="game__info">
        <CustomLink
          className="game__name"
          title={name}
          active={false}
          path={GAME_PATH}
          keys={{ slug }}
          changeRoute={changeRoute}
        >
          {name}
        </CustomLink>
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
