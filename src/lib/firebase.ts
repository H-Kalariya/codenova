import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ⚠️ Replace these values with your Firebase project config
// Firebase Console → Project Settings → General → Your apps → SDK setup and config
const firebaseConfig = {
    apiKey: "AIzaSyDG4A4kVFTkZkVAEFbGcKAofrdVtybd3Yo",
    authDomain: "oddo-3ba76.firebaseapp.com",
    projectId: "oddo-3ba76",
    storageBucket: "oddo-3ba76.firebasestorage.app",
    messagingSenderId: "368455970394",
    appId: "1:368455970394:web:b6a0a56cc09628ac863263",
    measurementId: "G-176TMR55DV"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
