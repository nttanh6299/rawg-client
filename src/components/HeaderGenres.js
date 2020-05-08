import React from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
import { GENRES } from '../constants/GlobalConstants';

const CustomLink = ({ to, label, exact = true }) => {
  return (
    <Route
      path={'/games/:genre'}
      exact={exact}
      children={({ match }) => {
        const isMatched =
          match &&
          match.params &&
          match.params.genre &&
          match.params.genre === to;
        return isMatched ? (
          <span className="nav__link nav__link--active">{label}</span>
        ) : (
          <Link className="nav__link" to={'/games/' + to}>
            {label}
          </Link>
        );
      }}
    />
  );
};

const HeaderGenres = props => {
  const renderGenres = genres => {
    return genres.map(genre => <CustomLink key={genre.key} {...genre} />);
  };

  return (
    <nav className="nav">
      <div className="nav__menu">{renderGenres(GENRES)}</div>
    </nav>
  );
};

export default withRouter(HeaderGenres);
