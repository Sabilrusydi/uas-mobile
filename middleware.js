import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` akan memperkaya `req` Anda dengan token jika pengguna login.
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const { token } = req.nextauth;
    const userRole = token?.role;

    // Jika pengguna mencoba mengakses halaman admin (products/users)
    if (pathname.startsWith("/dashboard/products") || pathname.startsWith("/dashboard/users")) {
      if (userRole !== "admin") {
        // Jika bukan admin, tendang ke halaman "unauthorized".
        return NextResponse.rewrite(new URL("/unauthorized", req.url));
      }
    }

    // Jika pengguna mencoba mengakses dasbor utama
    if (pathname === "/dashboard") {
      // Jika dia admin, biarkan masuk.
      if (userRole === "admin") {
        return NextResponse.next();
      }
      // Jika dia pegawai, arahkan ke dasbor pegawai.
      if (userRole === "pegawai") {
        return NextResponse.redirect(new URL("/dashboard/employee", req.url));
      }
      // Jika dia pimpinan, arahkan ke dasbor pimpinan.
      if (userRole === "pimpinan") {
        return NextResponse.redirect(new URL("/dashboard/leader", req.url));
      }
      // Jika role lain (atau tidak ada), tendang ke halaman "unauthorized".
      return NextResponse.rewrite(new URL("/unauthorized", req.url));
    }

    // Izinkan akses jika tidak ada aturan yang dilanggar
    return NextResponse.next();
  },
  {
    callbacks: {
      // Callback ini menentukan apakah pengguna dianggap "authorized".
      // Middleware hanya akan berjalan jika ini mengembalikan true.
      // Jika false, pengguna otomatis diarahkan ke halaman login.
      authorized: ({ token }) => !!token, // Cukup periksa apakah token ada (user sudah login)
    },
  }
);

// Terapkan middleware ini ke semua rute yang perlu dilindungi.
export const config = {
  matcher: ["/dashboard/:path*", "/profile"],
};
