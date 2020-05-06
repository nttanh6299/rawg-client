import React from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
import { GENRES } from '../constants/GlobalConstants';
//import { history } from '../utils/helpers';

const CustomLink = ({ to, label, exact = true }) => {
  return (
    <Route
      path={to}
      exact={exact}
      children={({ match }) => {
        return (
          <Link
            className={`nav__link ${match ? 'nav__link--active' : ''}`}
            to={'/games/' + to}
          >
            {label}
          </Link>
        );
      }}
    />
  );
};

const HeaderGenres = props => {
  const renderGenres = genres => {
    let result = [];
    const length = genres.length ? genres.length : 0;
    for (let i = 0; i < length; i++) {
      const { id, name, slug } = genres[i];
      result.push(<CustomLink key={id} to={slug} label={name} />);
    }

    return result;
  };

  return (
    <nav className="nav">
      <div className="nav__menu">{renderGenres(GENRES)}</div>
    </nav>
  );
};

export default withRouter(HeaderGenres);
