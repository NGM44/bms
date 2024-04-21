// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCX8N-GnMPeLj6VIsytFH03Mv59O430KxE",
//   authDomain: "airscale-one.firebaseapp.com",
//   databaseURL:
//     "https://airscale-one-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "airscale-one",
//   storageBucket: "airscale-one.appspot.com",
//   messagingSenderId: "437813688691",
//   appId: "1:437813688691:web:f974103607193cf422ed06",
// };
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClqJDYDRgga-Tw2z3dg1rly5LCGgFGg8w",
  authDomain: "brillio-sensegate.firebaseapp.com",
  projectId: "brillio-sensegate",
  storageBucket: "brillio-sensegate.appspot.com",
  messagingSenderId: "801457004714",
  appId: "1:801457004714:web:17c8c3f25b76c97a6970d3",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const database = getDatabase();
const auth = getAuth(app);

export { database, app, auth };
