import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { User, ShieldCheck } from 'lucide-react'; // Import ikon yang dibutuhkan

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // State sederhana untuk toggle antara Login dan Register
  // Kita set default ke true untuk halaman login
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        redirect: false, // Kita handle redirect secara manual
        email,
        password,
      });

      if (result.error) {
        setError('Email atau password salah. Silakan coba lagi.');
        setIsLoading(false);
      } else {
        // Jika login berhasil, redirect ke halaman utama atau dashboard
        router.push('/');
      }
    } catch (err) {
      console.error("An unexpected error occurred:", err);
      setError('Terjadi kesalahan. Silakan coba lagi nanti.');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Head>
        <title>{`${isLogin ? 'Login' : 'Register'} - Exotea App`}</title>
      </Head>
      <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">
            {isLogin ? 'Selamat Datang Kembali!' : 'Buat Akun Baru'}
            </h1>
            <p className="mt-2 text-gray-600">
                {isLogin ? 'Silakan masukkan detail Anda untuk login.' : 'Isi form untuk membuat akun.'}
            </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700 sr-only"
            >
              Alamat Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="relative block w-full px-4 py-3 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              placeholder="Alamat Email"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700 sr-only"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="relative block w-full px-4 py-3 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              placeholder="Password"
            />
          </div>

          {error && <p className="text-sm text-center text-red-600">{error}</p>}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="relative flex justify-center w-full px-4 py-3 text-sm font-medium text-white bg-orange-600 border border-transparent rounded-md group hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:bg-orange-400"
            >
              {isLoading ? 'Memproses...' : (isLogin ? 'Login' : 'Register')}
            </button>
          </div>
        </form>

        {/* Bagian "Akun Yang Bisa Di Test" dikembalikan */}
        <div className="mt-8 pt-6 border-t border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 text-center mb-4 flex items-center justify-center">
                <ShieldCheck className="h-6 w-6 text-blue-600 mr-2" /> Akun Yang Bisa Di Test
            </h2>
            <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="font-semibold text-blue-800">Admin</p>
                    <p className="text-sm text-blue-700">Email: <span className="font-mono">admin@exotea.com</span></p>
                    <p className="text-sm text-blue-700">Password: <span className="font-mono">admin123</span></p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <p className="font-semibold text-green-800">Karyawan</p>
                    <p className="text-sm text-green-700">Email: <span className="font-mono">pegawai@exotea.com</span></p>
                    <p className="text-sm text-green-700">Password: <span className="font-mono">pegawai123</span></p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="font-semibold text-blue-800">Pimpinan</p>
                    <p className="text-sm text-blue-700">Email: <span className="font-mono">pimpinan@exotea.com</span></p>
                    <p className="text-sm text-blue-700">Password: <span className="font-mono">pimpinan123</span></p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <p className="font-semibold text-green-800">Pelanggan</p>
                    <p className="text-sm text-green-700">Email: <span className="font-mono">pelanggan@exotea.com</span></p>
                    <p className="text-sm text-green-700">Password: <span className="font-mono">pelanggan123</span></p>
                </div>
            </div>
        </div>

        <div className="text-sm text-center text-gray-600">
            {isLogin ? (
                <p>
                Belum punya akun?{' '}
                <button onClick={() => setIsLogin(false)} className="font-medium text-orange-600 hover:text-orange-500">
                    Daftar di sini
                </button>
                </p>
            ) : (
                <p>
                Sudah punya akun?{' '}
                <button onClick={() => setIsLogin(true)} className="font-medium text-orange-600 hover:text-orange-500">
                    Login di sini
                </button>
                </p>
            )}
        </div>
      </div>
    </div>
  );
}
