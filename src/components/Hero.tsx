"use client";

import { motion } from "framer-motion";
import { Heart, ArrowDown } from "lucide-react";
import Sparkle from "./Sparkle";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="aurora-bg relative flex min-h-screen items-center overflow-hidden"
    >
      {/* Animated gradient blobs */}
      <div className="animate-float absolute right-[10%] top-20 h-80 w-80 rounded-full bg-coral/15 blur-[80px]" />
      <div className="animate-float-slow absolute bottom-20 left-[5%] h-[28rem] w-[28rem] rounded-full bg-sage/12 blur-[100px]" />
      <div className="animate-pulse-soft absolute right-[30%] top-1/3 h-56 w-56 rounded-full bg-amber/12 blur-[60px]" />
      <div className="animate-float-gentle absolute left-[40%] top-[20%] h-40 w-40 rounded-full bg-blush/40 blur-[50px]" />

      {/* Sparkle stars */}
      <Sparkle size={16} color="#F2A65A" className="absolute left-[12%] top-[25%]" delay={0} />
      <Sparkle size={12} color="#E8725C" className="absolute right-[20%] top-[15%]" delay={0.5} />
      <Sparkle size={20} color="#F7C48B" className="absolute left-[30%] top-[70%]" delay={1} />
      <Sparkle size={14} color="#F09A8B" className="absolute right-[35%] top-[60%]" delay={1.5} />
      <Sparkle size={10} color="#A3C4AE" className="absolute left-[8%] top-[55%]" delay={2} />
      <Sparkle size={18} color="#F2A65A" className="absolute right-[5%] top-[45%]" delay={0.8} />
      <Sparkle size={8} color="#E8725C" className="absolute left-[50%] top-[12%]" delay={2.5} />
      <Sparkle size={15} color="#7BA68C" className="absolute right-[42%] top-[80%]" delay={1.2} />

      {/* Floating paw prints */}
      <motion.div
        className="absolute right-[15%] top-32 text-4xl text-coral/20"
        animate={{ y: [-10, 10, -10], rotate: [-5, 5, -5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        🐾
      </motion.div>
      <motion.div
        className="absolute bottom-40 left-[20%] text-3xl text-sage/20"
        animate={{ y: [10, -10, 10], rotate: [5, -5, 5] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        🐾
      </motion.div>
      <motion.div
        className="absolute left-[60%] top-[15%] text-2xl text-amber/15"
        animate={{ y: [-6, 6, -6], x: [-3, 3, -3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        🐾
      </motion.div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Text */}
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="glow-coral mb-8 inline-flex items-center gap-2 rounded-full bg-coral/10 px-4 py-2 text-sm font-semibold text-coral">
                <Heart className="h-4 w-4" fill="currentColor" />
                Refugio de Animales
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-display text-5xl font-bold leading-[1.1] tracking-tight text-charcoal sm:text-6xl lg:text-7xl"
            >
              Cada patita merece un{" "}
              <span className="text-magic relative inline-block">
                hogar
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 12"
                  fill="none"
                >
                  <path
                    d="M2 8C30 2 60 2 100 6C140 10 170 4 198 8"
                    stroke="#F2A65A"
                    strokeWidth="3"
                    strokeLinecap="round"
                    opacity="0.5"
                  />
                </svg>
              </span>{" "}
              lleno de amor
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-8 text-lg leading-relaxed text-warm-gray sm:text-xl"
            >
              En PRODEA rescatamos, rehabilitamos y encontramos hogares amorosos
              para animales que lo necesitan. Únete a nuestra misión de
              transformar vidas.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <a
                href="#adoptar"
                className="glow-coral inline-flex items-center gap-2 rounded-full bg-coral px-8 py-4 text-lg font-semibold text-cream shadow-xl shadow-coral/25 transition-all duration-300 hover:-translate-y-1 hover:bg-coral-dark hover:shadow-2xl hover:shadow-coral/40"
              >
                Quiero Adoptar
                <Heart className="h-5 w-5" />
              </a>
              <a
                href="#contacto"
                className="border-glow inline-flex items-center gap-2 rounded-full border-2 border-charcoal/15 px-8 py-4 text-lg font-semibold text-charcoal transition-all duration-300 hover:-translate-y-1 hover:border-sage hover:bg-sage/5 hover:text-sage-dark"
              >
                Hacer una Donación
              </a>
            </motion.div>
          </div>

          {/* Right: Magical paw illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, type: "spring", stiffness: 100 }}
            className="relative hidden items-center justify-center lg:flex"
          >
            <div className="relative h-[500px] w-[500px]">
              {/* Glowing aura ring */}
              <motion.div
                className="absolute inset-8 rounded-full border-2 border-coral/10"
                animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute inset-16 rounded-full border border-amber/10"
                animate={{ scale: [1.05, 1, 1.05], opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Main blob */}
              <div className="animate-float-slow absolute inset-0 rounded-[60%_40%_50%_50%/50%_60%_40%_50%] bg-gradient-to-br from-coral/20 via-blush to-amber/20" />

              {/* Paw with aura */}
              <svg
                viewBox="0 0 200 200"
                className="paw-aura absolute inset-0 h-full w-full p-16 text-coral/40"
              >
                <ellipse cx="100" cy="130" rx="40" ry="32" fill="currentColor" />
                <circle cx="60" cy="80" r="18" fill="currentColor" />
                <circle cx="100" cy="60" r="18" fill="currentColor" />
                <circle cx="140" cy="80" r="18" fill="currentColor" />
              </svg>

              {/* Orbiting sparkles */}
              <div className="animate-orbit absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <Sparkle size={12} color="#F2A65A" delay={0} duration={2} />
              </div>
              <div className="animate-orbit absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ animationDelay: "-7s" }}>
                <Sparkle size={10} color="#E8725C" delay={0.3} duration={2.5} />
              </div>
              <div className="animate-orbit absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ animationDelay: "-14s" }}>
                <Sparkle size={8} color="#7BA68C" delay={0.6} duration={3} />
              </div>

              {/* Floating cards */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="card-shine absolute -right-4 -top-4 flex items-center gap-3 rounded-2xl bg-white/90 p-4 shadow-xl shadow-charcoal/8 backdrop-blur-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sage/20 text-xl">
                  🐕
                </div>
                <div>
                  <p className="text-sm font-semibold text-charcoal">Rocky</p>
                  <p className="text-xs text-warm-gray">¡Adoptado! ✨</p>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="card-shine absolute -bottom-4 -left-4 flex items-center gap-3 rounded-2xl bg-white/90 p-4 shadow-xl shadow-charcoal/8 backdrop-blur-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-coral/20 text-xl">
                  🐈
                </div>
                <div>
                  <p className="text-sm font-semibold text-charcoal">Luna</p>
                  <p className="text-xs text-warm-gray">Busca hogar 💫</p>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [-3, 3, -3], scale: [1, 1.1, 1] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="glow-coral absolute -right-8 top-1/2 rounded-2xl bg-coral p-3 text-cream shadow-xl shadow-coral/25"
              >
                <Heart className="h-6 w-6" fill="currentColor" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 1.5 },
          y: { duration: 2, repeat: Infinity },
        }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-warm-gray"
      >
        <span className="text-xs font-medium uppercase tracking-wider">
          Descubre más
        </span>
        <ArrowDown className="h-4 w-4" />
      </motion.div>

      {/* Bottom wave */}
      <div className="absolute -bottom-1 left-0 right-0">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="h-16 w-full text-cream sm:h-24">
          <path d="M0,40 C360,100 720,0 1080,50 C1260,75 1380,20 1440,40 L1440,100 L0,100 Z" fill="currentColor" />
        </svg>
      </div>
    </section>
  );
}
