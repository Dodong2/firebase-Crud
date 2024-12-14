// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyB_Uh27A3NvdwTD7qVrDwnPjwQfI-WSIsM",
  authDomain: "first-crud-b7b00.firebaseapp.com",
  projectId: "first-crud-b7b00",
  storageBucket: "first-crud-b7b00.firebasestorage.app",
  messagingSenderId: "3173791045",
  appId: "1:3173791045:web:81b12e41b210e361d8fa2c",
  measurementId: "G-9SX6HN5G46"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)