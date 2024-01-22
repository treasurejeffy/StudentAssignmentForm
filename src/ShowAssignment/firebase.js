// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getfirestore} from './firebase/firestore'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHe3sOpcYSSArpX0AoTtU7jfc0zelSc40",
  authDomain: "testing-873ca.firebaseapp.com",
  projectId: "testing-873ca",
  storageBucket: "testing-873ca.appspot.com",
  messagingSenderId: "244639013639",
  appId: "1:244639013639:web:4246873d815edeab10c3a2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default getfirestore()