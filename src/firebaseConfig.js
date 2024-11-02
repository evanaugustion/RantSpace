// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA6D1ifKVPM4BilT6Y3JW8dWuHsYYMXqTw",
  authDomain: "rantspace-36fba.firebaseapp.com",
  projectId: "rantspace-36fba",
  storageBucket: "rantspace-36fba.firebasestorage.app",
  messagingSenderId: "1031497839690",
  appId: "1:1031497839690:web:dc25efc52cfd56d34662b3"
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