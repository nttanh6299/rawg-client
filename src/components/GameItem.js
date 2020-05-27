import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Background from './Background';
import Video from './Video';
import CustomLink from './CustomLink';
import { FaPlay, FaHeart } from 'react-icons/fa';
import { AiTwotoneLike } from 'react-icons/ai';
import { setMetacriticColor, platformIcon } from '../utils/helpers';
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
  changeRoute: PropTypes.func.isRequired,
  playFullVideo: PropTypes.func.isRequired
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
  parentPlatforms,
  changeRoute,
  playFullVideo
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
      className="game-item"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Background backgroundImage={backgroundImage} hasVideo={hasVideo}>
        {hasVideo && <FaPlay className="icon icon--play" />}
      </Background>
      {showVideo && (
        <Video
          src={clip.clip}
          videoId={clip.video}
          playFullVideo={playFullVideo}
        />
      )}
      <div className="game-item__info">
        <div className="game-item__info__top">
          <div className="game-item__platforms">
            {parentPlatforms.map(({ platform }) => {
              const Icon = platformIcon(platform.slug);
              return Icon ? (
                <Icon
                  key={platform.id}
                  style={{ marginRight: '0.6rem' }}
                  className="icon"
                />
              ) : null;
            })}
          </div>
          <span className={`game-item__meta ${setMetacriticColor(metacritic)}`}>
            {!!metacritic ? metacritic : 0}
          </span>
        </div>
        <div className="game-item__info__bottom">
          <CustomLink
            className="heading-1 game-item__name"
            title={name}
            active={false}
            path={GAME_PATH}
            keys={{ slug }}
            changeRoute={changeRoute}
          >
            {name}
          </CustomLink>
          <AiTwotoneLike className="icon icon--like" />
        </div>
      </div>
    </div>
  );
};

GameItem.propTypes = propTypes;
GameItem.defaultProps = defaultProps;

export default React.memo(GameItem);
