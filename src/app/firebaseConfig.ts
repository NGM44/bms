// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCX8N-GnMPeLj6VIsytFH03Mv59O430KxE",
  authDomain: "airscale-one.firebaseapp.com",
  databaseURL:
    "https://airscale-one-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "airscale-one",
  storageBucket: "airscale-one.appspot.com",
  messagingSenderId: "437813688691",
  appId: "1:437813688691:web:f974103607193cf422ed06",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase();

export { database };
