// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

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
const db = getFirestore(app);

export { database, app, auth, db };
