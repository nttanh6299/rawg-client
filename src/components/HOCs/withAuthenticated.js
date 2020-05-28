import React from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../Loading';

const withAuthenticated = InnerComponent => {
  const Authenticated = ({ currentUser, isAuthenticated, ...props }) => {
    if (!isAuthenticated) {
      return <Loading loading={true} className="u-text-center" />;
    } else if (isAuthenticated && currentUser) {
      return <Redirect to="/" />;
    }
    return <InnerComponent {...props} />;
  };

  return Authenticated;
};

export default withAuthenticated;
