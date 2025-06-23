import { getSession } from 'next-auth/react';
import { adminDb } from '../../../lib/firebase-admin'; // Pastikan path ini benar

export default async function handler(req, res) {
  // Hanya izinkan metode GET
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  const session = await getSession({ req });

  // Pengecekan sesi yang lebih detail
  if (!session) {
    console.error('API Stats Error: No session found. Access denied.');
    return res.status(401).json({ error: 'Not authenticated. Please log in.' });
  }
  
  if (session.user.role !== 'admin') {
    console.error(`API Stats Error: User ${session.user.email} with role '${session.user.role}' tried to access admin stats.`);
    return res.status(403).json({ error: 'Access Denied. You do not have admin privileges.' });
  }

  try {
    // Menjalankan kedua query secara paralel untuk efisiensi
    const [productsSnapshot, usersSnapshot] = await Promise.all([
      adminDb.collection('products').get(),
      adminDb.collection('users').get()
    ]);

    const stats = {
      products: productsSnapshot.size || 0,
      users: usersSnapshot.size || 0,
      // Placeholder untuk revenue, bisa Anda kembangkan nanti
      revenue: 1250000, 
    };
    
    // Kirim respons JSON yang berhasil
    return res.status(200).json(stats);

  } catch (error) {
    // Ini adalah bagian krusial: menangkap semua error lain
    console.error('Internal Server Error in /api/dashboard/stats:', error);
    
    // Kirim respons error dalam format JSON
    return res.status(500).json({ 
      error: 'Internal Server Error',
      message: error.message // Mengirim pesan error untuk debugging
    });
  }
}