"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";

// =========================================
// 1. DATA
// =========================================

const mySkills = [
  { name: "React", level: 90 },
  { name: "Next.js", level: 85 },
  { name: "TypeScript", level: 75 },
  { name: "Framer Motion", level: 80 },
  { name: "Tailwind CSS", level: 95 },
  { name: "Node.js", level: 60 },
  { name: "Unity & C#", level: 50 },
];

const paragraphs = [
  "I’m a Frontend Developer who believes that websites should feel alive, not just functional. My passion lies in bridging the gap between engineering and design, crafting interfaces that are seamless, interactive, and visually stunning.",
  "Specializing in React, Next.js, and Motion Design, I obsess over micro-interactions and performance. For me, the magic is in the details—thoughtful spacing, fluid transitions, and code that performs as beautifully as it looks.",
  "Beyond the code, I am a storyteller and active learner. I love exploring UI/UX trends and pushing the boundaries of what modern web technologies can achieve.",
  "Let's turn complex ideas into effortless digital experiences. I am always open to building something extraordinary together.",
];

// =========================================
// 2. SUB-KOMPONEN
// =========================================

interface WordProps {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}

function Word({ children, progress, range }: WordProps) {
  const color = useTransform(progress, range, ["#333333", "#ffffff"]);
  const opacity = useTransform(progress, range, [0.3, 1]);

  return (
    <motion.span
      style={{ color, opacity }}
      className="inline-block mr-2 transition-colors duration-200"
    >
      {children}
    </motion.span>
  );
}

function SkillBar({ name, level, index }: { name: string; level: number; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="w-full"
    >
      <div className="flex justify-between items-end mb-2">
        <span className="text-lg font-medium text-neutral-200 tracking-wide">
          {name}
        </span>
        <span className="text-sm font-bold text-neutral-400">
          {level}%
        </span>
      </div>
      <div className="relative w-full h-2 bg-neutral-800/50 rounded-full overflow-hidden border border-neutral-700/50">
        <motion.div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-neutral-500 via-white to-white rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 + 0.2 }}
        >
          <motion.div 
            className="absolute top-0 bottom-0 right-0 w-10 bg-gradient-to-r from-transparent to-white opacity-50 blur-md"
            initial={{ x: -10 }}
            whileInView={{ x: 500 }} 
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, ease: "linear" }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

// =========================================
// 3. KOMPONEN UTAMA
// =========================================

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const allWords = paragraphs.join(" ").split(" ");
  const totalWordsCount = allWords.length;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.5"],
  });

  let globalWordIndex = 0;

  return (
    <section
      id="about"
      className="relative min-h-screen container mx-auto py-24 px-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 items-start">
        
        {/* === BAGIAN KIRI: FOTO PROFIL === */}
        {/* PERBAIKAN: Gunakan 'relative' di mobile, 'sticky' hanya di md: ke atas */}
        <div className="md:col-span-1 relative md:sticky md:top-32 md:pl-12">
          <div className="group relative w-full aspect-[3/4] bg-neutral-800 rounded-lg border border-neutral-700 overflow-hidden shadow-2xl">
            <Image
              src="/GeminiHitam.png"
              fill
              alt="Foto Devin Alvaro"
              className="object-cover transition-opacity duration-500 group-hover:opacity-0"
            />
            <Image
              src="/GeminiWarna.png"
              fill
              alt="Foto Devin Alvaro Warna"
              className="object-cover absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          </div>
        </div>

        {/* === BAGIAN KANAN: TEXT & SKILLS === */}
        <div className="md:col-span-2">
          
          <h2 className="text-5xl font-bold mb-16 text-white">About Me</h2>
          
          <div ref={containerRef} className="space-y-10 mb-32">
            {paragraphs.map((para, pIndex) => {
              const words = para.split(" ");
              return (
                <p
                  key={pIndex}
                  className="text-2xl md:text-3xl leading-relaxed font-medium flex flex-wrap"
                >
                  {words.map((word, wIndex) => {
                    const currentIndex = globalWordIndex;
                    globalWordIndex++; 
                    const start = currentIndex / totalWordsCount;
                    const end = start + (1 / totalWordsCount);
                    return (
                      <Word 
                        key={`${pIndex}-${wIndex}`} 
                        progress={scrollYProgress} 
                        range={[start, end]}
                      >
                        {word}
                      </Word>
                    );
                  })}
                </p>
              );
            })}
          </div>

          {/* SKILLS SECTION */}
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-5xl font-bold mb-12 text-white"
            >
              My Skills
            </motion.h2>
            
            <div className="w-full space-y-8">
              {mySkills.map((skill, index) => (
                <SkillBar 
                  key={skill.name} 
                  name={skill.name} 
                  level={skill.level} 
                  index={index} 
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}