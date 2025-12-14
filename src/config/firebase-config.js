
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyCLU4eeZmhGtN_XMgQKOxgOZQKVay0yJpQ",
    authDomain: "agora-test-45137.firebaseapp.com",
    projectId: "agora-test-45137",
    storageBucket: "agora-test-45137.firebasestorage.app",
    messagingSenderId: "312081430554",
    appId: "1:312081430554:web:297ba9cab6d0e8f427b9a3"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
