import firebase from '../firebase';
import {
  LOGIN_SUCCESS,
  CLEAR_USER,
  UPDATE_USER_USERNAME,
  FETCH_USER_LIKES_SUCCESS,
  TOGGLE_LIKE
} from '../constants/ActionTypes';
import { getUser } from '../selectors/CommonSelectors';

const loginSuccess = user => ({ type: LOGIN_SUCCESS, payload: { user } });

const clearUser = () => ({ type: CLEAR_USER });

const updateUsername = username => ({
  type: UPDATE_USER_USERNAME,
  payload: { username }
});

const fetchUserLikesSuccess = likes => ({
  type: FETCH_USER_LIKES_SUCCESS,
  payload: { likes }
});

const userToggleLike = (id, liked) => ({
  type: TOGGLE_LIKE,
  payload: { id, liked }
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
      fetchUserLikes(user.email)
        .then(res => dispatch(fetchUserLikesSuccess(res.data())))
        .catch(console.error);
    } else {
      dispatch(clearUser());
    }
  });
};

export const fetchUserLikes = email => {
  return firebase.db.collection('likes').doc(email).get();
};

export const toggleLike = (id, game) => (dispatch, getState) => {
  const state = getState();
  const user = getUser(state);
  const { uid } = user.currentUser;
  const docRef = firebase.db.collection('likes').doc(uid);

  docRef
    .set({ [id]: game }, { merge: true })
    .then(() => dispatch(userToggleLike(id, game)))
    .catch(console.error);
};
