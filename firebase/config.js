import { initializeApp } from 'firebase/app';


const firebaseConfig = {
  apiKey: "AIzaSyD_8KYqb4XCzzxRFbLejvpxkilgqB6GBD4",
  authDomain: "periodico-hoy-clasificados-db.firebaseapp.com",
  databaseURL: "https://periodico-hoy-clasificados-db-default-rtdb.firebaseio.com",
  projectId: "periodico-hoy-clasificados-db",
  storageBucket: "periodico-hoy-clasificados-db.appspot.com",
  messagingSenderId: "440112604201",
  appId: "1:440112604201:web:01eef7c3dca3715e9ba838"
};


export const app = initializeApp(firebaseConfig)
