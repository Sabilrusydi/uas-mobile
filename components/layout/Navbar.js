import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { ShoppingCart, User, LogIn, LogOut, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const { data: session, status } = useSession();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-orange-600">
          Exotea App
        </Link>
        <div className="flex items-center space-x-6">
          {/* Menu untuk semua pengguna */}
          <Link href="/produk" className="text-gray-600 hover:text-orange-600">Belanja</Link>
          <Link href="/contact" className="text-gray-600 hover:text-orange-600">Kontak</Link>
          
          {/* Menu berdasarkan status login */}
          {status === 'loading' ? (
            <div className="text-gray-500">Memuat...</div>
          ) : session ? (
            // Jika SUDAH LOGIN
            <>
              {session.user.role === 'admin' && (
                // --- PERUBAHAN DI SINI ---
                // Pastikan href mengarah ke /dashboard, bukan /admin/dashboard
                <Link href="/dashboard" className="flex items-center text-gray-600 hover:text-orange-600">
                  <LayoutDashboard className="h-5 w-5 mr-1" />
                  Dashboard Admin
                </Link>
              )}
              <Link href="/profile" className="flex items-center text-gray-600 hover:text-orange-600">
                <User className="h-5 w-5 mr-1" />
                My Biodata
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="flex items-center bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Keluar
              </button>
            </>
          ) : (
            // Jika BELUM LOGIN
            <Link href="/login" className="flex items-center bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600">
              <LogIn className="h-5 w-5 mr-2" />
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
