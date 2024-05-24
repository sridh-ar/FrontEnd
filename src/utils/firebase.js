// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDWdpSDUY4xXRXIojYlx4y466i8Z3lypY0",
  authDomain: "kpl-tournament-44a8f.firebaseapp.com",
  projectId: "kpl-tournament-44a8f",
  storageBucket: "kpl-tournament-44a8f.appspot.com",
  messagingSenderId: "165008501889",
  appId: "1:165008501889:web:52d8c53cce6027a3a77180",
  measurementId: "G-NCD672VBJ2"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export { firebaseApp };
