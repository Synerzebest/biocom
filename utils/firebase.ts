// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBsCUala2lhSuZbxUKlH5aNEm8ZSD2j6PQ",
  authDomain: "localnest-b8aaa.firebaseapp.com",
  projectId: "localnest-b8aaa",
  storageBucket: "localnest-b8aaa.appspot.com",
  messagingSenderId: "316978410051",
  appId: "1:316978410051:web:f62c8e9c931956bb69daf6",
  measurementId: "G-QDRZM1BVTK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage }