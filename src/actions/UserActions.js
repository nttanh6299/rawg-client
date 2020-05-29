import firebase from '../firebase';
import {
  LOGIN_SUCCESS,
  CLEAR_USER,
  UPDATE_USER_USERNAME
} from '../constants/ActionTypes';

const loginSuccess = user => ({ type: LOGIN_SUCCESS, payload: { user } });

const clearUser = () => ({ type: CLEAR_USER });

const updateUsername = username => ({
  type: UPDATE_USER_USERNAME,
  payload: { username }
});

export const login = async (email, password) => {
  return firebase.auth.signInWithEmailAndPassword(email, password);
};

export const signUp = (email, username, password) => async dispatch => {
  const user = await firebase.auth.fetchSignInMethodsForEmail(email);

  if (user && user.length > 0) {
    return 'The email address is already in use by another account.';
  }

  const res = await firebase.auth.createUserWithEmailAndPassword(
    email,
    password
  );

  await res.user
    .updateProfile({
      displayName: username
    })
    .then(() => {
      dispatch(updateUsername(res.user.displayName));
    });
};

export const logOut = async () => {
  return firebase.auth.signOut();
};

//observe current user state change
export const authen = () => dispatch => {
  return firebase.auth.onAuthStateChanged(user => {
    if (user) {
      dispatch(loginSuccess(user));
    } else {
      dispatch(clearUser());
    }
  });
};
