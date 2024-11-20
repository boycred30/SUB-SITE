
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC2ewXJsgZj4Vn-OtMK0lO2JUsGOMmocVI",
  authDomain: "sub-web-cd3b7.firebaseapp.com",
  projectId: "sub-web-cd3b7",
  storageBucket: "sub-web-cd3b7.firebasestorage.app",
  messagingSenderId: "38984944170",
  appId: "1:38984944170:web:78021b155efcebbe52d153",
  measurementId: "G-Z2WWCYLMMP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);