"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface Project {
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  type: "informatics" | "organization";
}

const allProjects: Project[] = [
  {
    title: "Satu.In - Money Tracker",
    description:
      "A mobile application for automatically tracking expenses...",
    imageUrl: "/GeminiWarna.pn",
    tags: ["Mobile App", "Fintech", "React Native", "Qris API"],
    liveUrl: "#",
    githubUrl: "#",
    type: "informatics",
  },
  {
    title: "MAP UMKM",
    description:
      "A web application designed to map and showcase local SMEs...",
    imageUrl: "/GeminiHitam.pn",
    tags: ["Web App", "Next.js", "Tailwind CSS", "Maps API"],
    liveUrl: "#",
    githubUrl: "#",
    type: "informatics",
  },
  {
    title: "Anomaly Game (Unity)",
    description:
      "A horror/puzzle game inspired by 'Exit 8', built in Unity...",
    imageUrl: "/GeminiWarna.pn",
    tags: ["Game Dev", "Unity 6", "C#", "3D Modeling"],
    liveUrl: "#",
    githubUrl: "#",
    type: "informatics",
  },
  {
    title: "Ketua Divisi - Himpunan Mahasiswa",
    description:
      "Memimpin divisi Humas, bertanggung jawab atas komunikasi ...",
    imageUrl: "/GeminiHitam.pn",
    tags: ["Leadership", "Event Management", "Public Speaking"],
    liveUrl: "#",
    githubUrl: "#",
    type: "organization",
  },
  {
    title: "Asisten Laboratorium - Lab Jaringan",
    description:
      "Membimbing praktikan dalam konfigurasi jaringan...",
    imageUrl: "/GeminiWarna.pn",
    tags: ["Teaching", "Networking", "Server Admin", "Cisco"],
    liveUrl: "#",
    githubUrl: "#",
    type: "organization",
  },
];

// =======================
// CARD
// =======================
function ProjectCard({
  project,
  progress,
  range,
}: {
  project: Project;
  progress: MotionValue<number>;
  range: [number, number, number, number];
}) {
  const scale = useTransform(progress, range, [0.9, 1, 1, 0.9]);
  const opacity = useTransform(progress, range, [0.5, 1, 1, 0.5]);

  return (
    <motion.div
      style={{ scale, opacity }}
      // Responsive Padding: p-4 di Mobile, p-10 di Desktop
      className="w-screen h-[85vh] flex items-center justify-center p-4 md:p-10"
    >
      {/* Responsive Layout: Flex-Col di Mobile, Flex-Row di Desktop */}
      <div className="w-full max-w-5xl h-full bg-neutral-800/60 border border-neutral-700 rounded-2xl p-4 md:p-8 flex flex-col md:flex-row gap-6 md:gap-10 shadow-xl overflow-hidden">
        
        {/* Gambar */}
        <div className="w-full md:w-1/2 h-48 md:h-full rounded-xl overflow-hidden bg-neutral-900 shrink-0">
          <Image
            src={project.imageUrl}
            alt={project.title}
            width={800}
            height={800}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Konten Teks (Scrollable jika overflow di HP) */}
        <div className="w-full md:w-1/2 flex flex-col justify-center overflow-y-auto">
          <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4 text-white">{project.title}</h2>

          <p className="text-neutral-300 text-sm md:text-lg mb-4 md:mb-6">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="bg-sky-900/50 text-sky-300 text-[10px] md:text-xs px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex gap-3 md:gap-4 mt-auto pb-2">
            <Link
              href={project.liveUrl}
              target="_blank"
              className="bg-white text-black text-sm md:text-base font-medium px-4 py-2 md:px-6 md:py-2 rounded-lg"
            >
              Live Demo
            </Link>
            <Link
              href={project.githubUrl}
              target="_blank"
              className="border border-neutral-400 text-neutral-300 text-sm md:text-base px-4 py-2 md:px-6 md:py-2 rounded-lg"
            >
              GitHub
            </Link>
          </div>
        </div>

      </div>
    </motion.div>
  );
}

// =======================
// HORIZONTAL SCROLL TRACK
// =======================
function HorizontalScrollTrack({ projects }: { projects: Project[] }) {
  const ref = useRef<HTMLDivElement>(null);

  const num = projects.length;
  const sectionHeight = `${num * 85}vh`;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${100 * (num - 1)}vw`]
  );

  return (
    <motion.section
      ref={ref}
      className="relative bg-neutral-900 pt-10"
      style={{ height: sectionHeight }}
    >
      {/* Sticky track */}
      <div
        className="sticky h-[85vh] w-full flex items-center overflow-hidden"
        style={{ top: "7rem" }} // 70px = tinggi navbar + header safe space
      >
        <motion.div
          className="flex"
          style={{ width: `${num * 100}vw`, x }}
        >
          {projects.map((p, i) => {
            const start = i / num;
            const end = (i + 1) / num;
            const m = (end - start) * 0.1;
            return (
              <ProjectCard
                key={p.title}
                project={p}
                progress={scrollYProgress}
                range={[start, start + m, end - m, end]}
              />
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}

// =======================
// MAIN SECTION
// =======================
export default function ProjectsSection() {
  const [active, setActive] = useState<"informatics" | "organization">(
    "informatics"
  );

  const inf = allProjects.filter((p) => p.type === "informatics");
  const org = allProjects.filter((p) => p.type === "organization");

  return (
    <section id="projects" className="bg-neutral-900 min-h-screen">
      
      {/* HEADER (STATIC, TIDAK STICKY) */}
      <div className="pt-20 md:pt-32 pb-10 px-4"> 
        <h1 className="text-center text-4xl md:text-7xl font-bold text-white">
          PROJECTS
        </h1>

        {/* Tabs */}
        <div className="flex justify-center gap-2 md:gap-4 mt-6">
          <button
            onClick={() => setActive("informatics")}
            className={`px-4 py-2 md:px-5 md:py-2 rounded-lg text-sm md:text-lg transition ${
              active === "informatics"
                ? "bg-white text-black"
                : "bg-neutral-800 text-neutral-400"
            }`}
          >
            Informatics
          </button>

          <button
            onClick={() => setActive("organization")}
            className={`px-4 py-2 md:px-5 md:py-2 rounded-lg text-sm md:text-lg transition ${
              active === "organization"
                ? "bg-white text-black"
                : "bg-neutral-800 text-neutral-400"
            }`}
          >
            Organization
          </button>
        </div>
      </div>

      {/* HORIZONTAL TRACK */}
      <AnimatePresence mode="wait">
        {active === "informatics" ? (
          <HorizontalScrollTrack key="inf" projects={inf} />
        ) : (
          <HorizontalScrollTrack key="org" projects={org} />
        )}
      </AnimatePresence>

    </section>
  );
}