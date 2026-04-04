import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAIMxcGNs_aQU4qHAHnWTilleKqIeHCme0",
  authDomain: "expense--tracker-8c99a.firebaseapp.com",
  projectId: "expense--tracker-8c99a",
  storageBucket: "expense--tracker-8c99a.firebasestorage.app",
  messagingSenderId: "376432125085",
  appId: "1:376432125085:web:3b7f752855af6ea77a6074"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();