import React from 'react';
import { GiGamepadCross } from 'react-icons/gi';

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="not-found__404">
        <span>4</span>
        <GiGamepadCross />
        <span>4</span>
      </div>
      <span className="not-found__title">Page not found</span>
    </div>
  );
};

export default NotFound;
