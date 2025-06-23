import { v2 as cloudinary } from 'cloudinary';
import formidable from 'formidable';

// Konfigurasi Cloudinary menggunakan environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Matikan bodyParser bawaan Next.js agar formidable bisa bekerja
export const config = {
  api: {
    bodyParser: false,
  },
};

const formidableParse = (req) => {
    return new Promise((resolve, reject) => {
        const form = formidable();
        form.parse(req, (err, fields, files) => {
            if (err) {
                reject(err);
            }
            resolve({ fields, files });
        });
    });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  try {
    // Parse form data yang masuk untuk mendapatkan file
    const { files } = await formidableParse(req);
    const file = files.file[0]; // formidable v3 menyimpan file dalam array
    
    if (!file) {
        return res.status(400).json({ error: 'No file was uploaded.' });
    }

    // Upload file ke Cloudinary
    const options = {
      use_filename: true, // Gunakan nama file asli
      unique_filename: false,
      overwrite: true,
      folder: 'exotea-products', // Opsional: simpan di folder tertentu
    };

    const result = await cloudinary.uploader.upload(file.filepath, options);

    // Kirim kembali URL gambar yang aman
    res.status(200).json({
      message: 'Upload successful',
      imageUrl: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    res.status(500).json({ error: 'Failed to upload file to Cloudinary.', details: error.message });
  }
}
