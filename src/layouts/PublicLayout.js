import React, { Suspense } from 'react';
import { Header, HeaderGenres, Loading } from '../components';

const PublicLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="main">
        <HeaderGenres />
        <Suspense
          fallback={<Loading loading={true} className="u-text-center" />}
        >
          {children}
        </Suspense>
      </div>
    </div>
  );
};

export { PublicLayout };
