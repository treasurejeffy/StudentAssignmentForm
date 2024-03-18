// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBvieL_BUPeF8N2BBLgR3joTZS_AZd2h2c",
  authDomain: "rad5-student-assessment-submit.firebaseapp.com",
  projectId: "rad5-student-assessment-submit",
  storageBucket: "rad5-student-assessment-submit.appspot.com",
  messagingSenderId: "857255408126",
  appId: "1:857255408126:web:7c42b79c89da21ca3110af",
  measurementId: "G-JCM0GLEP25"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)