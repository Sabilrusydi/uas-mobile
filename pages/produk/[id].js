// pages/produk/[id].js
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ShoppingCart, ArrowLeft, Star } from 'lucide-react';

export default function ProdukDetail({ product, error }) {
  const router = useRouter();

  if (error) {
    return (
      <div className="text-center py-12">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Error Memuat Detail Produk</h1>
        <p className="text-gray-700">{error}</p>
        <button
          onClick={() => router.back()}
          className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200 flex items-center mx-auto"
        >
          <ArrowLeft className="h-5 w-5 mr-2" /> Kembali
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Produk Tidak Ditemukan</h1>
        <p className="text-gray-600">Produk yang Anda cari tidak tersedia.</p>
        <button
          onClick={() => router.push('/produk')}
          className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200 flex items-center mx-auto"
        >
          <ArrowLeft className="h-5 w-5 mr-2" /> Kembali ke Katalog
        </button>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{product.name} - Exotea App</title>
        <meta name="description" content={product.description.substring(0, 150) + '...'} />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => router.back()}
          className="mb-6 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-full transition-colors duration-200 flex items-center"
        >
          <ArrowLeft className="h-5 w-5 mr-2" /> Kembali ke Katalog
        </button>

        <div className="bg-white rounded-xl shadow-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center border border-gray-100">
          {/* Gambar Produk */}
          <div className="relative w-full h-80 md:h-96 bg-gray-200 rounded-lg overflow-hidden shadow-md">
            <Image
              src={product.imageUrl || 'https://placehold.co/600x400/e2e8f0/0f172a?text=No+Image'}
              alt={product.name}
              layout="fill"
              objectFit="contain"
              className="rounded-lg"
              priority
            />
          </div>

          {/* Detail Produk */}
          <div className="flex flex-col justify-between h-full">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
                {product.name}
              </h1>
              <p className="text-2xl font-bold text-blue-600 mb-4">
                Rp{product.price.toLocaleString('id-ID')}
              </p>
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-5 w-5 ${i < 4 ? 'fill-current' : ''}`} />
                  ))}
                </div>
                <span className="text-gray-600 text-sm ml-2">(4.0 dari 5 bintang)</span>
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">
                {product.description}
              </p>
            </div>

            <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-colors duration-200 flex items-center justify-center transform hover:scale-105">
              <ShoppingCart className="h-6 w-6 mr-2" /> Tambah ke Keranjang
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/produk/${id}`;
    const res = await fetch(apiUrl);

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || `API returned status ${res.status}`);
    }

    const data = await res.json();
    const product = data.data;

    if (!product) {
      return {
        notFound: true,
      };
    }

    // Data dari Firestore sudah JSON-serializable, tidak perlu JSON.parse(JSON.stringify())
    return {
      props: {
        product,
        error: null,
      },
    };
  } catch (error) {
    console.error(`Gagal mengambil detail produk dengan ID ${id}:`, error);
    return {
      props: {
        product: null,
        error: `Gagal memuat detail produk: ${error.message || 'Terjadi kesalahan tidak diketahui.'}`,
      },
    };
  }
}
