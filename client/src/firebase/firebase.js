// I
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA0t6ksDZQYbBMo6w2gyD-i0qhLbInEgfQ",
  authDomain: "devopss-61796.firebaseapp.com",
  projectId: "devopss-61796",
  storageBucket: "devopss-61796.appspot.com",
  messagingSenderId: "523939005056",
  appId: "1:523939005056:web:bf2fdd8c7c114fa0df5c65"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const stor = getStorage(app);