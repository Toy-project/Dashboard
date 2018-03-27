import { firebaseKey } from '../../config/firebase';

export const environment = {
  production: true,
  firebase: {
    apiKey: firebaseKey.apiKey,
    authDomain: firebaseKey.authDomain,
    databaseURL: firebaseKey.databaseURL,
    projectId: firebaseKey.projectId,
    storageBucket: firebaseKey.storageBucket,
    messagingSenderId: firebaseKey.messagingSenderId
  }
};
