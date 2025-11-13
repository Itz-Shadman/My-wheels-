// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth,GoogleAuthProvider } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKAv-xquPgLzbprx06WRirCf2MItmXQDM",
  authDomain: "mywheels-3b5cb.firebaseapp.com",
  projectId: "mywheels-3b5cb",
  storageBucket: "mywheels-3b5cb.firebasestorage.app",
  messagingSenderId: "292901501963",
  appId: "1:292901501963:web:69b94ec68348bbf496db0e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();