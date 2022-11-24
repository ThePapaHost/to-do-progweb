import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBi8QdhzGAJah6Kj73_wajbVZ9OXFv2cv0",
   authDomain: "todo-4d571.firebaseapp.com",
   databaseURL: "https://todo-4d571-default-rtdb.firebaseio.com",
   projectId: "todo-4d571",
   storageBucket: "todo-4d571.appspot.com",
   messagingSenderId: "765054005837",
   appId: "1:765054005837:web:9949503c4585f7c9f96204"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();