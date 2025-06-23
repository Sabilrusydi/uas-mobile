// lib/firebase.js
// Ini adalah konfigurasi untuk Firebase Client SDK (digunakan di browser)

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // Untuk Firebase Authentication (client-side)
import { getFirestore } from 'firebase/firestore'; // Untuk Cloud Firestore (client-side)

// Konfigurasi Firebase dari variabel lingkungan publik
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  // measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID, // Hapus komentar jika pakai Analytics
};

// Inisialisasi Firebase App
// Hindari inisialisasi ulang jika app sudah ada (khususnya di Next.js development mode)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Dapatkan instance layanan Firebase
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
