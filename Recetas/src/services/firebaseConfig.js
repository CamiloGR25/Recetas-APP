// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAAkiwgp12y5oxts51LAM4zS5ZbjyBgv0Y",
    authDomain: "recetas-app-4c8c8.firebaseapp.com",
    projectId: "recetas-app-4c8c8",
    storageBucket: "recetas-app-4c8c8.firebasestorage.app",
    messagingSenderId: "977892014955",
    appId: "1:977892014955:web:3acaad15545d226411aa2e",
    measurementId: "G-G754J9BL83"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
// Obtiene y exporta la instancia de auth
const auth = getAuth(app);

export { db, auth };