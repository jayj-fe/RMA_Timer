import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {initializeFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA95H34TfqM-7L4CoSGoaHdnC6kBLhK8Xw",
  authDomain: "rma-timer.firebaseapp.com",
  projectId: "rma-timer",
  storageBucket: "rma-timer.appspot.com",
  messagingSenderId: "36890760256",
  appId: "1:36890760256:web:0a40a126cfd8ff3255fba5",
  measurementId: "G-T89GEDG664"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export {auth, db};