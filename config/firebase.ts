// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth, GoogleAuthProvider} from 'firebase/auth';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAa4u06f6UzvIrnSgcAy7FlFTpQrUoABEU",
  authDomain: "whatsapp-clone-49dbb.firebaseapp.com",
  projectId: "whatsapp-clone-49dbb",
  storageBucket: "whatsapp-clone-49dbb.appspot.com",
  messagingSenderId: "323687596563",
  appId: "1:323687596563:web:9b0112c67f42adc8be35e6"
};

// Initialize Firebase
const app = getApps().length ? getApp(): initializeApp(firebaseConfig)

const db = getFirestore(app)

const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export {db, auth, provider}
