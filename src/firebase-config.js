// src/firebase-config.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD8Wgp5Nr6PRPijbsUGSZLL0aF4b_Tboiw",
    authDomain: "as02desweb.firebaseapp.com",
    projectId: "as02desweb",
    storageBucket: "as02desweb.firebasestorage.app",
    messagingSenderId: "247552401008",
    appId: "1:247552401008:web:93104748142e24975cdeb5",
    measurementId: "G-B40CT72VE8"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);