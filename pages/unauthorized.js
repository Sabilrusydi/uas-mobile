import Link from 'next/link';
import MainLayout from '../components/layout/MainLayout';
import { ShieldAlert } from 'lucide-react';

const UnauthorizedPage = () => {
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center text-center py-20">
        <ShieldAlert className="w-24 h-24 text-red-500 mb-6" />
        <h1 className="text-4xl font-bold text-gray-800">Akses Ditolak</h1>
        <p className="mt-4 text-lg text-gray-600">
          Anda tidak memiliki izin untuk mengakses halaman ini.
        </p>
        <Link href="/" className="mt-8 px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors">
            Kembali ke Halaman Utama
        </Link>
      </div>
    </MainLayout>
  );
};

export default UnauthorizedPage;
