import React, { Suspense } from 'react';
import { Header, HeaderGenres } from '../components';

const PublicLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="main">
        <HeaderGenres />
        <Suspense fallback={<div></div>}>{children}</Suspense>
      </div>
    </div>
  );
};

export { PublicLayout };
