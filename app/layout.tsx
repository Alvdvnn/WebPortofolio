import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// --- TAMBAHAN IMPORT ---
// (Asumsi path ini benar berdasarkan struktur proyek Anda)
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
// --- AKHIR TAMBAHAN IMPORT ---

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Diperbarui agar sesuai proyek Anda
  title: "Devin Alfaro Portfolio",
  description: "Web Development Enthusiast",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* --- KOMPONEN DITAMBAHKAN DI SINI --- */}
        {/* Kursor kustom harus berada di level atas agar muncul di semua halaman */}
        <CustomCursor />
        {/* Navbar juga berada di level atas */}
        <Navbar />
        {/* --- AKHIR TAMBAHAN --- */}
        
        {children}
      </body>
    </html>
  );
}