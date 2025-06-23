import { useSession } from 'next-auth/react';
import MainLayout from '../../components/layout/MainLayout'; // Menggunakan MainLayout untuk sementara

const LeaderDashboard = () => {
    const { data: session } = useSession();

    return (
        <MainLayout>
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold">Dasbor Pimpinan</h1>
                <p className="mt-4 text-lg">
                    Selamat datang, <span className="font-semibold">{session?.user?.name}</span>!
                </p>
                <p>Ini adalah halaman khusus untuk Anda yang memiliki peran sebagai pimpinan.</p>
                {/* Di sini Anda bisa menambahkan fitur khusus untuk pimpinan */}
            </div>
        </MainLayout>
    );
};

export default LeaderDashboard;
