import { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { LayoutDashboard, Package, Users, LogOut, Menu, X } from 'lucide-react';
import { useRouter } from 'next/router';

export default function AdminLayout({ children }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Produk', href: '/dashboard/products', icon: Package },
    { name: 'Pengguna', href: '/dashboard/users', icon: Users },
  ];

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/login');
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
        <div className="p-6 text-center border-b">
            <h1 className="text-2xl font-bold text-white">Exotea Admin</h1>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
            {navItems.map((item) => (
            <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-3 text-lg rounded-lg transition-colors ${
                router.pathname === item.href
                    ? 'bg-orange-700 text-white'
                    : 'text-orange-100 hover:bg-orange-800 hover:text-white'
                }`}
            >
                <item.icon className="w-6 h-6 mr-4" />
                {item.name}
            </Link>
            ))}
        </nav>
        <div className="px-4 py-6 mt-auto border-t">
            <button
            onClick={handleSignOut}
            className="flex items-center w-full px-4 py-3 text-lg text-orange-100 rounded-lg hover:bg-orange-800 hover:text-white"
            >
            <LogOut className="w-6 h-6 mr-4" />
            Keluar
            </button>
        </div>
    </div>
  );


  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar untuk Desktop */}
      <aside className="hidden w-64 bg-orange-900 shadow-md md:block">
        <SidebarContent />
      </aside>

      {/* Mobile Menu Button */}
      <div className="md:hidden absolute top-4 left-4 z-20">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-gray-800 bg-white rounded-md shadow-lg">
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
      </div>

      {/* Sidebar untuk Mobile */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-10 flex md:hidden">
            <aside className="w-64 bg-orange-900 shadow-md">
                <SidebarContent />
            </aside>
            <div className="flex-1 bg-black opacity-50" onClick={() => setIsSidebarOpen(false)}></div>
        </div>
      )}


      <div className="flex flex-col flex-1">
        <header className="flex items-center justify-between p-6 bg-white border-b">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
                {navItems.find(item => item.href === router.pathname)?.name || 'Admin Panel'}
            </h2>
          </div>
          <div className="flex items-center">
            <span className="mr-4 text-gray-600">
              Selamat datang,{' '}
              <span className="font-bold">{session?.user?.name || 'Admin'}</span>
            </span>
          </div>
        </header>
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
