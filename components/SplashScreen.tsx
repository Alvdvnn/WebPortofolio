"use client";

import { motion, AnimatePresence } from "framer-motion";

interface SplashScreenProps {
  percentage: number;
  role: string;
}

export default function SplashScreen({ percentage, role }: SplashScreenProps) {
  const isLoadingComplete = percentage === 100;

  return (
    <div className="fixed inset-0 z-50 flex h-screen flex-col items-center justify-center bg-neutral-900 text-white overflow-hidden">
      
      {/* 1. Teks "I Am [Role]" atau "I Am " */}
      <motion.div
        className="flex w-full items-center justify-center px-4 translate-x-12"
        initial={{ opacity: 0 }} // Mulai transparan
        animate={{ opacity: 1 }} // Fade in
        transition={{ duration: 0.5, delay: 0.2 }} // Delay 0.2s
      >
        <div className="flex items-center text-2xl font-bold md:text-3xl">
          
          {/* "I Am" span */}
          <span className="text-neutral-400">
            I Am&nbsp;
          </span>

          {/* Kotak untuk role/name */}
          <div className="relative h-12 w-80">
            <AnimatePresence mode="wait">
              {!isLoadingComplete ? (
                // 4. TAMPILAN SAAT LOADING (0-99%)
                <motion.span
                  key={role}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }} 
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex items-center justify-start text-white"
                >
                  {role}
                </motion.span>
              ) : (
                // 5. TAMPILAN FINAL SAAT 100% (REVEAL)
                <motion.span
                  key="final-name"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="absolute inset-0 flex items-center justify-start text-white"
                >
                  {/* Teks "Devin Alvaro" dihapus dari sini.
                      Kita beri non-breaking space (&nbsp;) agar 
                      layout tetap stabil.
                  */}
                  &nbsp;
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* 2. Wrapper UI Loading (Persentase & Bar) */}
      <AnimatePresence>
        {!isLoadingComplete && (
          <motion.div
            key="loading-ui"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.8 }} 
            className="absolute bottom-0 w-full"
          >
            <div className="flex justify-center py-4 text-xl font-medium text-neutral-300">
              {percentage}%
            </div>
            <div className="h-1 w-full bg-neutral-700">
              <motion.div
                className="h-full bg-white"
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 0.1 }}
              ></motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}