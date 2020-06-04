import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import withAuthenticated from './HOCs/withAuthenticated';
import SettingsProfileTab from './SettingsProfileTab';
import SettingsPasswordTab from './SettingsPasswordTab';
import { SETTINGS_TABS } from '../constants/GlobalConstants';

const propTypes = {
  currentUser: PropTypes.object
};

const defaultProps = {};

const UserSettings = ({ currentUser, updateUser, changePassword }) => {
  const [currentTab, setCurrentTab] = useState('');

  const renderTab = useMemo(() => {
    switch (currentTab) {
      case '':
        return (
          <SettingsProfileTab
            currentUser={currentUser}
            updateUser={updateUser}
          />
        );
      case 'change-password':
        return <SettingsPasswordTab changePassword={changePassword} />;
      default:
        return null;
    }
  }, [currentTab, currentUser, updateUser, changePassword]);

  const handleChangeTab = tab => () => {
    setCurrentTab(tab);
  };

  return (
    <div className="settings">
      <div className="settings__tabs">
        {SETTINGS_TABS.map(({ key, label }) => (
          <span
            onClick={handleChangeTab(key)}
            className={`settings__tab ${
              currentTab === key ? 'settings__tab--active' : ''
            }`}
            key={key}
          >
            {label}
          </span>
        ))}
      </div>
      <div className="settings__content">{renderTab}</div>
    </div>
  );
};

UserSettings.propTypes = propTypes;
UserSettings.defaultProps = defaultProps;

export default withAuthenticated(UserSettings);
