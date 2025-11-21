"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Import components
import SplashScreen from "./SplashScreen";
import MarqueeHero from "./MarqueeHero";
import ScrollIntroSection from "./ScrollIntroSection";
import AboutSection from "./AboutSection";
import ExperienceSection from "./ExperienceSection";
import ProjectsSection from "./ProjectsSection";
// --- 1. Impor 'CertificateSection' ---
import CertificateSection from "./CertificateSection";
import ContactSection from "./ContactSection";

const ROLES = [
  "Front-End Developer",
  "UI/UX Designer",
  "Solving Problems",
  "Building a Dream",
];

export default function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [percentage, setPercentage] = useState(0);
  const [roleIndex, setRoleIndex] = useState(0);

  // useEffect (Tidak berubah)
  useEffect(() => {
    let loadingInterval: NodeJS.Timeout;
    let roleInterval: NodeJS.Timeout;
    loadingInterval = setInterval(() => {
      setPercentage((prev) => {
        if (prev >= 100) {
          clearInterval(loadingInterval);
          clearInterval(roleInterval);
          setTimeout(() => setLoading(false), 1500);
          return 100;
        }
        return prev + 1;
      });
    }, 50);
    roleInterval = setInterval(() => {
      setRoleIndex((prevIndex) => (prevIndex + 1) % ROLES.length);
    }, 1200);
    return () => {
      clearInterval(loadingInterval);
      clearInterval(roleInterval);
    };
  }, []);

  return (
    <div className="bg-neutral-900 text-white min-h-screen">
      {/* Splash Screen (Tidak berubah) */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="splash-screen"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SplashScreen
              percentage={percentage}
              role={ROLES[roleIndex]}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 2.0 }}
      >
        <MarqueeHero />
        <ScrollIntroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />

        {/* --- 2. 'CertificateSection' ditambahkan di sini --- */}
        <CertificateSection />
        
        <ContactSection />
      </motion.div>
    </div>
  );
}