import { createSelector } from 'reselect';
import { getUser, getUsername } from './CommonSelectors';

export const isCurrentUser = createSelector(
  getUser,
  getUsername,
  (user, username) => {
    if (!user.currentUser) {
      return false;
    }

    return user.currentUser.displayName === username;
  }
);
