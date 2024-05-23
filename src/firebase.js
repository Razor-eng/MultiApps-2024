import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC5DZEFcH7b9AT8ET0OlOsUvXX3iWPDhtA",
    authDomain: "multiprod-r.firebaseapp.com",
    projectId: "multiprod-r",
    storageBucket: "multiprod-r.appspot.com",
    messagingSenderId: "638114182387",
    appId: "1:638114182387:web:090118f3495719e4dff386"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };