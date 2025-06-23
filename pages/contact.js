// pages/contact.js
import { Mail, Phone, MapPin, Github, Linkedin, MessageCircle } from 'lucide-react'; // Import ikon dari lucide-react
import Head from 'next/head'; // Untuk mengatur meta tag di header

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Kontak Saya - Exotea App</title>
        <meta name="description" content="Informasi kontak dan biodata Rusydi Sabil, pengembang Exotea App." />
      </Head>
      <div className="min-h-[calc(100vh-160px)] bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl w-full bg-white p-8 rounded-xl shadow-lg border border-gray-200">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-8">
            Tentang Saya
          </h1>
          <div className="flex justify-center mb-6">
            {/* Ganti dengan path foto Anda di folder public */}
            <img
              src="/images/your-photo.jpg" // PASTIKAN PATH INI BENAR DAN GAMBAR ADA
              alt="Foto Profil Rusydi Sabil"
              className="w-40 h-40 rounded-full object-cover border-4 border-blue-500 shadow-xl transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Rusydi Sabil</h2>
            <p className="text-md text-gray-600 mt-1">Web Developer & Enthusiast</p>
            <p className="text-sm text-gray-500 mt-2 italic">
              "Dedicated to crafting engaging and user-friendly web experiences."
            </p>
          </div>

          <div className="space-y-4 border-t pt-6 mt-6 border-gray-200">
            <div className="flex items-center text-gray-700 text-lg">
              <Mail className="h-6 w-6 text-blue-600 mr-4" />
              <span>rusydisabil027@gmail.com</span>
            </div>
            <div className="flex items-center text-gray-700 text-lg">
              <Phone className="h-6 w-6 text-blue-600 mr-4" />
              <span>+62 812 3456 7890</span> {/* Ganti dengan nomor Anda */}
            </div>
            <div className="flex items-center text-gray-700 text-lg">
              <MapPin className="h-6 w-6 text-blue-600 mr-4" />
              <span>Bandung, Indonesia</span>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Temukan Saya di</h3>
            <div className="flex justify-center space-x-6">
              <a href="https://github.com/rusydisabil" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 transform hover:scale-125" aria-label="GitHub Profile">
                <Github className="h-9 w-9" />
              </a>
              <a href="https://linkedin.com/in/rusydisabil" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-700 transition-colors duration-200 transform hover:scale-125" aria-label="LinkedIn Profile">
                <Linkedin className="h-9 w-9" />
              </a>
              {/* Tambahkan link ke media sosial lainnya jika ada */}
              <a href="#" className="text-gray-600 hover:text-green-500 transition-colors duration-200 transform hover:scale-125" aria-label="WhatsApp (contoh)">
                <MessageCircle className="h-9 w-9" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
