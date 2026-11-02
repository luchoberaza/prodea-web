"use client";

import { motion } from "framer-motion";
import { Heart, Users, Home } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";
import Sparkle from "./Sparkle";

const stats = [
  {
    icon: Heart,
    value: 500,
    suffix: "+",
    label: "Animales Rescatados",
    accent: "bg-coral/10 text-coral",
    glow: "glow-coral",
  },
  {
    icon: Home,
    value: 350,
    suffix: "+",
    label: "Adopciones Exitosas",
    accent: "bg-sage/10 text-sage",
    glow: "glow-sage",
  },
  {
    icon: Users,
    value: 120,
    suffix: "+",
    label: "Voluntarios Activos",
    accent: "bg-amber/10 text-amber",
    glow: "",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 40 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-100px" } as const,
};

export default function About() {
  return (
    <section id="nosotros" className="relative overflow-hidden py-32">
      {/* Sparkle decorations */}
      <Sparkle size={14} color="#F2A65A" className="absolute left-[8%] top-[20%]" delay={0.5} />
      <Sparkle size={10} color="#E8725C" className="absolute right-[12%] top-[30%]" delay={1.2} />
      <Sparkle size={16} color="#A3C4AE" className="absolute right-[25%] bottom-[15%]" delay={0.8} />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <motion.span
              {...fadeUp}
              transition={{ duration: 0.6 }}
              className="text-sm font-semibold uppercase tracking-wider text-coral"
            >
              Nuestra Historia
            </motion.span>
            <motion.h2
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-4 font-display text-4xl font-bold leading-tight text-charcoal sm:text-5xl"
            >
              Un refugio nacido del{" "}
              <span className="text-magic">corazón</span>
            </motion.h2>
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 space-y-4 text-lg leading-relaxed text-warm-gray"
            >
              <p>
                PRODEA nació en 2018 cuando un grupo de amantes de los animales
                decidió que ningún ser vivo debería sufrir en las calles. Lo que
                comenzó como rescates improvisados se convirtió en un refugio que
                hoy es hogar temporal de cientos de animales.
              </p>
              <p>
                Nuestra misión es simple pero poderosa: rescatar, rehabilitar y
                encontrar familias amorosas para cada animal que llega a nuestras
                puertas. Creemos que la compasión no tiene límites y que cada vida
                importa.
              </p>
            </motion.div>
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8"
            >
              <a
                href="#servicios"
                className="group inline-flex items-center gap-2 font-semibold text-coral transition-colors hover:text-coral-dark"
              >
                Conoce lo que hacemos ✨
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
            </motion.div>
          </div>

          <div className="grid gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                {...fadeUp}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                className="card-shine flex items-center gap-6 rounded-3xl bg-white p-6 shadow-lg shadow-charcoal/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
              >
                <div
                  className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl ${stat.accent} ${stat.glow}`}
                >
                  <stat.icon className="h-7 w-7" />
                </div>
                <div>
                  <p className="font-display text-4xl font-bold text-charcoal">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="font-medium text-warm-gray">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
