"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, PartyPopper, Home } from "lucide-react";
import Sparkle from "./Sparkle";

interface Animal {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: string;
  description: string;
  image: string;
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

export default function AdopcionesExitosas() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/animals/adopted")
      .then((r) => r.json())
      .then((data) => {
        setAnimals(data);
        setLoaded(true);
      });
  }, []);

  if (loaded && animals.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-white py-32">
      {/* Wave top */}
      <div className="absolute -top-1 left-0 right-0">
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="h-12 w-full rotate-180 text-cream sm:h-16"
        >
          <path
            d="M0,45 C320,80 640,10 960,50 C1120,65 1300,20 1440,40 L1440,80 L0,80 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Sparkles */}
      <Sparkle size={14} color="#7BA68C" className="absolute left-[8%] top-[18%]" delay={0.3} />
      <Sparkle size={18} color="#F2A65A" className="absolute right-[12%] top-[25%]" delay={1.1} />
      <Sparkle size={10} color="#E8725C" className="absolute left-[55%] bottom-[12%]" delay={1.7} />

      {/* Background blobs */}
      <div className="absolute left-[5%] top-20 h-64 w-64 rounded-full bg-sage/5 blur-[80px]" />
      <div className="absolute bottom-10 right-[10%] h-72 w-72 rounded-full bg-amber/5 blur-[80px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-4 flex items-center justify-center gap-2"
          >
            <span className="text-sm font-semibold uppercase tracking-wider text-sage">
              Finales felices
            </span>
          </motion.div>
          <motion.h2
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl font-bold text-charcoal sm:text-5xl"
          >
            Adopciones <span className="text-magic">exitosas</span>
          </motion.h2>
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg text-warm-gray"
          >
            Ellos ya encontraron su hogar para siempre. Cada adopción es una historia
            de amor que nos inspira a seguir adelante.
          </motion.p>
        </div>

        {/* Grid */}
        {!loaded ? (
          <p className="mt-16 text-center text-warm-gray">Cargando...</p>
        ) : (
          <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {animals.map((animal, i) => (
              <motion.div
                key={animal.id}
                {...fadeUp}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="card-shine group relative overflow-hidden rounded-3xl bg-cream shadow-lg shadow-charcoal/5 transition-shadow duration-500 hover:shadow-2xl"
              >
                {/* Adopted ribbon */}
                <div className="absolute left-0 right-0 top-0 z-10 flex items-center justify-center gap-1.5 bg-gradient-to-r from-sage to-sage-dark py-2 text-xs font-bold uppercase tracking-wider text-cream">
                  <Home className="h-3.5 w-3.5" />
                  Adoptado
                  <PartyPopper className="h-3.5 w-3.5" />
                </div>

                {/* Image area */}
                <div
                  className={`relative flex h-52 items-center justify-center overflow-hidden bg-gradient-to-br pt-6 ${
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
                    <span className="text-7xl opacity-90 transition-transform duration-500 group-hover:scale-110">
                      {EMOJI_MAP[animal.species] || "🐾"}
                    </span>
                  )}

                  {/* Success overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-sage/10 to-transparent" />
                </div>

                {/* Info */}
                <div className="p-6">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="font-display text-xl font-bold text-charcoal">
                      {animal.name}
                    </h3>
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sage/10 text-sage">
                      <Heart className="h-4 w-4" fill="currentColor" />
                    </div>
                  </div>
                  <p className="mb-3 text-sm text-warm-gray">
                    {animal.species}
                    {animal.breed ? ` · ${animal.breed}` : ""} · {animal.age}
                  </p>
                  <p className="text-sm leading-relaxed text-warm-gray">
                    {animal.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Wave bottom */}
      <div className="absolute -bottom-1 left-0 right-0">
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="h-12 w-full text-cream sm:h-16"
        >
          <path
            d="M0,30 C480,70 960,10 1440,45 L1440,80 L0,80 Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  );
}
