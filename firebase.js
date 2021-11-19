import { initializeApp } from "firebase/app";
import { collection, addDoc, doc, onSnapshot } from "firebase/firestore"
import { getFirestore } from "firebase/firestore"


const firebaseApp = initializeApp({
    apiKey: "AIzaSyBVQIkCx1INWwN0UPPfhU08UwFIi-_xcdY",
    authDomain: "connectapp-15efd.firebaseapp.com",
    projectId: "connectapp-15efd",
});

const db = getFirestore();
export { db, doc, onSnapshot }