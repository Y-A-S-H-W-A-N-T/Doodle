import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCvVLbEP80Vur6VV--uDVL_jOzpHO4LhyQ",
  authDomain: "doodle-ab805.firebaseapp.com",
  projectId: "doodle-ab805",
  storageBucket: "doodle-ab805.appspot.com",
  messagingSenderId: "298372217213",
  appId: "1:298372217213:web:4a3a7832fc1db74e8d7414",
  measurementId: "G-T91WLV6MM2"
};

const app = initializeApp(firebaseConfig)
  
const storage = getStorage(app)
export const db = getFirestore(app)

export { storage, ref, uploadBytesResumable, getDownloadURL }