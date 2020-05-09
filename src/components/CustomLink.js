import React from 'react';
import { Route } from 'react-router-dom';
import { history, preventClick } from '../utils/helpers';

const CustomLink = ({ to, label, exact = true }) => {
  const handleChangeRoute = to => () => {
    history.push('/games/' + to);
  };

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
        return (
          <span
            onClick={!isMatched ? handleChangeRoute(to) : preventClick}
            className={`nav__link ${isMatched ? 'nav__link--active' : ''}`}
          >
            {label}
          </span>
        );
      }}
    />
  );
};

export default React.memo(CustomLink);
