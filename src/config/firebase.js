// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfQSI1OQm2aNUh3K_WEs7n8jbqE8e9Uyw",
  authDomain: "svasth360-de739.firebaseapp.com",
  projectId: "svasth360-de739",
  storageBucket: "svasth360-de739.appspot.com",
  messagingSenderId: "119073131266",
  appId: "1:119073131266:web:d56257d7defe829034101b",
  measurementId: "G-M2V08FB1QV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;