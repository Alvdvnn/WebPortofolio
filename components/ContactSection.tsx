"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="min-h-screen w-full flex items-center justify-center bg-neutral-900 px-6 md:px-20 py-24"
    >
      <div className="max-w-4xl w-full text-center">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl font-bold text-white mb-6"
        >
          Let’s Work Together
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-neutral-300 text-lg md:text-xl leading-relaxed mb-14"
        >
          Have an idea, project, or opportunity in mind?<br />
          I’d love to hear about it.
        </motion.p>

        {/* Contact Cards - Bigger Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* CARD TEMPLATE */}
          {[
            {
              label: "Email",
              href: "mailto:fransiskusdevinalfaro@gmail.com",
              value: "fransiskusdevinalfaro@gmail.com",
            },
            {
              label: "WhatsApp",
              href: "https://wa.me/6285283744288",
              value: "+62 852 8374 4288",
            },
            {
              label: "Instagram",
              href: "https://www.instagram.com/alvdvnn/",
              value: "@alvdvnn",
            },
            {
              label: "GitHub",
              href: "https://github.com/Alvdvnn",
              value: "github.com/Alvdvnn",
            },
          ].map((item) => (
            <motion.div
              key={item.label}
              whileHover={{ scale: 1.05 }}
              className="
                bg-neutral-800/70 
                border border-neutral-700 
                p-6 
                rounded-2xl 
                shadow-lg 
                h-auto 
                min-h-[130px] 
                flex flex-col 
                justify-center
                overflow-hidden
                text-wrap
              "
            >
              <p className="text-sm text-neutral-400 mb-1">{item.label}</p>
              <Link
                href={item.href}
                target="_blank"
                className="text-white font-medium hover:text-orange-400 transition-colors break-words"
              >
                {item.value}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="text-neutral-500 text-sm mt-16"
        >
          © {new Date().getFullYear()} Devin Alvaro. All rights reserved.
        </motion.p>
      </div>
    </section>
  );
}
