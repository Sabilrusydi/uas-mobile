// File: pages/produk/index.js

import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';
// Path ini sudah diperbaiki untuk menunjuk ke root folder lalu ke lib
import { adminDb } from '../../lib/firebase-admin'; 

// Komponen utama untuk menampilkan halaman produk
export default function ProdukPage({ products, error }) {
  // Kondisi jika terjadi error saat pengambilan data
  if (error) {
    return (
      <div className="text-center py-12">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Error Memuat Produk</h1>
        <p className="text-gray-700">{error}</p>
      </div>
    );
  }

  // Kondisi jika tidak ada produk yang tersedia
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Belum Ada Produk</h1>
        <p className="text-gray-600">Periksa kembali apakah sudah ada data di koleksi 'products' pada database Firestore Anda.</p>
      </div>
    );
  }

  // Tampilan utama jika produk berhasil dimuat
  return (
    <>
      <Head>
        <title>Katalog Produk - Exotea App</title>
        <meta name="description" content="Jelajahi berbagai produk menarik dari Exotea App." />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-10">
          Katalog Produk
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              <Link href={`/produk/${product.id}`} className="block">
                <div className="relative w-full h-48 bg-gray-200">
                  <Image
                    src={product.imageUrl || 'https://placehold.co/400x300'}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-xl transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <div className="p-5">
                  <h2 className="text-xl font-bold text-gray-900 mb-2 truncate">{product.name}</h2>
                  <p className="text-lg font-semibold text-blue-600 mb-3">
                    Rp{product.price.toLocaleString('id-ID')}
                  </p>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// Fungsi ini berjalan di server untuk mengambil data sebelum halaman di-render
export async function getServerSideProps() {
  try {
    // Mengambil data langsung dari koleksi 'products' di Firestore
    const snapshot = await adminDb.collection('products').orderBy('createdAt', 'desc').get();
    
    // DEBUGGING: Cek output ini di terminal (tempat `npm run dev`)
    console.log(`[DEBUG] Ditemukan ${snapshot.size} dokumen dari koleksi 'products'.`);
    
    const products = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        // Konversi Timestamp ke string agar aman dikirim ke komponen
        createdAt: data.createdAt.toDate().toISOString(),
      };
    });

    return {
      props: {
        products,
        error: null,
      },
    };

  } catch (error) {
    console.error('[ERROR] Gagal mengambil data dari Firestore:', error);
    return {
      props: {
        products: [],
        error: 'Gagal mengambil data dari database.',
      },
    };
  }
}