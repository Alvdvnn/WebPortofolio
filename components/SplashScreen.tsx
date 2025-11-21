"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

interface SplashScreenProps {
  percentage: number;
  role: string;
}

export default function SplashScreen({ percentage, role }: SplashScreenProps) {
  const isLoadingComplete = percentage === 100;

  // --- PERBAIKAN 1: BODY SCROLL LOCK ---
  // Ini mencegah user men-scroll halaman utama saat splash screen masih aktif.
  useEffect(() => {
    if (!isLoadingComplete) {
      // Kunci scroll body
      document.body.style.overflow = "hidden";
      // Opsional: Fix untuk iOS safari agar tidak bounce
      document.body.style.position = "fixed"; 
      document.body.style.width = "100%";
    } else {
      // Kembalikan scroll seperti semula saat loading selesai
      document.body.style.overflow = "auto";
      document.body.style.position = "static";
    }

    // Cleanup function (jaga-jaga jika component unmount tiba-tiba)
    return () => {
      document.body.style.overflow = "auto";
      document.body.style.position = "static";
    };
  }, [isLoadingComplete]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex h-[100dvh] w-screen flex-col items-center justify-center bg-neutral-900 text-white overflow-hidden touch-none"
    >
      {/* Container Teks Utama */}
      <motion.div
        // --- PERBAIKAN 2: LAYOUT RESPONSIVE ---
        // Mobile: flex-col (Atas Bawah) -> Teks pasti di atas, Role di bawah
        // Desktop: md:flex-row (Kiri Kanan) -> Teks di kiri, Role di kanan
        className="relative flex flex-col md:flex-row items-center justify-center w-full px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        
        {/* Teks "I Am" */}
        {/* Menambahkan padding bawah (pb-2) pada mobile agar tidak nempel dengan role */}
        <div className="text-3xl md:text-4xl font-bold text-neutral-400 whitespace-nowrap pb-2 md:pb-0 md:pr-4 text-center md:text-right">
          I Am
        </div>

        {/* Kotak untuk Role (Animasi) */}
        {/* Menggunakan text-center untuk mobile, dan text-left untuk desktop */}
        <div className="relative h-10 md:h-12 w-full md:w-80 flex justify-center md:justify-start overflow-visible">
          <AnimatePresence mode="wait">
            {!isLoadingComplete ? (
              <motion.span
                key={role}
                initial={{ opacity: 0, y: 15 }} // y: 15 biar muncul dari agak bawah
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                // --- PERBAIKAN 3: ALIGNMENT ---
                // Pastikan text-center di mobile agar pas di tengah layar
                className="absolute inset-0 flex items-center justify-center md:justify-start text-3xl md:text-4xl font-bold text-white whitespace-nowrap"
              >
                {role}
              </motion.span>
            ) : (
              <motion.span
                key="final-empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0"
              >
                &nbsp;
              </motion.span>
            )}
          </AnimatePresence>
        </div>

      </motion.div>

      {/* Wrapper UI Loading (Persentase & Bar) */}
      <AnimatePresence>
        {!isLoadingComplete && (
          <motion.div
            key="loading-ui"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: 20 }} // Exit animation ke bawah sedikit
            transition={{ duration: 0.4, delay: 0.2 }}
            // Menggunakan margin bottom yang aman agar tidak tertutup address bar HP
            className="absolute bottom-12 md:bottom-0 w-full px-8 md:px-0 md:w-full"
          >
            <div className="flex justify-center py-4 text-xl font-medium text-neutral-300">
              {percentage}%
            </div>
            {/* Bar Loading */}
            <div className="h-1 w-full bg-neutral-800 rounded-full overflow-hidden md:rounded-none">
              <motion.div
                className="h-full bg-white"
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 0.1, ease: "linear" }}
              ></motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}