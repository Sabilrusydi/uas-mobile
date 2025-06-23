import Link from 'next/link';
import Image from 'next/image'; // Import komponen Image dari Next.js untuk optimasi gambar

export default function Hero() {
  return (
    <section
      className="relative bg-cover bg-center h-[calc(100vh-80px)] md:h-[calc(100vh-96px)] flex items-center justify-center text-white overflow-hidden rounded-b-xl shadow-lg"
      // Gaya latar belakang untuk Hero Section
      style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
    >
      {/* Overlay untuk meningkatkan keterbacaan teks */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-700 to-indigo-900 opacity-80"></div>

      {/* Konten Hero */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto py-12">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 animate-fadeInDown drop-shadow-lg">
          Temukan Gaya Hidup Anda di Exotea App
        </h1>
        <p className="text-md md:text-lg lg:text-xl mb-10 max-w-3xl mx-auto animate-fadeInUp opacity-90">
          Jelajahi koleksi produk pilihan yang stylish dan inovatif. Nikmati kemudahan berbelanja online
          dengan kualitas terbaik dan penawaran eksklusif, langsung di genggaman Anda.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 animate-fadeIn">
          <Link href="/produk" className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400">
            Mulai Belanja
          </Link>
          <Link href="/contact" className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">
            Hubungi Kami
          </Link>
        </div>
      </div>

      {/* Animasi tambahan (opsional) */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-900 to-transparent"></div>

      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeInDown {
          animation: fadeInDown 1s ease-out forwards;
        }
        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out forwards 0.3s; /* Delay sedikit */
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards 0.6s; /* Delay lebih banyak */
        }
      `}</style>
    </section>
  );
}
