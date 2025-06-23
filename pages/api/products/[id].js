// File: /pages/api/products/[id].js

import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]'; // Impor authOptions
import { adminDb } from '../../../lib/firebase-admin';

export default async function handler(req, res) {
  // Ambil sesi secara aman di sisi server
  const session = await getServerSession(req, res, authOptions);
  const { id } = req.query;

  // Pintu Keamanan: Hanya admin yang boleh melanjutkan
  if (!session || session.user.role !== 'admin') {
    // Kirim respons 403 (Forbidden) jika bukan admin atau tidak login
    return res.status(403).json({ error: 'Unauthorized: Admin access required.' });
  }

  const productRef = adminDb.collection('products').doc(id);

  switch (req.method) {
    // KASUS UNTUK MEMPERBARUI PRODUK (PUT)
    case 'PUT':
      try {
        const updatedData = req.body;
        // Hapus ID dari data yang dikirim agar tidak error saat update
        delete updatedData.id; 
        
        await productRef.update(updatedData);
        res.status(200).json({ id, ...updatedData });
      } catch (error) {
        console.error(`API Error (PUT /api/products/${id}):`, error);
        res.status(500).json({ error: 'Failed to update product.' });
      }
      break;

    // KASUS UNTUK MENGHAPUS PRODUK (DELETE)
    case 'DELETE':
      try {
        await productRef.delete();
        res.status(200).json({ message: `Product ${id} deleted successfully.` });
      } catch (error) {
        console.error(`API Error (DELETE /api/products/${id}):`, error);
        res.status(500).json({ error: 'Failed to delete product.' });
      }
      break;

    // Jika metode bukan PUT atau DELETE
    default:
      res.setHeader('Allow', ['PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}