// pages/api/auth/register.js
import { adminAuth, adminDb } from '../../../lib/firebase-admin'; // Import Firebase Admin SDK

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Metode tidak diizinkan.' });
  }

  const { name, email, password } = req.body;

  // Validasi input
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, error: 'Nama, email, dan password harus diisi.' });
  }

  try {
    // 1. Buat user di Firebase Authentication
    const userRecord = await adminAuth.createUser({
      email,
      password,
      displayName: name,
    });

    // 2. Simpan data user tambahan (termasuk role) di Cloud Firestore
    // UID dari Firebase Auth akan menjadi Document ID di Firestore
    await adminDb.collection('users').doc(userRecord.uid).set({
      name,
      email,
      role: 'user', // Default role untuk registrasi adalah 'user'
      createdAt: new Date(),
    });

    res.status(201).json({ success: true, message: 'Pendaftaran berhasil!', userId: userRecord.uid });
  } catch (error) {
    console.error('Error during Firebase registration:', error.message);
    let errorMessage = 'Terjadi kesalahan saat mendaftar.';
    if (error.code === 'auth/email-already-exists') {
      errorMessage = 'Email sudah terdaftar.';
    }
    res.status(500).json({ success: false, error: errorMessage });
  }
}
