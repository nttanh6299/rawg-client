import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { setMetacriticColor } from '../utils/helpers';
import {
  IMAGE_URL,
  LARGE_IMAGE_URL,
  MEDIUM_IMAGE_URL,
  GAMES_PATH
} from '../constants/urlApi';
import Loading from './Loading';
import { ReactComponent as PlayIcon } from '../images/SVG/play.svg';
import CustomLink from './CustomLink';

const propTypes = {
  fetchGameIfNeeded: PropTypes.func.isRequired,
  collectionKey: PropTypes.string,
  slug: PropTypes.string,
  game: PropTypes.object,
  screenshots: PropTypes.array,
  playFullVideo: PropTypes.func.isRequired,
  changeRoute: PropTypes.func.isRequired
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
  changeRoute
}) => {
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    fetchGameIfNeeded(slug, collectionKey);
  }, [fetchGameIfNeeded, slug, collectionKey]);

  if (!game) {
    return <Loading loading={true} className="u-text-center" />;
  }

  const {
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

  const handleCollapsed = () => {
    setCollapsed(prev => !prev);
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
        </div>
        <div className="game__content">
          <h2 className="game__name">{name}</h2>
          <span className="game__alternative-names">
            {alternativeNames.join(', ')}
          </span>
          <h3 className="heading-3">
            Released Date <p className="game__released"> {released}</p>
          </h3>

          <ul className="game__actions">
            <li
              className={`game__action game__action--meta ${setMetacriticColor(
                metacritic
              )}`}
            >
              {metacritic || 0}
            </li>
            <li className="game__action">Like</li>
            <li className="game__action">Collection</li>
            {videoId && (
              <li
                className="game__action game__action--play"
                onClick={playFullVideo.bind(this, videoId)}
              >
                <PlayIcon className="icon" />
                <span>Play trailer</span>
              </li>
            )}
          </ul>
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
              <a href={website}>{website}</a>
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
    </div>
  );
};

Game.propTypes = propTypes;
Game.defaultProps = defaultProps;

export default Game;
