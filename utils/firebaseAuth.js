// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from "firebase/auth"
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "thinkcivil-299fc.firebaseapp.com",
  projectId: "thinkcivil-299fc",
  storageBucket: "thinkcivil-299fc.firebasestorage.app",
  messagingSenderId: "578311966925",
  appId: "1:578311966925:web:6de89aa2b14bc8dc299984",
  measurementId: "G-6XN4WENG4L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth,provider}