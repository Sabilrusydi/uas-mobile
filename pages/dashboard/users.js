// File: /pages/dashboard/users.js (Versi Gabungan & Perbaikan)

import { useEffect, useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout'; // Layout Anda dipertahankan
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const UsersDashboard = () => {
    // State Anda kita pertahankan
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(''); // State tambahan untuk pesan error
    
    const { data: session, status } = useSession();
    const router = useRouter();

    // Logika redirect Anda sudah benar, kita pertahankan
    useEffect(() => {
        if (status === 'loading') return; // Jangan lakukan apa-apa selagi sesi loading

        if (status === 'unauthenticated') {
            router.push('/login');
        } else if (session.user.role !== 'admin') {
            // Jika bukan admin, tendang ke halaman utama
            router.push('/');
        } else {
            // =========================================================
            // INI BAGIAN YANG KITA UBAH
            // =========================================================
            const fetchUsers = async () => {
                try {
                    // Mengambil data dari API Route yang aman, bukan dari Firestore langsung
                    const response = await fetch('/api/users');
                    
                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.error || 'Gagal memuat pengguna.');
                    }

                    const usersData = await response.json();
                    setUsers(usersData);

                } catch (err) {
                    console.error("Error fetching users via API:", err);
                    setError(err.message); // Tampilkan pesan error di UI
                } finally {
                    setLoading(false);
                }
            };

            fetchUsers();
        }
    }, [session, status, router]);

    // Tampilan loading Anda kita pertahankan
    if (status === 'loading' || loading) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }

    // Tampilkan pesan error jika ada
    if (error) {
        return <div className="p-6 text-red-500">Error: {error}</div>;
    }

    // =========================================================
    // UI Tabel Anda kita pertahankan sepenuhnya
    // =========================================================
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Manajemen Pengguna</h1>
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{user.email}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        user.role === 'admin' ? 'bg-green-100 text-green-800' : 
                                        user.role === 'pegawai' ? 'bg-blue-100 text-blue-800' :
                                        user.role === 'pimpinan' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                                    }`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button className="text-indigo-600 hover:text-indigo-900">Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// Logika layout Anda kita pertahankan
UsersDashboard.getLayout = function getLayout(page) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default UsersDashboard;