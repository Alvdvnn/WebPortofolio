"use client";
// Hapus 'AnimatePresence' dari impor
import { motion, useAnimation } from "framer-motion";
import React, { useEffect, useState } from "react";

// Komponen helper untuk teks outline (Tidak berubah)
const OutlineText = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <span
      className={`font-bold uppercase text-transparent ${className}`}
      style={{
        WebkitTextStroke: '1px white',
        stroke: '1px white',
        paintOrder: 'stroke fill',
      }}
    >
      {children}
    </span>
  );
};

// Daftar item untuk marquee (Tidak berubah)
const marquee1Items = [
  "SOFTWARE ENGINEERING",
  "UI/UX DEVELOPER",
  "DEVOPS",
  "CLOUD ARCHITECT",
];
const marquee3Items = [
  "FULLSTACK DEVELOPER",
  "WEB DEVELOPER",
  "CREATIVE CODER",
  "DATA SCIENTIST",
];

// MarqueeText (Tidak berubah)
const MarqueeText = ({ items, className, keyPrefix }: { items: string[], className?: string, keyPrefix: string }) => (
  <>
    {items.map((text, i) => (
      <React.Fragment key={`${keyPrefix}-${i}`}>
        <OutlineText className={className}>{text}</OutlineText>
        <span
          className={`
            font-bold text-white
            text-3xl md:text-4xl lg:text-5xl xl:text-6xl
            mx-2 md:mx-3 lg:mx-4
          `}
        >
          ●
        </span>
      </React.Fragment>
    ))}
  </>
);

// --- VARIAN STAGGER LAMA DIHAPUS ---

export default function MarqueeHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const textToType = "Devin Alvaro";
  
  // --- REVISI 1: State baru untuk 'typedText' ---
  const [typedText, setTypedText] = useState("");
  // 'isTextVisible' dihapus
  const cursorControls = useAnimation();

  // --- REVISI 2: Logika 'useEffect' dirombak total ---
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Durasi (dalam milidetik)
    const typingSpeedMs = 120; // Kecepatan mengetik
    const deleteSpeedMs = 60; // Kecepatan menghapus
    const visiblePauseMs = 2000; // Jeda saat teks penuh
    const hiddenPauseMs = 1000; // Jeda saat teks kosong

    const sequence = async () => {
      // Mulai kursor berkedip (dan biarkan berkedip selamanya)
      cursorControls.start({
        opacity: [0, 1, 1, 0],
        transition: {
          duration: 0.8,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
        },
      });

      while (true) {
        // Jeda sebentar sebelum mulai mengetik
        await new Promise((resolve) => setTimeout(resolve, hiddenPauseMs));

        // 1. Mulai mengetik
        for (let i = 0; i <= textToType.length; i++) {
          setTypedText(textToType.substring(0, i));
          await new Promise((resolve) => setTimeout(resolve, typingSpeedMs));
        }

        // 2. Jeda setelah selesai mengetik
        await new Promise((resolve) => setTimeout(resolve, visiblePauseMs));

        // 3. Mulai menghapus
        for (let i = textToType.length; i >= 0; i--) {
          setTypedText(textToType.substring(0, i));
          await new Promise((resolve) => setTimeout(resolve, deleteSpeedMs));
        }

        // 4. Ulangi (kursor tetap berkedip)
      }
    };

    sequence();
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [cursorControls, textToType]); // Tambahkan dependensi

  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center bg-neutral-900 overflow-hidden">
      {/* Efek Cahaya Blur Interaktif (Tidak berubah) */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.1) 0%, transparent 30%)`,
          transition: 'background 0.1s ease-out',
        }}
      ></div>

      <div className="relative z-10 flex flex-col items-center justify-center -mt-16 w-full">

        {/* Baris 1 (Tidak berubah) */}
        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex shrink-0 items-center w-max whitespace-nowrap"
            animate={{ x: ['-50%', '0%'] }}
            transition={{ duration: 90, ease: "linear", repeat: Infinity }}
          >
            <MarqueeText items={marquee1Items} className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl" keyPrefix="baris1-orig" />
            <MarqueeText items={marquee1Items} className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl" keyPrefix="baris1-dup" />
          </motion.div>
        </div>

        {/* --- REVISI 3: Container typing disederhanakan --- */}
        <div className="relative my-14 h-20 md:h-24 lg:h-28 flex justify-center items-center w-full">
          
          <h1
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white flex justify-center items-center whitespace-nowrap"
          >
            {/* Tampilkan teks yang sedang diketik */}
            <span>{typedText}</span>
            
            {/* Kursor SEKARANG ADA DI DALAM H1 */}
            <motion.span
              // w-0.5 tidak berfungsi baik dengan 'h-full' di flex
              className="bg-white" 
              style={{
                width: '2px', // Lebar kursor
                height: '1em', // Tinggi kursor (mengikuti tinggi font)
                marginLeft: '0.15em', // Jarak dari teks
                marginTop: '0.1em' // Penyesuaian vertikal
              }}
              initial={{ opacity: 0 }}
              animate={cursorControls}
            ></motion.span>
          </h1>
          
          {/* 'AnimatePresence' dan 'motion.h1' lama dihapus */}
          {/* Kursor 'absolute' lama dihapus */}

        </div>

        {/* Baris 3 (Tidak berubah) */}
        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex shrink-0 items-center w-max whitespace-nowrap"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 90, ease: "linear", repeat: Infinity }}
          >
            <MarqueeText items={marquee3Items} className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl" keyPrefix="baris3-orig" />
            <MarqueeText items={marquee3Items} className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl" keyPrefix="baris3-dup" />
          </motion.div>
        </div>

      </div>

      {/* Indikator Scroll Down (Tidak berubah) */}
      <a 
        href="#about"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 cursor-pointer flex items-center gap-5 text-white font-medium text-base"
        aria-label="Scroll to about section"
      >
        <span>Scroll</span>
        <div className="w-5 h-8 border-2 border-white rounded-full flex justify-center items-start pt-1.5 overflow-hidden">
          <motion.div 
            className="w-1 h-2 bg-white rounded-full"
            animate={{ y: [0, 8, 0] }}
            transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
            }}
          />
        </div>
        <span>Down</span>
      </a>
    </section>
  );
}