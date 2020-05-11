import React, { Suspense } from 'react';
import { Header, Loading } from '../components';

const PublicLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="main">
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
