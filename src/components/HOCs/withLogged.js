import React from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../Loading';

const withLogged = (InnerComponent, redirectTo = '/') => {
  const Logged = ({ currentUser, loadedAuth, ...props }) => {
    if (!loadedAuth) {
      return <Loading loading={true} className="u-text-center" />;
    } else if (loadedAuth && currentUser) {
      return <Redirect to={redirectTo} />;
    }
    return (
      <InnerComponent
        currentUser={currentUser}
        loadedAuth={loadedAuth}
        {...props}
      />
    );
  };

  return Logged;
};

export default withLogged;
