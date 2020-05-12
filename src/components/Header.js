import React from 'react';
import PropTypes from 'prop-types';
import { history } from '../utils/helpers';
import { ReactComponent as SearchIcon } from '../images/SVG/search.svg';

const propTypes = {
  changeRoute: PropTypes.func.isRequired
};

const defaultProps = {};

const Header = ({ changeRoute }) => {
  const handleClick = () => {
    changeRoute({ path: '/', keys: {}, options: {} });
    history.push('/');
  };

  return (
    <header className="header">
      <h1 className="header__logo" onClick={handleClick}>
        RAWGC
      </h1>
      <form className="search-bar">
        <button className="search-bar__button">
          <SearchIcon className="search-bar__icon" />
        </button>
        <input
          type="text"
          className="search-bar__input"
          placeholder="Search for name"
        />
      </form>
      <button className="header__login">Login</button>
    </header>
  );
};

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default React.memo(Header);
