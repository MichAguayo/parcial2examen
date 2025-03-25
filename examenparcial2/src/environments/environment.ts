import { initializeApp } from "firebase/app";

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyCW5p1o7iqECpOenCvHI8uYoXQkX88FZ9Q",
  authDomain: "parcial2-examen.firebaseapp.com",
  projectId: "parcial2-examen",
  storageBucket: "parcial2-examen.firebasestorage.app",
  messagingSenderId: "631633463707",
  appId: "1:631633463707:web:1372c59f6ddf522ea3b93e"
  },

};

const app = initializeApp(environment.firebaseConfig);