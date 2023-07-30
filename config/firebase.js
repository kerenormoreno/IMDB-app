// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import Constants from "expo-constants";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: Constants.manifest.extra.API_KEY,
  authDomain: Constants.manifest.extra.AUTH_DOMAIN,
  projectId: Constants.manifest.extra.PROJECT_ID,
  storageBucket: Constants.manifest.extra.STORAGE_BUCKET,
  messagingSenderId: Constants.manifest.extra.MESSAGING_SENDER_ID,
  appId: Constants.manifest.extra.APP_ID,
  measurementId: Constants.manifest.extra.MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const auth = getAuth(app);
