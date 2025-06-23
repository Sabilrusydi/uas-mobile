// lib/firebase-admin.js
// Ini adalah konfigurasi untuk Firebase Admin SDK (digunakan di server, yaitu di API Routes)

import * as admin from 'firebase-admin';

// Dapatkan string JSON kredensial dari variabel lingkungan
const serviceAccountString = process.env.FIREBASE_ADMIN_SDK_CONFIG;

if (!serviceAccountString) {
  throw new Error('Please define the FIREBASE_ADMIN_SDK_CONFIG environment variable inside .env.local');
}

let adminApp;

if (admin.apps.length === 0) {
  // Parse string JSON menjadi objek
  const serviceAccount = JSON.parse(serviceAccountString);

  adminApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} else {
  adminApp = admin.app(); // Gunakan app yang sudah diinisialisasi
}

const adminAuth = adminApp.auth();
const adminDb = adminApp.firestore();

export { adminAuth, adminDb };
