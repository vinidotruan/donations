import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import firebase from "firebase";
import store from "./store";

var firebaseConfig = {
  apiKey: "AIzaSyAkewZOdUa47WoH-6ROZtjoEq3tc4e9BcU",
  authDomain: "donations-62786.firebaseapp.com",
  projectId: "donations-62786",
  storageBucket: "donations-62786.appspot.com",
  messagingSenderId: "145332283798",
  appId: "1:145332283798:web:f1eca6c2107994581c15b7",
  measurementId: "G-Q2C50KJJJG",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.firestore();
export const storageRef = firebase.storage().ref();
export const imagesRef = storageRef.child("images");
firebase.analytics();

const app = createApp(App);
app.use(store);
app.use(router);
app.mount("#app");
