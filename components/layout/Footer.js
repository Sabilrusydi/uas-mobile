// components/layout/Footer.js
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react'; // Import ikon sosial media

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-10 rounded-t-xl shadow-lg mt-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Kolom 1: Tentang Kami */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4 border-b-2 border-blue-500 pb-2">Exotea App</h3>
            <p className="text-sm leading-relaxed">
              Exotea App adalah platform pemesanan online terkemuka yang dirancang untuk kemudahan dan kenyamanan Anda.
              Kami berkomitmen menyediakan produk berkualitas tinggi dan pengalaman berbelanja yang tak tertandingi.
            </p>
          </div>

          {/* Kolom 2: Navigasi Cepat */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4 border-b-2 border-blue-500 pb-2">Navigasi Cepat</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-blue-400 transition-colors duration-200 flex items-center">
                  <span className="mr-2">&gt;</span> Home
                </Link>
              </li>
              <li>
                <Link href="/produk" className="hover:text-blue-400 transition-colors duration-200 flex items-center">
                  <span className="mr-2">&gt;</span> Produk
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-400 transition-colors duration-200 flex items-center">
                  <span className="mr-2">&gt;</span> Kontak
                </Link>
              </li>
              {/* Tambahkan link lain seperti Kebijakan Privasi, Syarat & Ketentuan */}
              <li>
                <Link href="/login" className="hover:text-blue-400 transition-colors duration-200 flex items-center">
                  <span className="mr-2">&gt;</span> Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Hubungi Kami & Media Sosial */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4 border-b-2 border-blue-500 pb-2">Hubungi Kami</h3>
            <p className="text-sm mb-4">
              <strong className="text-white">Email:</strong> info@exotea.com <br />
              <strong className="text-white">Telepon:</strong> +62 812 3456 7890 <br />
              <strong className="text-white">Alamat:</strong> Jl. Contoh No. 123, Bandung, Indonesia
            </p>
            {/* Ikon Media Sosial */}
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors duration-200 transform hover:scale-110" aria-label="Facebook">
                <Facebook className="h-7 w-7" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200 transform hover:scale-110" aria-label="Twitter">
                <Twitter className="h-7 w-7" />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors duration-200 transform hover:scale-110" aria-label="Instagram">
                <Instagram className="h-7 w-7" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors duration-200 transform hover:scale-110" aria-label="LinkedIn">
                <Linkedin className="h-7 w-7" />
              </a>
              <a href="https://github.com/rusydisabil" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-200 transform hover:scale-110" aria-label="GitHub">
                <Github className="h-7 w-7" />
              </a>
            </div>
          </div>
        </div>
        {/* Hak Cipta */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Exotea App. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
