"use client";
import { useState, useEffect } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    // --- PERBAIKAN DI SINI: Tambahkan 'hidden md:block' ---
    // Ini akan menyembunyikan cursor custom di layar sentuh/kecil
    <div className="hidden md:block">
      
      {/* 1. Blob Luar (Flowy) */}
      <div
        className="fixed w-8 h-8 bg-white rounded-full z-50 pointer-events-none mix-blend-difference"
        style={{
          transform: `translate(${position.x - 16}px, ${position.y - 16}px)`,
          transition: 'transform 0.15s ease-out', 
        }}
      />
      
      {/* 2. Titik Dalam (Mengikuti langsung) */}
      <div
        className="fixed w-2 h-2 bg-white rounded-full z-50 pointer-events-none mix-blend-difference"
        style={{
          transform: `translate(${position.x - 4}px, ${position.y - 4}px)`,
        }}
      />
    </div>
  );
}