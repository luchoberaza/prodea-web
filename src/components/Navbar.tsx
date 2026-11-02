"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/residentes", label: "Residentes" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-cream/95 backdrop-blur-md shadow-lg shadow-charcoal/5"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="group flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-coral transition-transform group-hover:scale-110">
              <svg
                viewBox="0 0 200 200"
                className="h-5 w-5 text-cream"
                fill="currentColor"
              >
                <ellipse cx="100" cy="130" rx="40" ry="32" />
                <circle cx="60" cy="80" r="18" />
                <circle cx="100" cy="60" r="18" />
                <circle cx="140" cy="80" r="18" />
              </svg>
            </div>
            <span className="text-2xl font-display font-bold tracking-tight text-charcoal">
              PRODEA
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative text-sm font-medium text-charcoal-light transition-colors hover:text-coral"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 rounded-full bg-coral transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-charcoal transition-colors hover:bg-charcoal/5 md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-charcoal/5 bg-cream/98 backdrop-blur-lg md:hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-lg font-medium text-charcoal transition-colors hover:text-coral"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
