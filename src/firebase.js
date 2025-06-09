// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-z-WYj4OfhFUbuZysiVoButuzecTE5yk",
  authDomain: "yt-clone-da3f2.firebaseapp.com",
  projectId: "yt-clone-da3f2",
  storageBucket: "yt-clone-da3f2.appspot.com",
  messagingSenderId: "608216435355",
  appId: "1:608216435355:web:81fc0ed82635fa08ac543e",
  measurementId: "G-N2XCPVY530",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();
const timestamp = serverTimestamp();

export { app, db, auth, timestamp, provider };