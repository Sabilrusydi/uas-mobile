import { useRouter } from 'next/router';
import AdminLayout from './AdminLayout';
import MainLayout from './MainLayout';

// Ini adalah komponen "pintar" yang akan memilih layout yang benar.
const Layout = ({ children }) => {
  const router = useRouter();

  // Jika path URL dimulai dengan '/dashboard', gunakan AdminLayout.
  if (router.pathname.startsWith('/dashboard')) {
    return <AdminLayout>{children}</AdminLayout>;
  }

  // Jika tidak, gunakan MainLayout untuk semua halaman lainnya.
  return <MainLayout>{children}</MainLayout>;
};

export default Layout;
