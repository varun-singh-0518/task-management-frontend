import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCaNSabyx-Tmtf3mXkrFV5a4sUt35AsGUk",
  authDomain: "task-management-54496.firebaseapp.com",
  projectId: "task-management-54496",
  storageBucket: "task-management-54496.appspot.com",
  messagingSenderId: "401418857470",
  appId: "1:401418857470:web:150d4e62caf93c09af2eaf",
};

const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);
