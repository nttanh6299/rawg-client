import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAb531xDPpt8fMbqnrHRTn521bxx7rTezk',
  authDomain: 'rawg-client.firebaseapp.com',
  databaseURL: 'https://rawg-client.firebaseio.com',
  projectId: 'rawg-client',
  storageBucket: 'rawg-client.appspot.com',
  messagingSenderId: '350468735304',
  appId: '1:350468735304:web:d51ff41d2f0d0b5196f37d',
  measurementId: 'G-PGYDM791MF'
};

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.EmailAuthProvider = app.auth.EmailAuthProvider;
    this.auth = app.auth();
    this.db = app.firestore();
    this.storage = app.storage();
  }
}

export default new Firebase();
