import React, { Suspense } from 'react';
import { Loading } from '../components';

const PublicLayout = ({ children }) => {
  return (
    <div className="main">
      <Suspense fallback={<Loading loading={true} className="u-text-center" />}>
        {children}
      </Suspense>
    </div>
  );
};

export { PublicLayout };
