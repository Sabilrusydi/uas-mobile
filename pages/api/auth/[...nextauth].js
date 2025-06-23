import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../lib/firebase'; // Pastikan path ini benar
import { adminDb } from '../../../lib/firebase-admin'; // Firestore Admin SDK

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "test@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        console.log("--- Authorize function started ---");
        console.log("Attempting to log in with email:", credentials.email);

        try {
          // 1. Gunakan Firebase Auth untuk memverifikasi email dan password
          const userCredential = await signInWithEmailAndPassword(
            auth,
            credentials.email,
            credentials.password
          );
          
          const user = userCredential.user;
          console.log("Firebase Auth successful. User UID:", user.uid);

          if (user) {
            // 2. Jika autentikasi berhasil, ambil data dari Firestore
            console.log("Fetching user data from Firestore...");
            const userDoc = await adminDb.collection('users').doc(user.uid).get();

            if (!userDoc.exists) {
              // Jika data user tidak ada di Firestore, tolak login
              console.error("Firestore Error: Document for UID", user.uid, "does not exist in 'users' collection.");
              throw new Error("User data not found in database.");
            }
            
            console.log("Firestore document found.");
            const userData = userDoc.data();
            console.log("User data from Firestore:", userData);

            // 3. Kembalikan objek user yang akan disimpan di session
            // Pastikan properti ini ada di database Anda
            const finalUserObject = {
              id: user.uid,
              email: user.email,
              name: userData.name,
              role: userData.role, // Ambil role dari Firestore
            };

            console.log("Authorization successful. Returning user object:", finalUserObject);
            return finalUserObject;
          } else {
            console.log("Firebase Auth successful, but user object is null.");
            return null;
          }
        } catch (error) {
          console.error("---!!! ERROR IN AUTHORIZE FUNCTION !!!---");
          console.error("Error message:", error.message);
          // Return null jika ada error, atau throw error untuk menampilkan pesan custom
          // Pesan error ini akan ditampilkan di halaman login jika di-handle
          throw new Error('Invalid credentials or server error.');
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    // Callback ini dipanggil setiap kali JWT dibuat (saat login)
    async jwt({ token, user }) {
      // 'user' hanya ada saat pertama kali login
      if (user) {
        token.uid = user.id;
        token.role = user.role;
        token.name = user.name;
      }
      return token;
    },
    // Callback ini dipanggil setiap kali session diakses
    async session({ session, token }) {
      if (token) {
        session.user.uid = token.uid;
        session.user.role = token.role;
        session.user.name = token.name;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login', // Halaman login kustom Anda
  },
  secret: process.env.NEXTAUTH_SECRET, // Pastikan ini ada di .env.local
};

export default NextAuth(authOptions);
