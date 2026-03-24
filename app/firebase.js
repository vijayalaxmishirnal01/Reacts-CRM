// Import Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVTcUsIUap1_TGNJON0wjJ4ARIjf0GQww",
  authDomain: "employment-form-f5105.firebaseapp.com",
  projectId: "employment-form-f5105",
  storageBucket: "employment-form-f5105.firebasestorage.app",
  messagingSenderId: "376461324487",
  appId: "1:376461324487:web:fdfe9fa6c963ebd97f8ee2",
  measurementId: "G-LQCY71X6TT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Initialize Firestore
const db = getFirestore(app);

// Export db
export { db };