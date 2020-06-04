import firebase from '../firebase';
import {
  LOGIN_SUCCESS,
  CLEAR_USER,
  UPDATE_USER_USERNAME,
  FETCH_USER_LIKES_SUCCESS,
  TOGGLE_LIKE,
  FETCH_VISITED_USER_SUCCESS,
  FETCH_VISITED_USER_REQUEST,
  UPDATE_USER_PROFILE_SUCCESS
} from '../constants/ActionTypes';

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

const fetchVisitedUserRequest = () => ({ type: FETCH_VISITED_USER_REQUEST });

const fetchVisitedUserSuccess = user => ({
  type: FETCH_VISITED_USER_SUCCESS,
  payload: { user }
});

const updateUserProfileSuccess = props => ({
  type: UPDATE_USER_PROFILE_SUCCESS,
  payload: { props }
});

export const login = async (email, password) => {
  return firebase.auth.signInWithEmailAndPassword(email, password);
};

export const signUp = (email, username, password) => async dispatch => {
  //email existed
  const emailExisted = await firebase.auth.fetchSignInMethodsForEmail(email);
  if (emailExisted && emailExisted.length > 0) {
    return 'email-The email address is already in use by another account.';
  }

  //username existed
  const usernameExisted = await firebase.db
    .collection('users')
    .doc(username)
    .get();
  if (usernameExisted.data()) {
    return 'username-The username is already in use by another account.';
  }

  //create user
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
      firebase.db
        .collection('users')
        .doc(res.user.displayName)
        .set({
          uid: res.user.uid,
          displayName: res.user.displayName,
          photoURL: null
        })
        .catch(console.error);
    });
};

export const logOut = async () => {
  return firebase.auth.signOut();
};

//observe current user state change
export const authen = () => dispatch => {
  return firebase.auth.onAuthStateChanged(user => {
    if (user) {
      const fetchedUser = {
        uid: user.uid,
        photoURL: user.photoURL,
        displayName: user.displayName
      };
      dispatch(loginSuccess(fetchedUser));
      fetchUserLikes(fetchedUser.uid)
        .then(res => dispatch(fetchUserLikesSuccess(res.data())))
        .catch(console.error);
    } else {
      dispatch(clearUser());
    }
  });
};

export const fetchUserLikes = uid => {
  return firebase.db.collection('likes').doc(uid).get();
};

export const toggleLike = (id, game, callback) => async dispatch => {
  const { currentUser } = firebase.auth;

  if (currentUser) {
    const { uid } = currentUser;
    const docRef = firebase.db.collection('likes').doc(uid);

    docRef
      .set({ [id]: game }, { merge: true })
      .then(() => {
        dispatch(userToggleLike(id, game));
      })
      .catch(console.error)
      .finally(() => {
        callback(false);
      });
  }
};

export const fetchUser = username => async dispatch => {
  try {
    dispatch(fetchVisitedUserRequest());
    const fetchedUser = await firebase.db
      .collection('users')
      .doc(username)
      .get();
    dispatch(fetchVisitedUserSuccess(fetchedUser.data()));
  } catch (err) {
    console.error(err);
  }
};

export const updateUser = user => async dispatch => {
  const { currentUser } = firebase.auth;

  if (!currentUser) {
    return;
  }

  const storageRef = firebase.storage.ref();
  const { photo, username } = user;
  const { uid, displayName } = currentUser;
  let propsShouldUpdate = { displayName: username };

  try {
    //username existed
    if (displayName !== username) {
      const usernameExisted = await firebase.db
        .collection('users')
        .doc(username)
        .get();
      if (usernameExisted.data()) {
        return 'username-The username is already in use by another account.';
      }
    }

    if (photo) {
      //upload image to storage
      await storageRef.child(uid).put(photo);
      //get image url
      const url = await storageRef.child(uid).getDownloadURL();

      propsShouldUpdate = { ...propsShouldUpdate, photoURL: url };
    }

    //update auth profile
    currentUser.updateProfile({
      ...propsShouldUpdate
    });

    const collectRef = firebase.db.collection('users').doc(displayName);
    if (displayName === username) {
      //update only
      collectRef.update({
        ...propsShouldUpdate
      });
    } else {
      //delete current user and add new user with new key
      const previousUser = await collectRef.get();

      collectRef.delete();

      firebase.db
        .collection('users')
        .doc(username)
        .set({
          ...previousUser.data(),
          ...propsShouldUpdate
        });
    }

    //update reducer
    dispatch(updateUserProfileSuccess(propsShouldUpdate));
  } catch (err) {
    throw err;
  }
};

export const changePassword = (oldPassword, newPassword) => async () => {
  const { currentUser } = firebase.auth;
  if (!currentUser) {
    return;
  }

  try {
    const { email } = currentUser;
    const credential = firebase.EmailAuthProvider.credential(
      email,
      oldPassword
    );
    const res = await currentUser.reauthenticateWithCredential(credential);

    if (res) {
      await currentUser.updatePassword(newPassword);
    }
  } catch (err) {
    if (err.code === 'auth/wrong-password') {
      return 'oldPassword-Wrong password';
    }
    return 'error-Something went wrong';
  }
};
