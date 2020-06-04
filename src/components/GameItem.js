import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Background from './Background';
import Video from './Video';
import CustomLink from './CustomLink';
import { FaPlay } from 'react-icons/fa';
import { AiTwotoneLike, AiOutlineLoading } from 'react-icons/ai';
import { setMetacriticColor, platformIcon } from '../utils/helpers';
import { GAME_PATH } from '../constants/urlApi';
import { history } from '../utils/helpers';

const propTypes = {
  game: PropTypes.object,
  changeRoute: PropTypes.func.isRequired,
  playFullVideo: PropTypes.func.isRequired,
  toggleLike: PropTypes.func.isRequired,
  liked: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const defaultProps = {
  game: {
    clip: {
      clip: '',
      video: ''
    },
    parentPlatforms: []
  }
};

const GameItem = ({
  game,
  changeRoute,
  playFullVideo,
  toggleLike,
  liked,
  isAuthenticated
}) => {
  const [loadingToggleLike, setLoadingToggleLike] = useState(false);
  const [hover, setHover] = useState(false);

  const {
    id,
    name,
    slug,
    backgroundImage,
    metacritic,
    clip,
    parentPlatforms
  } = game;
  const hasVideo = !!clip && !!clip.clip;
  const showVideo = hasVideo && hover;

  const handleMouseEnter = e => {
    setHover(true);
  };

  const handleMouseLeave = e => {
    setHover(false);
  };

  const handleToggleLike = e => {
    if (isAuthenticated) {
      setLoadingToggleLike(true);
      toggleLike(id, !liked ? game : null, setLoadingToggleLike);
    } else {
      changeRoute({ path: '/login', keys: {}, options: {} });
      history.push('/login');
    }
  };

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
          {loadingToggleLike ? (
            <AiOutlineLoading className="icon icon--loading" />
          ) : (
            <AiTwotoneLike
              onClick={handleToggleLike}
              className={`icon icon--like ${liked ? 'icon--liked' : ''}`}
            />
          )}
        </div>
      </div>
    </div>
  );
};

GameItem.propTypes = propTypes;
GameItem.defaultProps = defaultProps;

export default React.memo(GameItem);
