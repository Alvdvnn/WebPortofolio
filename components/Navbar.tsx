"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// Pastikan install react-icons: npm install react-icons
import { FaBars, FaTimes } from "react-icons/fa"; 

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const lastUpdated = "Nov 15, 2025";

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    { name: "Home", href: "#" }, // Menuju paling atas
    { name: "About", href: "#about" },
    { name: "Learning Path", href: "#learning-path" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-neutral-900/80 backdrop-blur-md border-b border-white/5 py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          
          {/* === KIRI: Status === */}
          <div className="flex items-center gap-2.5 z-50">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
            <span className="text-xs md:text-base text-neutral-200 font-medium">
              Open for Internship
            </span>
          </div>

          {/* === TENGAH: Desktop Menu (Hidden on Mobile) === */}
          <ul className="hidden lg:flex gap-8 text-neutral-300 text-sm font-medium absolute left-1/2 -translate-x-1/2">
            {menuItems.map((item) => (
              <li key={item.name}>
                <a href={item.href} className="hover:text-white transition-colors">
                  {item.name}
                </a>
              </li>
            ))}
          </ul>

          {/* === KANAN: Tanggal / Hamburger Button === */}
          <div className="flex items-center gap-4 z-50">
            <div className="hidden md:block text-xs md:text-base text-neutral-400">
              Last Updated: {lastUpdated}
            </div>
            
            {/* Hamburger Button (Visible on Mobile) */}
            <button 
              onClick={toggleMenu}
              className="lg:hidden text-white text-2xl focus:outline-none"
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </nav>

      {/* === MOBILE MENU OVERLAY === */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-neutral-900 pt-24 px-6 flex flex-col items-center space-y-8 lg:hidden"
          >
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)} // Tutup menu saat diklik
                className="text-2xl font-bold text-white hover:text-orange-400 transition-colors"
              >
                {item.name}
              </a>
            ))}
            <div className="mt-auto mb-10 text-neutral-500 text-sm">
              Last Updated: {lastUpdated}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}