import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "XXXXXX",
  appId: "XXXXXX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Services export karo
export const db = getFirestore(app);
export const auth = getAuth(app);
