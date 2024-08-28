// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhR_-zwOmm3Bk7eYM7K8L-mhY40Mayi54",
  authDomain: "misprojekat-7a001.firebaseapp.com",
  projectId: "misprojekat-7a001",
  storageBucket: "misprojekat-7a001.appspot.com",
  messagingSenderId: "360135381831",
  appId: "1:360135381831:web:b53f1feac79f23447ff262",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Database refrences
export const adCollectionRef = collection(db, "ads");
export const userCollectionRef = collection(db, "users");
