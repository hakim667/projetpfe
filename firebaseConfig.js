import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCkJlEjYl2Y5z3wQwGNHssMZYM_dee-pxY",
  authDomain: "veredictum-cc533.firebaseapp.com",
  projectId: "veredictum-cc533",
  storageBucket: "veredictum-cc533.appspot.com",
  messagingSenderId: "243755166594",
  appId: "1:243755166594:web:0b900de1202ff76c1f3d9b",
  measurementId: "G-Y1YJB875VT"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }