import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { setMetacriticColor } from '../utils/helpers';
import {
  IMAGE_URL,
  LARGE_IMAGE_URL,
  MEDIUM_IMAGE_URL,
  GAMES_PATH
} from '../constants/urlApi';
import Loading from './Loading';
import { FaPlay } from 'react-icons/fa';
import CustomLink from './CustomLink';
import {
  AiTwotoneLike,
  AiOutlinePlusCircle,
  AiOutlineLoading
} from 'react-icons/ai';
import { history } from '../utils/helpers';
import { preventClick } from '../utils/helpers';

dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);

const propTypes = {
  fetchGameIfNeeded: PropTypes.func.isRequired,
  collectionKey: PropTypes.string,
  slug: PropTypes.string,
  game: PropTypes.object,
  screenshots: PropTypes.array,
  playFullVideo: PropTypes.func.isRequired,
  changeRoute: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  likes: PropTypes.object,
  toggleLike: PropTypes.func.isRequired
};

const defaultProps = {
  screenshots: []
};

const Game = ({
  fetchGameIfNeeded,
  collectionKey,
  slug,
  game,
  screenshots,
  playFullVideo,
  changeRoute,
  isAuthenticated,
  likes,
  toggleLike
}) => {
  const [loadingToggleLike, setLoadingToggleLike] = useState(false);
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    fetchGameIfNeeded(slug, collectionKey);
  }, [fetchGameIfNeeded, slug, collectionKey]);

  if (!game) {
    return <Loading loading={true} className="u-text-center" />;
  }

  const {
    id,
    backgroundImage,
    name,
    released,
    metacritic,
    genres,
    website,
    descriptionRaw,
    alternativeNames,
    clip,
    tags
  } = game;

  const largeBackground =
    backgroundImage && backgroundImage.replace(IMAGE_URL, LARGE_IMAGE_URL);
  const mediumBackground =
    backgroundImage && backgroundImage.replace(IMAGE_URL, MEDIUM_IMAGE_URL);
  const showCollapsed = descriptionRaw.length > 220 && collapsed;
  const collapsedDescription = showCollapsed
    ? `${descriptionRaw.substring(0, 220)}...`
    : descriptionRaw;
  const videoId = clip && clip.video;
  const releasedDate = `${dayjs(released).format('ll')} (${dayjs(
    released
  ).fromNow()})`;
  const liked = likes[id];

  const handleCollapsed = () => {
    setCollapsed(prev => !prev);
  };

  const handleToggleLike = () => {
    if (isAuthenticated) {
      setLoadingToggleLike(true);
      toggleLike(id, !liked ? game : null, setLoadingToggleLike);
    } else {
      changeRoute({ path: '/login', keys: {}, options: {} });
      history.push('/login');
    }
  };

  return (
    <div className="game">
      <div className="deep">
        <div
          className="game__back-art"
          style={{
            backgroundImage: `linear-gradient(rgba(15, 15, 15, 0.7),
            rgb(21, 21, 21)), linear-gradient(rgba(21, 21, 21, 0.8),
            rgba(21, 21, 21, 0.5)), url(${largeBackground})`,
            zIndex: '1'
          }}
        ></div>
      </div>
      <div className="game__main">
        <div>
          <div
            className="game__art"
            style={{ backgroundImage: `url(${mediumBackground})` }}
          />
          {videoId && (
            <li
              className="game__trailer"
              onClick={playFullVideo.bind(this, videoId)}
            >
              <FaPlay className="icon" />
              <span>Play trailer</span>
            </li>
          )}
          <ul className="game__actions">
            <li
              onClick={loadingToggleLike ? preventClick : handleToggleLike}
              className={`btn game__action game__action--like ${
                liked ? 'game__action--liked' : ''
              }`}
            >
              {loadingToggleLike ? (
                <AiOutlineLoading
                  className="icon icon--loading"
                  style={{ margin: 0 }}
                />
              ) : (
                <React.Fragment>
                  <AiTwotoneLike className="icon" />
                  <span>Like</span>
                </React.Fragment>
              )}
            </li>
            <li className="btn game__action">
              <AiOutlinePlusCircle className="icon" />
              <span onClick={() => alert('Not supported yet!')}>
                Collection
              </span>
            </li>
          </ul>
        </div>
        <div className="game__content">
          <h2 className="game__name">{name}</h2>
          <span className="game__alternative-names">
            {alternativeNames.join(', ')}
          </span>
          <h3 className="heading-3">
            Released Date <p className="game__released"> {releasedDate}</p>
          </h3>
          <span className={`game__meta ${setMetacriticColor(metacritic)}`}>
            {metacritic || 0}
          </span>
          <h3 className="heading-3">
            Genres
            <div className="game__genres">
              {genres.map((genre, index) => (
                <React.Fragment key={genre.id}>
                  {index !== 0 && ', '}
                  <CustomLink
                    className="game__genre"
                    active={false}
                    path={GAMES_PATH}
                    options={{ genre: genre.slug }}
                    changeRoute={changeRoute}
                  >
                    {genre.name}
                  </CustomLink>
                </React.Fragment>
              ))}
            </div>
          </h3>
          <h3 className="heading-3">
            Homepage
            <p className="game__homepage">
              <a href={website} target="blank">
                {website}
              </a>
            </p>
          </h3>
          <h3 className="heading-3">
            Description{' '}
            <p className="game__description">
              {collapsedDescription}
              {showCollapsed && (
                <span
                  className="heading-3 game__show-more"
                  onClick={handleCollapsed}
                >
                  read more
                </span>
              )}
            </p>
          </h3>
        </div>
      </div>
      <div className="game__sub">
        <div className="left">
          <div className="game__images">
            {screenshots.map(ss => (
              <img
                className="game__image"
                key={ss.id}
                alt={ss.id}
                src={ss.image.replace(IMAGE_URL, MEDIUM_IMAGE_URL)}
              />
            ))}
          </div>
        </div>
        <div className="right">
          <h3 className="heading-3">
            Tags
            <div className="game__tags">
              {tags.map(tag => (
                <CustomLink
                  className="game__tag"
                  key={tag.id}
                  active={false}
                  path={GAMES_PATH}
                  options={{ tag: tag.slug }}
                  changeRoute={changeRoute}
                >
                  {tag.name}
                </CustomLink>
              ))}
            </div>
          </h3>
        </div>
      </div>
      <div className="footer">Power by RAWG</div>
    </div>
  );
};

Game.propTypes = propTypes;
Game.defaultProps = defaultProps;

export default Game;
