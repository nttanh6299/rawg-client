import React from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../Loading';

const withAuthenticated = (InnerComponent, redirectTo = '/login') => {
  const Authenticated = ({ currentUser, isAuthenticated, ...props }) => {
    if (!isAuthenticated) {
      return <Loading loading={true} className="u-text-center" />;
    } else if (isAuthenticated && !currentUser) {
      return <Redirect to={redirectTo} />;
    }
    return (
      <InnerComponent
        currentUser={currentUser}
        isAuthenticated={isAuthenticated}
        {...props}
      />
    );
  };

  return Authenticated;
};

export default withAuthenticated;
