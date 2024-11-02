// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";

// https://firebase.google.com/docs/web/setup#available-libraries
const firebaseConfig = {
    apiKey: "AIzaSyDh2ZFHNwSckQhbHAMVdRcao8LEtSo2oXs",
    authDomain: "rantspace-cf797.firebaseapp.com",
    projectId: "rantspace-cf797",
    storageBucket: "rantspace-cf797.firebasestorage.app",
    messagingSenderId: "330037456315",
    appId: "1:330037456315:web:1fd12d277e978a8216689e",
    measurementId: "G-WKN9F1SNC1"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); 

// Function to sign in anonymously
export const anonymousSignIn = () => {
  return signInAnonymously(auth)
    .then((userCredential) => {
      console.log("Signed in anonymously:", userCredential.user);
      return userCredential.user;
    })
    .catch((error) => {
      console.error("Error signing in anonymously:", error);
    });
};

export { db, auth };