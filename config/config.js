import firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9Bv4sto9eJf1WrMaYOd9fyk1m_ECvJgw",
  authDomain: "myfirstproject-5eb23.firebaseapp.com",
  databaseURL: "https://myfirstproject-5eb23.firebaseio.com",
  projectId: "myfirstproject-5eb23",
  storageBucket: "myfirstproject-5eb23.appspot.com",
  messagingSenderId: "390726427647",
  appId: "1:390726427647:web:bab6518d3fd46b7c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const f = firebase;
export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();
