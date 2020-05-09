import React, { useState } from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
import { GENRES } from '../constants/GlobalConstants';
import { ReactComponent as DoubleArrowIcon } from '../images/SVG/double_arrow.svg';

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

const HeaderGenres = () => {
  const [visible, setVisible] = useState(false);

  const handleVisibleClick = () => {
    setVisible(!visible);
  };

  const renderGenres = genres => {
    const result = [];
    for (let i = 0; i < genres.length; i++) {
      const genre = genres[i];
      result.push(<CustomLink key={genre.key} {...genre} />);
    }
    return result;
  };

  return (
    <nav className="nav">
      <div className={`nav__menu ${visible ? 'nav__menu--visible' : ''}`}>
        {renderGenres(GENRES)}
        {/* <span onClick={handleVisibleClick} className="nav__toggle-menu">
          <DoubleArrowIcon
            className={`nav__icon ${
              visible ? 'nav__icon--down' : 'nav__icon--up'
            }`}
          />
        </span> */}
      </div>
    </nav>
  );
};

export default withRouter(HeaderGenres);
