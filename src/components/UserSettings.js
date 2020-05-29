import React from 'react';
import withAuthenticated from './HOCs/withAuthenticated';

const UserSettings = () => {
  return <div className="settings">User settings</div>;
};

export default withAuthenticated(UserSettings);
