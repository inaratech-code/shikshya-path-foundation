'use client';

import { motion } from 'framer-motion';

export default function InnerPageHero({ title, description }: { title: string, description: string }) {
  return (
    <section className="relative pt-32 pb-20 bg-slate-900 overflow-hidden text-center text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-dark)] to-slate-900 opacity-90 z-0" />
      <div className="absolute top-0 right-[-10%] w-96 h-96 bg-[var(--color-primary)]/30 blur-[100px] rounded-full z-0" />
      <div className="absolute bottom-[-20%] left-[-10%] w-96 h-96 bg-indigo-500/30 blur-[100px] rounded-full z-0" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <motion.h1 
          className="text-4xl md:text-6xl font-black mb-6 tracking-tight font-heading"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {title}
        </motion.h1>
        <motion.p 
          className="text-lg md:text-xl text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        >
          {description}
        </motion.p>
      </div>
    </section>
  );
}
