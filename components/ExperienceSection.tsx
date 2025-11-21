"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// --- DATA LEARNING PATH ---
const learningPath = [
  { 
    phase: "The Foundation", 
    stack: "HTML, CSS, & JavaScript Basic", 
    year: "2021" 
  },
  { 
    phase: "Modern Styling & Responsive", 
    stack: "Tailwind CSS & Bootstrap", 
    year: "Early 2022" 
  },
  { 
    phase: "JavaScript Mastery", 
    stack: "ES6+, DOM Manipulation, Fetch API", 
    year: "Mid 2022" 
  },
  { 
    phase: "Entering React Ecosystem", 
    stack: "React.js, Hooks, Redux", 
    year: "Late 2022" 
  },
  { 
    phase: "Fullstack Framework", 
    stack: "Next.js 13/14 (App Router)", 
    year: "2023" 
  },
  { 
    phase: "Type Safety & Scalability", 
    stack: "TypeScript & Zod", 
    year: "2024" 
  },
  { 
    phase: "Motion & Interactive UI", 
    stack: "Framer Motion, Three.js, GSAP", 
    year: "2025 - Present" 
  },
];

// --- COMPONENT DOT (Titik) ---
function MilestoneDot({ y }: { y: number }) {
  return (
    <div
      // Mobile: left-8 (32px), Desktop: left-1/2 (Center)
      className="absolute w-3 h-3 bg-neutral-400 rounded-full border-4 border-neutral-900 z-10 left-8 md:left-1/2 -translate-x-1/2 transition-all duration-500"
      style={{ top: `${y}px` }}
    />
  );
}

// --- COMPONENT CARD (Kotak Konten) ---
function LearningBox({
  item,
  index,
  cardOpacity,
}: {
  item: typeof learningPath[0];
  index: number;
  cardOpacity: any;
}) {
  const isRight = index % 2 === 1;

  // LOGIKA POSISI:
  // Mobile: Semua kartu di 'left-20' (sebelah kanan garis).
  // Desktop: Gunakan class ternary untuk zig-zag (kiri/kanan tengah).
  const desktopPositionClass = isRight 
    ? "md:left-1/2 md:ml-12 md:right-auto" // Kanan Tengah
    : "md:right-1/2 md:mr-12 md:left-auto"; // Kiri Tengah

  return (
    <motion.div
      className={`absolute p-6 bg-neutral-800/80 backdrop-blur-sm rounded-xl border border-neutral-700 shadow-xl z-10
        w-[calc(100%-80px)] left-20 right-auto 
        md:w-80 ${desktopPositionClass} transition-all duration-500`}
      style={{
        top: `${index * 150}px`, // Sedikit diperlebar jarak vertikalnya
        opacity: cardOpacity,
      }}
    >
      {/* Judul Fase Belajar */}
      <h3 className="text-lg md:text-xl font-bold text-white mb-1">{item.phase}</h3>
      
      {/* Tech Stack */}
      <p className="text-orange-400 font-semibold text-sm tracking-wide">
        {item.stack}
      </p>
      
      {/* Tahun */}
      <p className="text-neutral-500 text-xs mt-3 font-mono border-t border-neutral-700 pt-2 inline-block">
        {item.year}
      </p>
    </motion.div>
  );
}

// --- MAIN COMPONENT ---
export default function ExperienceSection() {
  const targetRef = useRef<HTMLDivElement>(null);

  // Menambah jarak vertical sedikit agar tidak terlalu padat di mobile
  const itemHeight = 150; 
  const totalHeight = learningPath.length * itemHeight + 200;

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start center", "end center"], 
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const cardOpacity = learningPath.map((_, i) => {
    const start = i * (1 / learningPath.length);
    const end = start + (1 / learningPath.length);
    return useTransform(scrollYProgress, [start, end], [0.2, 1]);
  });

  return (
    <section id="learning-path" className="relative container mx-auto py-20 px-4 md:px-6 overflow-hidden">

      {/* TITLE */}
      <div className="text-center mb-20">
        <h1 className="text-4xl md:text-7xl font-bold text-white">
          LEARNING PATH
        </h1>
        <p className="text-neutral-400 mt-4 text-sm md:text-lg">
          My journey of mastering technologies over time.
        </p>
      </div>

      {/* TIMELINE CONTAINER */}
      <div 
        ref={targetRef} 
        className="relative mx-auto max-w-5xl"
        style={{ height: `${totalHeight}px` }}
      >
        
        {/* GARIS TIMELINE (SVG) */}
        {/* Perubahan: Menggunakan Absolute Div/SVG sederhana tanpa viewBox besar agar konsisten */}
        <div className="absolute top-0 bottom-0 w-1 bg-neutral-800 left-8 md:left-1/2 md:-translate-x-1/2">
            <motion.div 
                className="w-full bg-white origin-top"
                style={{ scaleY: pathLength, height: "100%" }}
            />
        </div>

        {/* DOTS */}
        {learningPath.map((_, i) => (
          <MilestoneDot key={i} y={i * itemHeight} />
        ))}

        {/* CARDS */}
        {learningPath.map((item, index) => (
          <LearningBox
            key={index}
            item={item}
            index={index}
            cardOpacity={cardOpacity[index]}
          />
        ))}

      </div>

    </section>
  );
}