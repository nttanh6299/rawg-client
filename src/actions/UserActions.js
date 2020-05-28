import firebase from '../firebase';
import { LOGIN_SUCCESS, CLEAR_USER } from '../constants/ActionTypes';

const loginSuccess = user => ({ type: LOGIN_SUCCESS, payload: { user } });

const clearUser = () => ({ type: CLEAR_USER });

export const login = async (email, password) => {
  return firebase.auth.signInWithEmailAndPassword(email, password);
};

export const signUp = async (email, username, password) => {
  const user = await firebase.auth.fetchSignInMethodsForEmail(email);

  if (user && user.length > 0) {
    return 'The email address is already in use by another account.';
  }

  await firebase.auth.createUserWithEmailAndPassword(email, password);
  return firebase.auth.currentUser.updateProfile({
    displayName: username
  });
};

export const logOut = async () => {
  return firebase.auth.signOut();
};

export const authen = () => dispatch => {
  return firebase.auth.onAuthStateChanged(user => {
    if (user) {
      dispatch(loginSuccess(user));
    } else {
      dispatch(clearUser());
    }
  });
};
