// File: /pages/api/products/index.js (Versi Final dengan Perbaikan Sesi)

import { getSession } from 'next-auth/react';
import { adminDb } from '../../../lib/firebase-admin';
import formidable from 'formidable';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

// --- FUNGSI BANTUAN UNTUK MEMPROSES FORM ---
// Kita pindahkan logika form ke dalam fungsi terpisah agar lebih rapi
const handlePostRequest = async (req, res) => {
  return new Promise((resolve, reject) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('API Error (form.parse):', err);
        res.status(500).json({ error: 'Failed to parse form data.' });
        return resolve();
      }

      try {
        const name = Array.isArray(fields.name) ? fields.name[0] : fields.name;
        const price = Array.isArray(fields.price) ? fields.price[0] : fields.price;
        const description = Array.isArray(fields.description) ? fields.description[0] : fields.description;
        const file = Array.isArray(files.file) ? files.file[0] : files.file;

        if (!name || !price || !file) {
          res.status(400).json({ error: 'Nama, harga, dan gambar wajib diisi.' });
          return resolve();
        }

        const uploadResult = await cloudinary.uploader.upload(file.filepath, { folder: 'exotea-products' });
        const newProductData = {
          name,
          price: parseFloat(price),
          description,
          imageUrl: uploadResult.secure_url,
          createdAt: new Date(),
        };

        const docRef = await adminDb.collection('products').add(newProductData);
        res.status(201).json({ id: docRef.id, ...newProductData });
        return resolve();

      } catch (error) {
        console.error('API Error (handlePostRequest):', error);
        res.status(500).json({ error: 'Failed to create product.' });
        return resolve();
      }
    });
  });
};

// --- HANDLER UTAMA ---
export default async function handler(req, res) {
  // 1. Ambil sesi terlebih dahulu SEBELUM melakukan apa pun.
  const session = await getSession({ req });

  // 2. Lakukan pengecekan keamanan.
  if (!session || session.user.role !== 'admin') {
    return res.status(403).json({ error: 'Unauthorized: Admin access required.' });
  }

  // 3. Setelah sesi terverifikasi, baru proses permintaan.
  switch (req.method) {
    case 'GET':
      try {
        const snapshot = await adminDb.collection('products').orderBy('createdAt', 'desc').get();
        const products = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt.toDate().toISOString(),
        }));
        return res.status(200).json(products);
      } catch (error) {
        console.error('API Error (GET /api/products):', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

    case 'POST':
      // Panggil fungsi bantuan untuk memproses form
      await handlePostRequest(req, res);
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}