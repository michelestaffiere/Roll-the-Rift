// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_Eftf2raz6Yc5V_IexfNNGGBI_r1RJWY",
  authDomain: "roll-the-rift.firebaseapp.com",
  projectId: "roll-the-rift",
  storageBucket: "roll-the-rift.appspot.com",
  messagingSenderId: "309609947927",
  appId: "1:309609947927:web:5b8737600376c175334d52"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default getFirestore();