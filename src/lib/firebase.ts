
import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';
// Add other Firebase services as needed, e.g., getAuth, getStorage

// Your web app's Firebase configuration
// IMPORTANT: Replace with your actual Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyM8sgK9ZUp1ppcS1FgHRCCV1h6Xxjirc",
  authDomain: "eventlink-a88a5.firebaseapp.com",
  projectId: "eventlink-a88a5",
  storageBucket: "eventlink-a88a5.firebasestorage.app",
  messagingSenderId: "311215698184",
  appId: "1:311215698184:web:81192f50fd05aff6d43cbd"
};

// Initialize Firebase
let app: FirebaseApp;
let db: Firestore;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

db = getFirestore(app);

export { app, db };
