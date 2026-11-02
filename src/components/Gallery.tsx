"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, Calendar } from "lucide-react";
import Link from "next/link";
import Sparkle from "./Sparkle";

interface Animal {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: string;
  description: string;
  image: string;
  status: string;
}

const EMOJI_MAP: Record<string, string> = {
  Perro: "🐕",
  Gato: "🐱",
  Conejo: "🐰",
  Ave: "🐦",
  Tortuga: "🐢",
  Hamster: "🐹",
};

const GRADIENT_MAP: Record<string, string> = {
  Perro: "from-sage/20 via-sage-light/20 to-sage/10",
  Gato: "from-coral/20 via-blush to-coral/10",
  Conejo: "from-amber/15 via-blush to-amber-light/15",
};

const fadeUp = {
  initial: { opacity: 0, y: 40 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-100px" } as const,
};

export default function Gallery() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/animals/daily")
      .then((r) => r.json())
      .then((data) => {
        setAnimals(data);
        setLoaded(true);
      });
  }, []);

  return (
    <section id="adoptar" className="relative overflow-hidden py-32">
      <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-coral/5 blur-[80px]" />
      <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-sage/5 blur-[80px]" />
      <div className="animate-float-gentle absolute left-[50%] top-[30%] h-48 w-48 rounded-full bg-amber/5 blur-[60px]" />

      <Sparkle size={18} color="#F2A65A" className="absolute left-[6%] top-[10%]" delay={0.2} />
      <Sparkle size={12} color="#E8725C" className="absolute right-[10%] top-[20%]" delay={0.9} />
      <Sparkle size={14} color="#7BA68C" className="absolute left-[35%] bottom-[8%]" delay={1.5} />
      <Sparkle size={10} color="#F09A8B" className="absolute right-[30%] bottom-[20%]" delay={2.1} />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.span
            {...fadeUp}
            transition={{ duration: 0.6 }}
            className="text-sm font-semibold uppercase tracking-wider text-coral"
          >
            Aún en el refugio
          </motion.span>
          <motion.h2
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 font-display text-4xl font-bold text-charcoal sm:text-5xl"
          >
            Ellos te <span className="text-magic">esperan</span>
          </motion.h2>
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg text-warm-gray"
          >
            Cada día te mostramos algunos de nuestros residentes que aún buscan familia.
          </motion.p>
        </div>

        {!loaded ? (
          <p className="mt-20 text-center text-warm-gray">Cargando...</p>
        ) : animals.length === 0 ? (
          <p className="mt-20 text-center text-warm-gray">
            Pronto tendremos residentes para mostrarte.
          </p>
        ) : (
          <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {animals.map((animal, i) => (
              <motion.div
                key={animal.id}
                {...fadeUp}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                whileHover={{ y: -12, transition: { duration: 0.3 } }}
                className="card-shine group overflow-hidden rounded-3xl bg-white shadow-lg shadow-charcoal/5 transition-shadow duration-500 hover:shadow-2xl hover:shadow-charcoal/12"
              >
                <div
                  className={`relative flex h-56 items-center justify-center overflow-hidden bg-gradient-to-br ${
                    GRADIENT_MAP[animal.species] || "from-blush to-cream-dark"
                  }`}
                >
                  {animal.image ? (
                    <img
                      src={animal.image}
                      alt={animal.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <motion.span
                      className="text-7xl"
                      whileHover={{ scale: 1.2, rotate: [0, -5, 5, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      {EMOJI_MAP[animal.species] || "🐾"}
                    </motion.span>
                  )}
                  <span
                    className={`absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm ${
                      animal.status === "Disponible"
                        ? "bg-sage/80 shadow-lg shadow-sage/30"
                        : "bg-amber/80 shadow-lg shadow-amber/30"
                    }`}
                  >
                    {animal.status === "Disponible" ? `✨ ${animal.status}` : `💫 ${animal.status}`}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>

                <div className="p-6">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="font-display text-xl font-bold text-charcoal">
                      {animal.name}
                    </h3>
                    <motion.button
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-coral/20 text-coral transition-all duration-300 hover:bg-coral hover:text-cream hover:shadow-lg hover:shadow-coral/30"
                    >
                      <Heart className="h-4 w-4" />
                    </motion.button>
                  </div>
                  <div className="mb-3 flex items-center gap-4 text-sm text-warm-gray">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {animal.age}
                    </span>
                    <span>
                      {animal.species}
                      {animal.breed ? ` · ${animal.breed}` : ""}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-warm-gray">
                    {animal.description}
                  </p>
                  <motion.a
                    href="#contacto"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-cream px-5 py-3 text-sm font-semibold text-charcoal transition-all duration-300 hover:bg-coral hover:text-cream hover:shadow-lg hover:shadow-coral/25"
                  >
                    Conóceme ✨
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Link to full catalog */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Link
            href="/residentes"
            className="glow-coral inline-flex items-center gap-2 rounded-full bg-coral px-8 py-4 text-lg font-semibold text-cream shadow-xl shadow-coral/25 transition-all duration-300 hover:-translate-y-1 hover:bg-coral-dark hover:shadow-2xl"
          >
            Ver todos los residentes →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
