import React from 'react';
import PropTypes from 'prop-types';
import CustomLink from './CustomLink';

const propTypes = {
  genres: PropTypes.array,
  genre: PropTypes.string,
  changeRoute: PropTypes.func.isRequired
};

const defaultProps = {};

const HeaderGenres = ({ genres, genre, changeRoute }) => {
  return (
    <nav className="nav">
      <div className={`nav__menu`}>
        {genres.map(g => (
          <CustomLink
            key={g.key}
            path={'games'}
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

export default HeaderGenres;
