"use client";

// --- 1. Impor yang dibutuhkan ---
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FaTimes } from "react-icons/fa"; // Ikon 'X' untuk tombol close

// --- 2. Tipe Data (Opsional, tapi rapi) ---
interface Certificate {
  id: number;
  title: string;
  issuer: string;
  imageUrl: string;
}

// --- 3. DATA DUMMY (Ganti dengan sertifikat Anda) ---
const dummyCertificates: Certificate[] = [
  {
    id: 1,
    title: "React Advanced Pro",
    issuer: "Codecademy",
    imageUrl: "/GeminiWarna.pn", // Ganti dengan path sertifikat Anda
  },
  {
    id: 2,
    title: "Next.js for Experts",
    issuer: "Vercel Academy",
    imageUrl: "/GeminiHitam.pn", // Ganti dengan path sertifikat Anda
  },
  {
    id: 3,
    title: "Framer Motion Masterclass",
    issuer: "Fireship.io",
    imageUrl: "/GeminiWarna.pn", // Ganti dengan path sertifikat Anda
  },
  {
    id: 4,
    title: "UI/UX Design Principles",
    issuer: "Google Career Certificates",
    imageUrl: "/GeminiHitam.pn", // Ganti dengan path sertifikat Anda
  },
  // Tambahkan 2 lagi agar jadi 6 (pas di grid 3-kolom)
  {
    id: 5,
    title: "Certified JavaScript Developer",
    issuer: "W3Schools",
    imageUrl: "/GeminiHitam.pn", // Ganti dengan path sertifikat Anda
  },
  {
    id: 6,
    title: "Tailwind CSS Essentials",
    issuer: "Dicoding",
    imageUrl: "/GeminiWarna.pn", // Ganti dengan path sertifikat Anda
  },
];

export default function CertificateSection() {
  // --- 4. State untuk melacak sertifikat yang dipilih ---
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  return (
    <section id="certificates" className="relative container mx-auto py-24 px-6">
      
      {/* JUDUL */}
      <div className="mb-16 w-full">
        <h1 className="text-center text-5xl md:text-7xl font-bold text-white py-4">
          CERTIFICATES
        </h1>
      </div>

      {/* --- 5. GRID SERTIFIKAT --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {dummyCertificates.map((cert) => (
          <motion.div
            key={cert.id}
            className="bg-neutral-800 rounded-lg overflow-hidden cursor-pointer group"
            onClick={() => setSelectedCert(cert)} // Buka modal saat diklik
            layoutId={`certificate-card-${cert.id}`} // Animasi 'shared layout'
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Gambar Thumbnail */}
            <div className="w-full h-48 bg-neutral-900 relative">
              <Image
                src={cert.imageUrl}
                alt={cert.title}
                layout="fill"
                objectFit="contain" // 'contain' agar gambar utuh
                className="group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            {/* Info Teks */}
            <div className="p-4">
              <h3 className="text-lg font-bold text-white">{cert.title}</h3>
              <p className="text-sm text-neutral-400">{cert.issuer}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* --- 6. MODAL / LIGHTBOX --- */}
      <AnimatePresence>
        {selectedCert && (
          <>
            {/* Backdrop (Klik untuk menutup) */}
            <motion.div
              className="fixed inset-0 bg-black/80 z-50"
              onClick={() => setSelectedCert(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Konten Modal (Gambar yang diperbesar) */}
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              layoutId={`certificate-card-${selectedCert.id}`} // Animasi 'shared layout'
            >
              <div className="relative w-full max-w-4xl h-[80vh] bg-neutral-900 p-4 rounded-lg">
                <Image
                  src={selectedCert.imageUrl}
                  alt={selectedCert.title}
                  layout="fill"
                  objectFit="contain" // Tampilkan gambar penuh
                />
                
                {/* Tombol Close 'X' */}
                <button
                  onClick={() => setSelectedCert(null)}
                  className="absolute -top-4 -right-4 bg-white text-black 
                             rounded-full w-10 h-10 flex items-center 
                             justify-center text-lg z-10"
                >
                  <FaTimes />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}