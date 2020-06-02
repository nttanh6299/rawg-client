import React from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../Loading';

const withAuthenticated = (InnerComponent, redirectTo = '/login') => {
  const Authenticated = ({ currentUser, loadedAuth, ...props }) => {
    if (!loadedAuth) {
      return <Loading loading={true} className="u-text-center" />;
    } else if (loadedAuth && !currentUser) {
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

  return Authenticated;
};

export default withAuthenticated;
