// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdfKZ__E5mdPlrd-Gf98YWvgFpyehHlvQ",
  authDomain: "rs-bricks-admin.firebaseapp.com",
  projectId: "rs-bricks-admin",
  storageBucket: "rs-bricks-admin.firebasestorage.app",
  messagingSenderId: "842597516590",
  appId: "1:842597516590:web:0dd8e3a375088d53e426bf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);