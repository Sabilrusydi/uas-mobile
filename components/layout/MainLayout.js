// components/layout/MainLayout.js
import Navbar from './Navbar';
import Footer from './Footer';
// SessionProvider tidak perlu diimpor di sini jika sudah diimpor di _app.js.
// Kita hanya menggunakan komponen layout-nya.

const MainLayout = ({ children }) => {
  return (
    // min-h-screen memastikan layout mengisi seluruh tinggi viewport
    // flex flex-col agar footer berada di bawah
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      <Navbar /> {/* Komponen Navbar di bagian atas */}
      <main className="flex-grow container mx-auto px-4 py-8"> {/* Main content yang akan mengisi sisa ruang */}
        {children} {/* Konten halaman akan dirender di sini */}
      </main>
      <Footer /> {/* Komponen Footer di bagian bawah */}
    </div>
  );
};

export default MainLayout;
