"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, Calendar, Search, Home, PartyPopper } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Sparkle from "@/components/Sparkle";

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
  initial: { opacity: 0, y: 30 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-50px" } as const,
};

export default function ResidentesPage() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Todos");
  const [category, setCategory] = useState<"refugio" | "adoptados">("refugio");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/animals")
      .then((r) => r.json())
      .then((data) => {
        setAnimals(data);
        setLoaded(true);
      });
  }, []);

  const species = ["Todos", ...Array.from(new Set(animals.map((a) => a.species)))];

  const byCategory = animals.filter((a) =>
    category === "adoptados" ? a.status === "Adoptado" : a.status !== "Adoptado",
  );

  const filtered = byCategory.filter((a) => {
    const q = search.toLowerCase();
    const matchSearch =
      a.name.toLowerCase().includes(q) ||
      a.species.toLowerCase().includes(q) ||
      a.breed.toLowerCase().includes(q);
    const matchFilter = filter === "Todos" || a.species === filter;
    return matchSearch && matchFilter;
  });

  const refugioCount = animals.filter((a) => a.status !== "Adoptado").length;
  const adoptedCount = animals.filter((a) => a.status === "Adoptado").length;

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20">
        {/* Hero */}
        <section className="aurora-bg relative overflow-hidden py-20 text-center">
          <Sparkle size={16} color="#F2A65A" className="absolute left-[10%] top-[20%]" delay={0} />
          <Sparkle size={12} color="#E8725C" className="absolute right-[15%] top-[30%]" delay={0.8} />
          <Sparkle size={14} color="#7BA68C" className="absolute left-[70%] bottom-[15%]" delay={1.4} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10"
          >
            <h1 className="font-display text-4xl font-bold text-charcoal sm:text-5xl lg:text-6xl">
              Nuestros <span className="text-magic">Residentes</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-warm-gray">
              Conoce a todos los animales que buscan un hogar lleno de amor.
            </p>
          </motion.div>

          <div className="absolute -bottom-1 left-0 right-0">
            <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="h-12 w-full text-cream sm:h-16">
              <path d="M0,40 C360,80 720,10 1080,50 C1260,65 1380,25 1440,35 L1440,80 L0,80 Z" fill="currentColor" />
            </svg>
          </div>
        </section>

        {/* Category + Search and filter */}
        <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
          {/* Category tabs */}
          <div className="mb-8 flex justify-center">
            <div className="inline-flex rounded-2xl bg-white p-1.5 shadow-md shadow-charcoal/5">
              <button
                onClick={() => { setCategory("refugio"); setFilter("Todos"); }}
                className={`inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all ${
                  category === "refugio"
                    ? "bg-coral text-cream shadow-md shadow-coral/25"
                    : "text-charcoal-light hover:text-coral"
                }`}
              >
                <Home className="h-4 w-4" />
                Aún en el refugio
                <span className={`rounded-full px-2 py-0.5 text-xs ${
                  category === "refugio" ? "bg-cream/20" : "bg-charcoal/5"
                }`}>
                  {refugioCount}
                </span>
              </button>
              <button
                onClick={() => { setCategory("adoptados"); setFilter("Todos"); }}
                className={`inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all ${
                  category === "adoptados"
                    ? "bg-sage text-cream shadow-md shadow-sage/25"
                    : "text-charcoal-light hover:text-sage"
                }`}
              >
                <PartyPopper className="h-4 w-4" />
                Adoptados
                <span className={`rounded-full px-2 py-0.5 text-xs ${
                  category === "adoptados" ? "bg-cream/20" : "bg-charcoal/5"
                }`}>
                  {adoptedCount}
                </span>
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative max-w-sm flex-1">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-warm-gray" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar por nombre, especie o raza..."
                className="w-full rounded-2xl border border-charcoal/10 bg-white py-3 pl-11 pr-4 text-sm text-charcoal shadow-sm focus:border-coral/30 focus:outline-none focus:ring-2 focus:ring-coral/30"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {species.map((s) => (
                <button
                  key={s}
                  onClick={() => setFilter(s)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    filter === s
                      ? "bg-coral text-cream shadow-md shadow-coral/25"
                      : "bg-white text-charcoal-light hover:bg-blush"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          {!loaded ? (
            <p className="py-20 text-center text-warm-gray">Cargando residentes...</p>
          ) : filtered.length === 0 ? (
            <p className="py-20 text-center text-warm-gray">
              {animals.length === 0
                ? "Pronto tendremos residentes para mostrarte."
                : "No se encontraron resultados para tu búsqueda."}
            </p>
          ) : (
            <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((animal, i) => (
                <motion.div
                  key={animal.id}
                  {...fadeUp}
                  transition={{ duration: 0.4, delay: 0.05 * (i % 8) }}
                  whileHover={{ y: -8 }}
                  className="card-shine group overflow-hidden rounded-3xl bg-white shadow-lg shadow-charcoal/5 transition-shadow duration-500 hover:shadow-2xl"
                >
                  <div
                    className={`relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br ${
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
                      <span className="text-6xl transition-transform duration-500 group-hover:scale-110">
                        {EMOJI_MAP[animal.species] || "🐾"}
                      </span>
                    )}
                    <span
                      className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm ${
                        animal.status === "Disponible"
                          ? "bg-sage/80"
                          : animal.status === "Adoptado"
                            ? "bg-coral/80"
                            : "bg-amber/80"
                      }`}
                    >
                      {animal.status}
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="mb-1 flex items-center justify-between">
                      <h3 className="font-display text-lg font-bold text-charcoal">
                        {animal.name}
                      </h3>
                      <Heart className="h-4 w-4 text-coral/40" />
                    </div>
                    <div className="mb-2 flex items-center gap-3 text-xs text-warm-gray">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {animal.age}
                      </span>
                      <span>
                        {animal.species}
                        {animal.breed ? ` · ${animal.breed}` : ""}
                      </span>
                    </div>
                    <p className="line-clamp-2 text-sm text-warm-gray">
                      {animal.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
