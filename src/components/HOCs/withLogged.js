import React from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../Loading';

const withLogged = (InnerComponent, redirectTo = '/') => {
  const Logged = ({ currentUser, isAuthenticated, ...props }) => {
    if (!isAuthenticated) {
      return <Loading loading={true} className="u-text-center" />;
    } else if (isAuthenticated && currentUser) {
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

  return Logged;
};

export default withLogged;
