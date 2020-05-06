import React from 'react';
import { ReactComponent as SearchIcon } from '../images/SVG/search.svg';

const Header = () => {
  return (
    <header className="header">
      <h1 className="logo">RAWGC</h1>
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
