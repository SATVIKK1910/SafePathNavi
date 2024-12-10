import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // Import getFirestore function

const firebaseConfig = {
  apiKey: "AIzaSyAIg26Cn4n2QLVsC90UBwJLyT27KcLnTmk",
  authDomain: "safemaps-a3a55.firebaseapp.com",
  projectId: "safemaps-a3a55",
  storageBucket: "safemaps-a3a55.appspot.com",
  messagingSenderId: "651369739698",
  appId: "1:651369739698:web:5f63c2da951ae465c1e0ab",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Auth
const auth = getAuth(app);
const firestore = getFirestore(app); // Correct Firestore initialization

export { auth, firestore }; // Export Firestore and Auth for use in other components
