import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import Layout from '../components/layout/Layout'; // Import Layout cerdas yang baru

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      {/* Setiap halaman sekarang akan dibungkus oleh komponen Layout ini.
        Layout akan secara otomatis memilih tampilan yang benar.
      */}
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
