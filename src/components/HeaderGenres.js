import React, { useState } from 'react';
import CustomLink from './CustomLink';
import { GENRES } from '../constants/GlobalConstants';
import { ReactComponent as DoubleArrowIcon } from '../images/SVG/double_arrow.svg';

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

export default HeaderGenres;
