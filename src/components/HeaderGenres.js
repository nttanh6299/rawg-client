import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CustomLink from './CustomLink';
import { GAMES_PATH } from '../constants/urlApi';
import { IoMdArrowDropdown } from 'react-icons/io';

const propTypes = {
  genres: PropTypes.array,
  genre: PropTypes.string,
  changeRoute: PropTypes.func.isRequired
};

const defaultProps = {};

const HeaderGenres = ({ genres, genre, changeRoute }) => {
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    setExpanded(prev => !prev);
  };

  return (
    <nav className="header-genres">
      <div className="header-genres__expanded">
        <span className="header-genres__current-genre">{genre || 'Genre'}</span>
        <span className="header-genres__expanded-icon" onClick={handleClick}>
          <IoMdArrowDropdown
            style={{
              transition: '0.2s',
              transform: `rotate(${expanded ? '180deg' : '0deg'})`
            }}
          />
        </span>
      </div>

      <div
        className={`header-genres__menu ${
          expanded ? 'header-genres__menu--expanded' : ''
        }`}
      >
        {genres.map(g => (
          <CustomLink
            key={g.key}
            className={`link ${g.key === genre ? 'link--active' : ''}`}
            onClick={handleClick}
            path={GAMES_PATH}
            active={g.key === genre}
            options={{ genre: g.key }}
            changeRoute={changeRoute}
            {...g}
          >
            {g.label}
          </CustomLink>
        ))}
      </div>
    </nav>
  );
};

HeaderGenres.propTypes = propTypes;
HeaderGenres.defaultProps = defaultProps;

export default React.memo(HeaderGenres);
