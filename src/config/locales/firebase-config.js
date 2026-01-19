// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
export const analytics = getAnalytics(app);