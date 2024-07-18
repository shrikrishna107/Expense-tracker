// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGPYyhUXBmQrLaY3hz44D7FqtY5dFQxCo",
  authDomain: "expense-manage-cfaa8.firebaseapp.com",
  projectId: "expense-manage-cfaa8",
  storageBucket: "expense-manage-cfaa8.appspot.com",
  messagingSenderId: "169849321101",
  appId: "1:169849321101:web:3b012898598b1b7d7954c4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);