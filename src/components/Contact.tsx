"use client";

import { motion } from "framer-motion";
import { Send, Phone, Mail, MapPin, Clock } from "lucide-react";

const contactInfo = [
  { icon: Phone, label: "Teléfono", value: "+52 (55) 1234-5678" },
  { icon: Mail, label: "Email", value: "hola@prodea.org" },
  { icon: MapPin, label: "Dirección", value: "Av. de los Animales 123, CDMX" },
  { icon: Clock, label: "Horario", value: "Lun - Dom: 9:00 - 18:00" },
];

const fadeUp = {
  initial: { opacity: 0, y: 40 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-100px" } as const,
};

export default function Contact() {
  return (
    <section id="contacto" className="relative overflow-hidden py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-cream to-cream-dark" />
      <div className="absolute right-[10%] top-20 h-72 w-72 rounded-full bg-coral/5 blur-3xl" />
      <div className="absolute bottom-20 left-[5%] h-96 w-96 rounded-full bg-sage/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.span
            {...fadeUp}
            transition={{ duration: 0.6 }}
            className="text-sm font-semibold uppercase tracking-wider text-sage"
          >
            Contacto
          </motion.span>
          <motion.h2
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 font-display text-4xl font-bold text-charcoal sm:text-5xl"
          >
            ¿Listo para cambiar una{" "}
            <span className="text-coral">vida</span>?
          </motion.h2>
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg text-warm-gray"
          >
            Escríbenos y da el primer paso hacia una historia de amor
            incondicional.
          </motion.p>
        </div>

        <div className="mt-20 grid gap-12 lg:grid-cols-5">
          <motion.form
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="rounded-3xl bg-white p-8 shadow-xl shadow-charcoal/5 sm:p-10 lg:col-span-3"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-charcoal">
                  Nombre
                </label>
                <input
                  type="text"
                  placeholder="Tu nombre"
                  className="w-full rounded-2xl border border-charcoal/10 bg-cream/50 px-5 py-3.5 text-charcoal placeholder:text-warm-gray/50 transition-all focus:border-coral/30 focus:outline-none focus:ring-2 focus:ring-coral/30"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-charcoal">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="w-full rounded-2xl border border-charcoal/10 bg-cream/50 px-5 py-3.5 text-charcoal placeholder:text-warm-gray/50 transition-all focus:border-coral/30 focus:outline-none focus:ring-2 focus:ring-coral/30"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="mb-2 block text-sm font-semibold text-charcoal">
                Asunto
              </label>
              <select className="w-full rounded-2xl border border-charcoal/10 bg-cream/50 px-5 py-3.5 text-charcoal transition-all focus:border-coral/30 focus:outline-none focus:ring-2 focus:ring-coral/30">
                <option value="">Selecciona una opción</option>
                <option value="adopcion">Quiero adoptar</option>
                <option value="voluntariado">Quiero ser voluntario</option>
                <option value="donacion">Quiero donar</option>
                <option value="reporte">Reportar animal en peligro</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            <div className="mt-6">
              <label className="mb-2 block text-sm font-semibold text-charcoal">
                Mensaje
              </label>
              <textarea
                rows={5}
                placeholder="Cuéntanos cómo podemos ayudarte..."
                className="w-full resize-none rounded-2xl border border-charcoal/10 bg-cream/50 px-5 py-3.5 text-charcoal placeholder:text-warm-gray/50 transition-all focus:border-coral/30 focus:outline-none focus:ring-2 focus:ring-coral/30"
              />
            </div>

            <button
              type="submit"
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-coral px-8 py-4 text-lg font-semibold text-cream shadow-lg shadow-coral/25 transition-all duration-300 hover:bg-coral-dark hover:shadow-xl hover:shadow-coral/30"
            >
              Enviar Mensaje
              <Send className="h-5 w-5" />
            </button>
          </motion.form>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col gap-6 lg:col-span-2"
          >
            {contactInfo.map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-4 rounded-2xl border border-charcoal/5 bg-white/60 p-5 backdrop-blur-sm"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sage/10 text-sage">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-warm-gray">
                    {item.label}
                  </p>
                  <p className="mt-0.5 font-semibold text-charcoal">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}

            <div className="mt-auto rounded-3xl bg-gradient-to-br from-coral to-coral-dark p-6 text-cream">
              <h3 className="font-display text-xl font-bold">
                ¿Emergencia animal?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-cream/80">
                Si encuentras un animal en peligro, llámanos inmediatamente.
                Nuestro equipo de rescate está disponible 24/7.
              </p>
              <a
                href="tel:+525512345678"
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white/20 px-5 py-2.5 text-sm font-semibold text-cream backdrop-blur-sm transition-colors hover:bg-white/30"
              >
                <Phone className="h-4 w-4" />
                Llamar ahora
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
