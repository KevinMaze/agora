// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyAHHn7zMO5yCUt5OU-w-XAxTYUK_9ELR3k",
  authDomain: "agora-81452.firebaseapp.com",
  projectId: "agora-81452",
  storageBucket: "agora-81452.firebasestorage.app",
  messagingSenderId: "395507905249",
  appId: "1:395507905249:web:22375827961f2a271bfda0",
  measurementId: "G-3BZNDK5KMD"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);