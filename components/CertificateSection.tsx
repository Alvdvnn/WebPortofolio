"use client";

// --- 1. Impor yang dibutuhkan ---
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FaTimes } from "react-icons/fa";

// --- 2. Tipe Data ---
interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  description: string;
  imageUrl: string;
}

// --- 3. DATA CERTIFICATES ---
const dummyCertificates: Certificate[] = [
  {
    id: 1,
    title: "HCIA-AI V3.5 Course",
    issuer: "Huawei Technologies Co.",
    date: "May 2025",
    description: "Gained a comprehensive understanding of AI fundamentals, including Machine Learning, Deep Learning, and the Huawei Ascend ecosystem using the MindSpore framework.",
    imageUrl: "/Huawei2.png", // Pastikan path ini benar di project Anda
  },
  {
    id: 2,
    title: "HCIA-openGauss V1.0",
    issuer: "Huawei Technologies Co.",
    date: "July 2025",
    description: "Mastered enterprise-level database management focusing on openGauss architecture, security protocols, performance tuning, and operational maintenance best practices.",
    imageUrl: "/Huawei1.png",
  },
  {
    id: 3,
    title: "Introduction to Python",
    issuer: "Sololearn",
    date: "May 2025",
    description: "Established a strong foundation in Python programming, covering core syntax, control flow, functions, and data types for effective problem-solving.",
    imageUrl: "/Python1.png",
  },
  {
    id: 4,
    title: "Intermediate Python",
    issuer: "Sololearn",
    date: "May 2025",
    description: "Advanced proficiency in Python through Object-Oriented Programming (OOP), file handling, exception management, and the implementation of complex data structures.",
    imageUrl: "/Python2.png",
  },
  {
    id: 5,
    title: "Competition on AI",
    issuer: "Mae Fah Luang University",
    date: "August 2025",
    description: "Participated in the Joint International Workshop 2025, developing game prototypes with AI behaviors and collaborating effectively within a cross-cultural team environment.",
    imageUrl: "/Thai.png",
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
            // PERUBAHAN: layoutId dihapus dari container utama kartu
            className="bg-neutral-800 rounded-xl overflow-hidden cursor-pointer group border border-neutral-700 hover:border-neutral-500 transition-colors flex flex-col"
            onClick={() => setSelectedCert(cert)} // Buka modal saat diklik
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* PERUBAHAN: layoutId ditambahkan ke container gambar.
                Ini kunci agar hanya gambar yang teranimasi membesar. */}
            <motion.div
              className="w-full aspect-video bg-neutral-900 relative"
              layoutId={`certificate-image-${cert.id}`}
            >
              <Image
                src={cert.imageUrl}
                alt={cert.title}
                fill
                className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
              />
            </motion.div>

            {/* Info Teks (Tidak ikut masuk modal) */}
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-white leading-tight">{cert.title}</h3>
                <span className="text-xs font-mono text-neutral-500 bg-neutral-900 px-2 py-1 rounded whitespace-nowrap ml-2">
                  {cert.date}
                </span>
              </div>

              <p className="text-sm text-sky-400 font-medium mb-3">{cert.issuer}</p>

              <p className="text-sm text-neutral-400 leading-relaxed line-clamp-3">
                {cert.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* --- 6. MODAL / LIGHTBOX IMAGE ONLY --- */}
      <AnimatePresence>
        {selectedCert && (
          <>
            {/* Backdrop Gelap */}
            <motion.div
              className="fixed inset-0 bg-black/90 z-50 backdrop-blur-sm"
              onClick={() => setSelectedCert(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Konten Modal */}
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              {/* PERUBAHAN: Container ini sekarang hanya menampung gambar.
                  layoutId harus sama dengan yang ada di kartu thumbnail. */}
              <motion.div
                className="relative w-full max-w-5xl h-[85vh] pointer-events-auto"
                layoutId={`certificate-image-${selectedCert.id}`}
              >
                {/* Gambar Besar */}
                <Image
                  src={selectedCert.imageUrl}
                  alt={selectedCert.title}
                  fill
                  className="object-contain" // Pastikan gambar utuh tidak terpotong
                  priority // Muat prioritas karena ini gambar utama di modal
                />

                {/* Tombol Close 'X' */}
                <button
                  onClick={() => setSelectedCert(null)}
                  className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white
                             rounded-full w-10 h-10 flex items-center
                             justify-center text-lg backdrop-blur-md transition-colors z-20"
                >
                  <FaTimes />
                </button>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}