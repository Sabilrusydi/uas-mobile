// pages/dashboard/index.js
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Package, Users, DollarSign, Activity } from 'lucide-react';

// Komponen StatCard tidak perlu diubah
const StatCard = ({ icon, label, value, color }) => (
  <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
    <div className={`p-3 rounded-full mr-4 ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-gray-500">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);

const DashboardHomePage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [stats, setStats] = useState({ products: 0, users: 0, revenue: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(''); // State untuk pesan error

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated') {
      const fetchStats = async () => {
        try {
          const response = await fetch('/api/dashboard/stats');

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: 'Gagal memuat data statistik dan respons bukan JSON.' }));
            throw new Error(errorData.error || `Error: ${response.status}`);
          }

          const data = await response.json();
          setStats(data);

        } catch (err) {
          console.error("Error fetching dashboard stats:", err);
          setError(err.message); // Simpan pesan error ke state
        } finally {
          setLoading(false);
        }
      };

      fetchStats();
    }
  }, [session, status, router]);

  // Tampilkan pesan loading
  if (loading || status === 'loading') {
    return <p>Loading dashboard...</p>;
  }

  // Tampilkan pesan error jika ada
  if (error) {
      return <div className="p-6 text-red-600">Error: {error}</div>;
  }

  // Ini adalah JSX yang akan dirender di dalam <AdminLayout> oleh _app.js
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard 
          icon={<Package size={24} className="text-white" />}
          label="Total Products"
          value={stats.products}
          color="bg-blue-500"
        />
        <StatCard 
          icon={<Users size={24} className="text-white" />}
          label="Total Users"
          value={stats.users}
          color="bg-green-500"
        />
        <StatCard 
          icon={<DollarSign size={24} className="text-white" />}
          label="Total Revenue"
          value={new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(stats.revenue)}
          color="bg-yellow-500"
        />
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 flex items-center">
              <Activity size={22} className="mr-2" />
              Recent Activity
          </h2>
          <p className="text-gray-600">Activity feed will be displayed here.</p>
      </div>
    </div>
  );
};

// Jangan panggil getLayout atau AdminLayout di sini lagi
export default DashboardHomePage;