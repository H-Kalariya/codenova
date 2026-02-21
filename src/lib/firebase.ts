import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";

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

// Enable offline persistence
enableIndexedDbPersistence(db).catch((err) => {
    if (err.code === 'failed-precondition') {
        console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
    } else if (err.code === 'unimplemented') {
        console.warn('The current browser does not support persistence.');
    } else {
        console.error('Persistence error:', err);
    }
});

// Test connectivity
import { getDoc, doc } from "firebase/firestore";
setTimeout(async () => {
    try {
        await getDoc(doc(db, "users", "test"));
        console.log("Firebase connectivity test: OK");
    } catch (error) {
        console.error("Firebase connectivity test failed:", error);
    }
}, 1000);

export default app;
