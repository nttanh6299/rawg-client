import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { USER_TABS } from '../constants/GlobalConstants';
import Loading from './Loading';
import CustomLink from './CustomLink';
import UserLikesTab from './UserLikesTab';

const propTypes = {
  loadingUserProfile: PropTypes.bool.isRequired,
  visitedUserProfile: PropTypes.object,
  username: PropTypes.string,
  isCurrentUser: PropTypes.bool.isRequired,
  fetchUser: PropTypes.func.isRequired,
  changeRoute: PropTypes.func.isRequired,
  playFullVideo: PropTypes.func.isRequired,
  windowSize: PropTypes.number.isRequired,
  toggleLike: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  fetchUserLikes: PropTypes.func.isRequired,
  likes: PropTypes.object
};

const defaultProps = {};

const User = ({
  loadingUserProfile,
  visitedUserProfile,
  username,
  fetchUser,
  isCurrentUser,
  changeRoute,
  playFullVideo,
  windowSize,
  toggleLike,
  isAuthenticated,
  fetchUserLikes,
  likes
}) => {
  const [currentTab, setCurrentTab] = useState('');
  const { uid, displayName, photoURL } = visitedUserProfile || {};

  useEffect(() => {
    setCurrentTab('');
    if (username) {
      fetchUser(username);
    }
  }, [fetchUser, username]);

  const renderTab = useMemo(() => {
    switch (currentTab) {
      case 'likes':
        return (
          <UserLikesTab
            uid={uid}
            fetchUserLikes={fetchUserLikes}
            changeRoute={changeRoute}
            playFullVideo={playFullVideo}
            windowSize={windowSize}
            toggleLike={toggleLike}
            isAuthenticated={isAuthenticated}
            likes={likes}
          />
        );
      default:
        return null;
    }
  }, [
    currentTab,
    uid,
    fetchUserLikes,
    changeRoute,
    playFullVideo,
    windowSize,
    toggleLike,
    isAuthenticated,
    likes
  ]);

  const handleChangeTab = tab => () => {
    setCurrentTab(tab);
  };

  if (loadingUserProfile) {
    return <Loading loading={true} className="u-text-center" />;
  } else if (!loadingUserProfile && !visitedUserProfile) {
    return (
      <div style={{ fontSize: '4rem' }} className="u-text-center">
        User is not found
      </div>
    );
  }

  return (
    <div className="user">
      <div className="user__top">
        <div className="user__info">
          <span className="user__username">{displayName}</span>
          <div
            className="user__photo"
            style={{ backgroundImage: `url(${photoURL})` }}
          >
            {!photoURL && displayName[0].toUpperCase()}
          </div>
        </div>
        {isCurrentUser && (
          <CustomLink
            path={'/settings'}
            changeRoute={changeRoute}
            className="btn u-uppercase user__settings"
          >
            Settings
          </CustomLink>
        )}
      </div>
      <div className="user__middle">
        <div className="user__tabs">
          {USER_TABS.map(({ key, label }) => (
            <span
              onClick={handleChangeTab(key)}
              className={`user__tab ${
                currentTab === key ? 'user__tab--active' : ''
              }`}
              key={key}
            >
              {label}
            </span>
          ))}
        </div>
      </div>
      <div className="user__bottom">{renderTab}</div>
    </div>
  );
};

User.propTypes = propTypes;
User.defaultProps = defaultProps;

export default User;
