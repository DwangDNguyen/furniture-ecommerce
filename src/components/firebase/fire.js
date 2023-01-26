// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyA-W1i-j-aivhFsR5FvfcwdBqGU1rryn_Y',
    authDomain: 'furniture-ecommerce-dbd48.firebaseapp.com',
    projectId: 'furniture-ecommerce-dbd48',
    storageBucket: 'furniture-ecommerce-dbd48.appspot.com',
    messagingSenderId: '72922279219',
    appId: '1:72922279219:web:0694408e45698fc820e246',
    measurementId: 'G-Q30QGXDMDR',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

export { auth };
