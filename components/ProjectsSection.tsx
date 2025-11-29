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
    title: "Tanda Seru! - Hangout Finder",
    description:
      "A mobile-first discovery platform tailored for Gen-Z to find the perfect hangout spots. Features personalized filtering by ambience, budget, and vibes within a clean, intuitive interface.",
    imageUrl: "/Tanda Seru.jpg", 
    tags: ["UI/UX Design", "Figma", "Mobile App", "Prototyping"],
    liveUrl: "https://www.figma.com/proto/KSx1oF6MaIA0siGI0boriF/Tanda-Seru-?node-id=776-5220&starting-point-node-id=776%3A5220&t=iitCfSEsXzvc6Sdp-1", 
    githubUrl: "https://www.figma.com/design/KSx1oF6MaIA0siGI0boriF/Tanda-Seru-?node-id=13-123&t=a8g3jYQybZmaT6jO-1", 
    type: "informatics",
  },
  {
    title: "DANG - Reservation Platform",
    description:
      "A high-fidelity web platform designed to streamline reservations for local SMEs. Prioritizes optimized booking workflows, clear visual hierarchy, and accessibility to connect users with business owners effortlessly.",
    imageUrl: "/DANG.jpg",
    tags: ["UI/UX Design", "Figma", "Wireframing", "Accessibility"],
    liveUrl: "https://www.figma.com/proto/QDEPwhkvfJU6MDpLK5Onyd/D.A.N.G?node-id=355-616&starting-point-node-id=355%3A616&scaling=scale-down&content-scaling=fixed&t=PqNbaL2kmWP1pwbq-1",
    githubUrl: "https://www.figma.com/design/QDEPwhkvfJU6MDpLK5Onyd/D.A.N.G?node-id=0-1&t=Ym9HJruLyHvmDEHy-1",
    type: "informatics",
  },
  {
    title: "Galley-la Halls",
    description:
      "A surreal 3D anomaly exploration game set within a distorted art museum. Built in Unity, this atmospheric experience challenges players to identify subtle anomalies amidst shifting hallways and uncanny lighting effects.",
    imageUrl: "/GameDev.jfif",
    tags: ["Game Dev", "Unity", "C#", "3D Level Design"],
    liveUrl: "https://drive.google.com/file/d/1-pPK1i3Dyo_IZeOhpORP654TRpb_Sgyv/view",
    githubUrl: "#", // Link ke Repo Game
    type: "informatics",
  },
  {
    title: "Tuku! - Coffee Ordering App",
    description:
      "A native Android application designed to digitize the coffee shop experience. Features real-time order tracking, seamless menu browsing, and an optimized queue management system built with Kotlin and Firebase.",
    imageUrl: "/TUKU.jfif",
    tags: ["Android Dev", "Kotlin", "Firebase", "MVVM"],
    liveUrl: "#",
    githubUrl: "https://github.com/shavellegau/map_umkm",
    type: "informatics",
  },
  {
    title: "Aloha Guest House",
    description:
      "A dynamic boarding house management platform built with Laravel. Provides prospective tenants with a seamless interface to browse room availability and facilities, while empowering owners with a robust backend for data management.",
    imageUrl: "/Aloha.jfif",
    tags: ["Fullstack Web", "Laravel", "PHP", "Tailwind CSS"],
    liveUrl: "https://www.figma.com/design/UdFZkrCnTgPPd4XSB5Pq9U/webprog-project?node-id=1-4&p=f&t=UotG1GXGbehzkrqZ-0",
    githubUrl: "https://github.com/rascalosh/uaswebprog",
    type: "informatics",
  },
  {
    title: "Explore West Kalimantan",
    description:
      "A cultural tourism website dedicated to promoting the hidden gems of West Kalimantan. This digital guide offers curated insights into iconic tourist destinations and authentic traditional cuisine, wrapped in an engaging and responsive visual experience.",
    imageUrl: "/KalimantanBarat.jpg",
    tags: ["Web Design", "Content Strategy", "HTML/CSS", "Responsive UI"],
    liveUrl: "https://indahnyakalimantanbarat.vercel.app/",
    githubUrl: "#", // Link Repo
    type: "informatics",
  },
  {
    title: "Starlight UMN (Accommodation)",
    description:
      "Managed end-to-end logistics for UMN's largest annual talent show. Served as the primary liaison for 12 guest performers and coordinated equipment inventory across 7 divisions to ensure a seamless 1,500+ attendee event.",
    imageUrl: "/Starlight.jpg",
    tags: ["Logistics", "Guest Relation", "Problem Solving"],
    liveUrl: "https://www.linkedin.com/company/starlightumn/",
    githubUrl: "https://www.instagram.com/p/C2hQPP-PA4s/",
    type: "organization",
  },
  {
    title: "Euforia UMN (Security)",
    description:
      "Maintained security and order for a major business event with 2,000+ attendees. Implemented crowd-control strategies, executed de-escalation protocols for conflict resolution, and coordinated rapid emergency responses.",
    imageUrl: "/Euforia.jpg",
    tags: ["Security", "Crowd Control", "Risk Management"],
    liveUrl: "https://www.linkedin.com/company/euforia-umn/", 
    githubUrl: "https://www.instagram.com/p/DC0sOSdzL65/", 
    type: "organization",
  },
  {
    title: "UMN Festival (Accommodation)",
    description:
      "Oversaw logistics and technical riders for 18 VVIPs across 3 main festival events. Successfully managed asset distribution across 5 campus locations and ensured budget adherence through efficient resource planning.",
    imageUrl: "/UFest.jpg", // Ganti foto kegiatan UMN Festival
    tags: ["VVIP Handling", "Budgeting", "Operations"],
    liveUrl: "https://www.linkedin.com/company/umn-festival-sparta/", 
    githubUrl: "https://www.instagram.com/p/DEv9qc3ytQc/", 
    type: "organization",
  },
  {
    title: "Campus Visit UMN (PIC)",
    description:
      "Led professional campus tours and presentations for visiting institutions. Acted as the primary face of the university, personalizing visitor experiences and coordinating with internal faculties to showcase academic life.",
    imageUrl: "/Camvis.jpg", 
    tags: ["Public Speaking", "Leadership", "Coordination"],
    liveUrl: "https://www.linkedin.com/company/campus-visit-umn/", 
    githubUrl: "https://www.instagram.com/p/DFPQ0PCsUXr/", 
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