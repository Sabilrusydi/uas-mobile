// pages/index.js
import Head from 'next/head'; // Untuk mengatur meta tag di header
import Hero from '../components/Hero'; // Impor komponen Hero

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Exotea App - Pemesanan Online Terbaik</title>
        <meta name="description" content="Aplikasi pemesanan online untuk produk stylish dan inovatif. Belanja mudah, aman, dan cepat." />
        <link rel="icon" href="/favicon.ico" /> {/* Tambahkan favicon jika ada */}
      </Head>

      {/* Hero section sebagai tampilan utama */}
      <Hero />

      {/* Anda bisa menambahkan bagian lain dari halaman utama di sini, seperti: */}
      {/* Bagian Produk Unggulan, Call to Action lainnya, dll. */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Mengapa Memilih Exotea App?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-xl font-semibold text-blue-600 mb-3">Produk Berkualitas</h3>
            <p className="text-gray-600">Kami hanya menyediakan produk dengan kualitas terbaik dan teruji.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-xl font-semibold text-blue-600 mb-3">Pemesanan Mudah</h3>
            <p className="text-gray-600">Antarmuka yang intuitif membuat proses belanja Anda cepat dan nyaman.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-xl font-semibold text-blue-600 mb-3">Pengiriman Cepat</h3>
            <p className="text-gray-600">Nikmati pengiriman produk langsung ke pintu Anda dengan cepat dan aman.</p>
          </div>
        </div>
      </section>
    </>
  );
}
