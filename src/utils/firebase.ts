// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyA3mE3d886UCR207HwzkVloYnvOyzJSEGA',
  authDomain: 'myonlypans.firebaseapp.com',
  projectId: 'myonlypans',
  storageBucket: 'myonlypans.appspot.com',
  messagingSenderId: '954313515532',
  appId: '1:954313515532:web:251326e168e67d9e264429',
  measurementId: 'G-6PGMS5DNMP'
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const analytics = getAnalytics(firebaseApp);
