"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Sparkle from "./Sparkle";

const testimonials = [
  {
    name: "María González",
    role: "Adoptó a Rocky",
    text: "Adoptar a Rocky fue la mejor decisión de nuestra vida. El equipo de PRODEA nos acompañó en cada paso, asegurándose de que fuera el compañero perfecto para nuestra familia. Hoy no podemos imaginar la vida sin él.",
    rating: 5,
    initials: "MG",
    accent: "coral" as const,
  },
  {
    name: "Carlos Martínez",
    role: "Voluntario desde 2020",
    text: "Ser voluntario en PRODEA me cambió la perspectiva de vida. Ver cómo un animal rescatado de la calle se transforma con amor y cuidado es una experiencia que no tiene precio.",
    rating: 5,
    initials: "CM",
    accent: "sage" as const,
  },
  {
    name: "Ana López",
    role: "Donante recurrente",
    text: "Confío plenamente en PRODEA. Son transparentes, dedicados y genuinamente apasionados por su causa. Cada peso que dono sé que se invierte en salvar vidas.",
    rating: 5,
    initials: "AL",
    accent: "amber" as const,
  },
];

const accentMap = {
  coral: { badge: "bg-coral/10 text-coral", avatar: "bg-gradient-to-br from-coral to-coral-dark", glow: "shadow-coral/20" },
  sage: { badge: "bg-sage/10 text-sage", avatar: "bg-gradient-to-br from-sage to-sage-dark", glow: "shadow-sage/20" },
  amber: { badge: "bg-amber/10 text-amber", avatar: "bg-gradient-to-br from-amber to-amber-light", glow: "shadow-amber/20" },
};

const fadeUp = {
  initial: { opacity: 0, y: 40 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-100px" } as const,
};

export default function Testimonials() {
  return (
    <section
      id="historias"
      className="relative overflow-hidden bg-white py-32"
    >
      {/* Decorative wave top */}
      <div className="absolute -top-1 left-0 right-0">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="h-12 w-full rotate-180 text-cream sm:h-16">
          <path d="M0,50 C240,10 720,70 1080,30 C1260,15 1380,45 1440,25 L1440,80 L0,80 Z" fill="currentColor" />
        </svg>
      </div>

      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-blush/50 blur-[80px]" />
      <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-sage/10 blur-[80px]" />

      {/* Sparkles */}
      <Sparkle size={14} color="#F2A65A" className="absolute left-[10%] top-[25%]" delay={0.4} />
      <Sparkle size={18} color="#E8725C" className="absolute right-[15%] bottom-[20%]" delay={1.1} />
      <Sparkle size={10} color="#A3C4AE" className="absolute left-[50%] top-[10%]" delay={1.7} />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.span
            {...fadeUp}
            transition={{ duration: 0.6 }}
            className="text-sm font-semibold uppercase tracking-wider text-amber"
          >
            Testimonios
          </motion.span>
          <motion.h2
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 font-display text-4xl font-bold text-charcoal sm:text-5xl"
          >
            Historias de <span className="text-magic">amor</span>
          </motion.h2>
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg text-warm-gray"
          >
            Las voces de quienes han sido parte de nuestra familia.
          </motion.p>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => {
            const styles = accentMap[t.accent];
            return (
              <motion.div
                key={t.name}
                {...fadeUp}
                transition={{ duration: 0.5, delay: 0.15 * i }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className={`border-glow card-shine relative rounded-3xl border border-charcoal/5 bg-cream p-8 transition-shadow duration-500 hover:shadow-2xl ${styles.glow}`}
              >
                <div
                  className={`mb-6 flex h-10 w-10 items-center justify-center rounded-xl ${styles.badge}`}
                >
                  <Quote className="h-5 w-5" />
                </div>

                <div className="mb-4 flex gap-1">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <motion.div
                      key={j}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + j * 0.1, type: "spring" }}
                    >
                      <Star className="h-4 w-4 fill-amber text-amber" />
                    </motion.div>
                  ))}
                </div>

                <p className="mb-8 leading-relaxed text-charcoal-light">
                  &ldquo;{t.text}&rdquo;
                </p>

                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full font-bold text-cream shadow-lg ${styles.avatar}`}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-charcoal">{t.name}</p>
                    <p className="text-sm text-warm-gray">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute -bottom-1 left-0 right-0">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="h-12 w-full text-cream sm:h-16">
          <path d="M0,25 C360,70 720,10 1080,45 C1260,60 1380,20 1440,35 L1440,80 L0,80 Z" fill="currentColor" />
        </svg>
      </div>
    </section>
  );
}
