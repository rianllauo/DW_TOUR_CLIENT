// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC9fnIpd1rxOfytwR1hg5Jq28UFQjoDcnM",
    authDomain: "dewe-8ea26.firebaseapp.com",
    projectId: "dewe-8ea26",
    storageBucket: "dewe-8ea26.appspot.com",
    messagingSenderId: "778515939323",
    appId: "1:778515939323:web:eaff1e1f3dd3e5a6cf955e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
