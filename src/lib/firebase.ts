// Firebase is disabled in favor of Manual Authentication (LocalStorage)
// to prevent "client is offline" errors during the development session.

/*
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCCY49PPM1AM33HcPYPAa19OuY3q2q0k9c",
    authDomain: "oddo-f5a27.firebaseapp.com",
    projectId: "oddo-f5a27",
    storageBucket: "oddo-f5a27.firebasestorage.app",
    messagingSenderId: "286400679674",
    appId: "1:286400679674:web:c1905352b9cc1401248343",
    measurementId: "G-XYW0Z6KBFV"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
*/

// Exporting null/dummies to avoid breaking imports, though service files should be updated
export const auth = null as any;
export const db = null as any;

export default {};
