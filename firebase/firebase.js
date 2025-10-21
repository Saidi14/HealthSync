import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB6gQZNzG0EtAdiZ8R01RbS7-0FYzW8XUs",
  authDomain: "healthsyncdb.firebaseapp.com",
  databaseURL: "https://healthsyncdb-default-rtdb.firebaseio.com",
  projectId: "healthsyncdb",
  storageBucket: "healthsyncdb.firebasestorage.app",
  messagingSenderId: "261715395441",
  appId: "1:261715395441:web:6d692a63a5ffa75bba6cd0",
  measurementId: "G-XD500SFH8T"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

console.log("✅ Firebase connected successfully!");
