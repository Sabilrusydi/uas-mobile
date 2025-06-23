import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import MainLayout from '../components/layout/MainLayout';
import { User, Mail, Shield } from 'lucide-react';
import { useEffect } from 'react';

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Jika sesi selesai loading dan pengguna tidak terautentikasi,
    // redirect ke halaman login.
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  // Tampilkan pesan loading saat sesi sedang diperiksa
  if (status === 'loading') {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-64">
          <p className="text-lg">Memuat data profil...</p>
        </div>
      </MainLayout>
    );
  }

  // Jangan render apapun jika tidak ada sesi (untuk menghindari flash content)
  if (!session) {
    return null;
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-10">My Biodata</h1>
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <div className="space-y-6">
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <User className="h-8 w-8 text-orange-500 mr-4" />
              <div>
                <p className="text-sm text-gray-500">Nama Lengkap</p>
                <p className="text-xl font-semibold text-gray-800">{session.user.name}</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <Mail className="h-8 w-8 text-orange-500 mr-4" />
              <div>
                <p className="text-sm text-gray-500">Alamat Email</p>
                <p className="text-xl font-semibold text-gray-800">{session.user.email}</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <Shield className="h-8 w-8 text-orange-500 mr-4" />
              <div>
                <p className="text-sm text-gray-500">Peran (Role)</p>
                <p className="text-xl font-semibold text-gray-800 capitalize">{session.user.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfilePage;

