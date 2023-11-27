// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCiUoigQnJsEY0t25n3qlPG1ylZYbWxuiI',
  authDomain: 'cafe-writer-firebase.firebaseapp.com',
  projectId: 'cafe-writer-firebase',
  storageBucket: 'cafe-writer-firebase.appspot.com',
  messagingSenderId: '199064395887',
  appId: '1:199064395887:web:4a6dde286a5ada1a93ad9a',
  measurementId: 'G-0HT9H6GVS6',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
