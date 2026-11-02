"use client";

import { motion } from "framer-motion";
import {
  Heart,
  Shield,
  Stethoscope,
  Users,
  GraduationCap,
  Home,
} from "lucide-react";
import Sparkle from "./Sparkle";

const services = [
  {
    icon: Heart,
    title: "Adopción Responsable",
    description:
      "Conectamos a cada animal con la familia perfecta a través de un proceso cuidadoso de evaluación y seguimiento.",
    accent: "coral" as const,
  },
  {
    icon: Shield,
    title: "Rescate y Rehabilitación",
    description:
      "Respondemos a reportes de animales en peligro y les brindamos la atención que necesitan para recuperarse.",
    accent: "sage" as const,
  },
  {
    icon: Stethoscope,
    title: "Atención Veterinaria",
    description:
      "Cada animal recibe chequeos completos, vacunación, esterilización y tratamientos necesarios.",
    accent: "amber" as const,
  },
  {
    icon: Users,
    title: "Programa de Voluntariado",
    description:
      "Únete a nuestro equipo y comparte tu tiempo y amor con quienes más lo necesitan.",
    accent: "sage" as const,
  },
  {
    icon: Home,
    title: "Refugio Temporal",
    description:
      "Ofrecemos un hogar seguro y cálido mientras nuestros rescatados encuentran su familia definitiva.",
    accent: "coral" as const,
  },
  {
    icon: GraduationCap,
    title: "Educación y Concientización",
    description:
      "Realizamos talleres y campañas para promover la tenencia responsable y el respeto animal.",
    accent: "amber" as const,
  },
];

const accentStyles = {
  coral: {
    icon: "bg-coral/10 text-coral",
    corner: "bg-coral/5",
    hoverGlow: "hover:shadow-coral/15",
  },
  sage: {
    icon: "bg-sage/10 text-sage",
    corner: "bg-sage/5",
    hoverGlow: "hover:shadow-sage/15",
  },
  amber: {
    icon: "bg-amber/10 text-amber",
    corner: "bg-amber/5",
    hoverGlow: "hover:shadow-amber/15",
  },
};

const fadeUp = {
  initial: { opacity: 0, y: 40 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-100px" } as const,
};

export default function Services() {
  return (
    <section id="servicios" className="relative bg-white py-32">
      {/* Decorative wave top */}
      <div className="absolute -top-1 left-0 right-0">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="h-12 w-full rotate-180 text-cream sm:h-16">
          <path d="M0,30 C480,80 960,0 1440,40 L1440,80 L0,80 Z" fill="currentColor" />
        </svg>
      </div>

      {/* Sparkles */}
      <Sparkle size={12} color="#F2A65A" className="absolute left-[5%] top-[15%]" delay={0.3} />
      <Sparkle size={16} color="#E8725C" className="absolute right-[8%] top-[40%]" delay={1} />
      <Sparkle size={10} color="#7BA68C" className="absolute left-[45%] bottom-[10%]" delay={1.8} />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.span
            {...fadeUp}
            transition={{ duration: 0.6 }}
            className="text-sm font-semibold uppercase tracking-wider text-sage"
          >
            Nuestros Servicios
          </motion.span>
          <motion.h2
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 font-display text-4xl font-bold text-charcoal sm:text-5xl"
          >
            Lo que hacemos con <span className="text-magic">amor</span>
          </motion.h2>
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg text-warm-gray"
          >
            Cada servicio está diseñado para garantizar el bienestar integral de
            nuestros rescatados.
          </motion.p>
        </div>

        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const styles = accentStyles[service.accent];
            return (
              <motion.div
                key={service.title}
                {...fadeUp}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className={`card-shine group relative overflow-hidden rounded-3xl border border-charcoal/5 p-8 transition-all duration-500 hover:-translate-y-2 hover:border-transparent hover:shadow-2xl ${styles.hoverGlow}`}
              >
                <div
                  className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg ${styles.icon}`}
                >
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-3 font-display text-xl font-bold text-charcoal">
                  {service.title}
                </h3>
                <p className="leading-relaxed text-warm-gray">
                  {service.description}
                </p>
                <div
                  className={`absolute right-0 top-0 h-24 w-24 rounded-bl-[48px] rounded-tr-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${styles.corner}`}
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute -bottom-1 left-0 right-0">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="h-12 w-full text-cream sm:h-16">
          <path d="M0,40 C360,80 720,10 1080,50 C1260,65 1380,25 1440,35 L1440,80 L0,80 Z" fill="currentColor" />
        </svg>
      </div>
    </section>
  );
}
