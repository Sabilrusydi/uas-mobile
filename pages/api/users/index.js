// File: /pages/api/users/index.js

import { getSession } from 'next-auth/react';
import { adminDb } from '../../../lib/firebase-admin';

export default async function handler(req, res) {
  const session = await getSession({ req });

  // 1. Pastikan hanya admin yang bisa mengakses
  if (!session || session.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access Denied. Admin privileges required.' });
  }

  // Hanya izinkan metode GET
  if (req.method === 'GET') {
    try {
      // 2. Ambil semua data dari koleksi 'users' menggunakan Admin SDK
      const usersSnapshot = await adminDb.collection('users').get();
      
      // 3. Ubah data menjadi format yang kita inginkan
      const users = usersSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          email: data.email,
          role: data.role,
          // Ubah Firestore Timestamp menjadi string agar aman untuk JSON
          createdAt: data.createdAt.toDate().toISOString(),
        };
      });

      // 4. Kirim data sebagai respons JSON
      return res.status(200).json(users);

    } catch (error) {
      console.error('Error fetching users:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } 
  
  // Jika metode bukan GET
  else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}