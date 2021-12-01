import { initializeApp } from "firebase/app"
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

// Get the Firebase config from the auto generated file.
const firebaseConfig = require('./utasks-configuration.json').result.sdkConfig;

// Instantiate a Firebase app.
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);