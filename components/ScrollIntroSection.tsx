"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ScrollIntroSection() {
  const targetRef = useRef<HTMLDivElement>(null);

  // 1. 'h-[300vh]' (3x tinggi layar)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // 2. Transformasi untuk "Wadah" Zoomer
  // A. Scale (tetap 1.5x)
  const scale = useTransform(
    scrollYProgress, 
    [0, 1], 
    [0.5, 1.5] 
  );

  // B. Blur: Mulai dari blur(10px) menjadi blur(0px)
  const filter = useTransform(
    scrollYProgress,
    [0, 0.5], 
    ["blur(10px)", "blur(0px)"] 
  );

  // C. Opacity "Wadah": Fade in di awal, fade out di akhir
  const wadahOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1], 
    [0, 1, 1, 0] 
  );

  // 3. Transformasi untuk Opacity Teks (Bergantian)
  const text1Opacity = useTransform(
    scrollYProgress,
    [0.1, 0.2, 0.3, 0.4],
    [0, 1, 1, 0]
  );

  const text2Opacity = useTransform(
    scrollYProgress,
    [0.4, 0.5, 0.6, 0.7],
    [0, 1, 1, 0]
  );

  const text3Opacity = useTransform(
    scrollYProgress,
    [0.7, 0.8, 1],
    [0, 1, 1]
  );

  // 4. Transformasi Rotasi
  const rotation = useTransform(
    scrollYProgress,
    [0, 1], 
    [0, 360] 
  );

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-neutral-900">
      
      {/* 'jendela' sticky yang menempel di layar */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* "Wadah" Zoomer */}
        <motion.div 
          className="relative w-auto h-auto flex items-center justify-center"
          style={{ 
            scale, 
            filter,
            opacity: wadahOpacity,
          }}
        >
          
          {/* Lingkaran Berputar (Responsif) */}
          <motion.div
            // Mobile: w-64 (kecil), Desktop: w-[600px] (besar)
            className="absolute w-64 h-64 md:w-[600px] md:h-[600px] border-4 border-dashed border-neutral-600 rounded-full"
            style={{
              rotate: rotation, 
            }}
          />

          {/* Teks ditumpuk di sini (Responsif Font Size) */}
          {/* Mobile: text-4xl, Tablet: text-6xl, Desktop: text-8xl */}
          <motion.h1 
            style={{ opacity: text1Opacity }} 
            className="absolute whitespace-nowrap text-4xl md:text-6xl lg:text-8xl font-bold text-white text-center"
          >
            WELCOME
          </motion.h1>

          <motion.h1 
            style={{ opacity: text2Opacity }} 
            className="absolute whitespace-nowrap text-4xl md:text-6xl lg:text-8xl font-bold text-white text-center"
          >
            TO MY
          </motion.h1>

          <motion.h1 
            style={{ opacity: text3Opacity }} 
            className="absolute whitespace-nowrap text-4xl md:text-6xl lg:text-8xl font-bold text-white text-center"
          >
            PORTFOLIO
          </motion.h1>

        </motion.div>

      </div>
    </section>
  );
}