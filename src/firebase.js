import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// const firebaseConfig = {
//   apiKey: 'AIzaSyCiUoigQnJsEY0t25n3qlPG1ylZYbWxuiI',
//   authDomain: 'cafe-writer-firebase.firebaseapp.com',
//   databaseURL: 'https://cafe-writer-firebase-default-rtdb.asia-southeast1.firebasedatabase.app',
//   projectId: 'cafe-writer-firebase',
//   storageBucket: 'cafe-writer-firebase.appspot.com',
//   messagingSenderId: '199064395887',
//   appId: '1:199064395887:web:4a6dde286a5ada1a93ad9a',
//   measurementId: 'G-0HT9H6GVS6',
// };
// const firebaseConfig = {
//   apiKey: 'AIzaSyCiUoigQnJsEY0t25n3qlPG1ylZYbWxuiI',
//   authDomain: 'cafe-writer-firebase.firebaseapp.com',
//   databaseURL: 'https://cafe-writer-firebase-default-rtdb.asia-southeast1.firebasedatabase.app',
//   projectId: 'cafe-writer-firebase',
//   storageBucket: 'cafe-writer-firebase.appspot.com',
//   messagingSenderId: '199064395887',
//   appId: '1:199064395887:web:4a6dde286a5ada1a93ad9a',
//   measurementId: 'G-0HT9H6GVS6',
// };
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDERID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const authService = getAuth();
export const dbService = getFirestore();
export const storageService = getStorage();
