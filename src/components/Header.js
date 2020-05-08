import React from 'react';
import { history } from '../utils/helpers';
import { ReactComponent as SearchIcon } from '../images/SVG/search.svg';

const Header = () => {
  const handleClick = () => {
    history.push('/');
  };

  return (
    <header className="header">
      <h1 className="logo" onClick={handleClick}>
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
      <button className="login">Login</button>
    </header>
  );
};

export default Header;
