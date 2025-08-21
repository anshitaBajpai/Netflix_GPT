import { getAuth } from "firebase/auth";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_6XxavwSR0UP9DAK5If224D0RkJRxQXE",
  authDomain: "netflixgpt-1c13a.firebaseapp.com",
  projectId: "netflixgpt-1c13a",
  storageBucket: "netflixgpt-1c13a.firebasestorage.app",
  messagingSenderId: "50367864066",
  appId: "1:50367864066:web:ea050986dbecd90710361b",
  measurementId: "G-Y7D76GEPCW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

 export const auth = getAuth();