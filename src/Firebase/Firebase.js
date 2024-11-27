
import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

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
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app);

export const provider = new GoogleAuthProvider()
export default app;
