import { Heart } from "lucide-react";

const footerLinks = {
  nosotros: [
    { label: "Nuestra historia", href: "#nosotros" },
    { label: "Equipo", href: "#nosotros" },
    { label: "Transparencia", href: "#" },
    { label: "Blog", href: "#" },
  ],
  servicios: [
    { label: "Adopción", href: "#adoptar" },
    { label: "Voluntariado", href: "#servicios" },
    { label: "Donaciones", href: "#contacto" },
    { label: "Rescate", href: "#servicios" },
  ],
  legal: [
    { label: "Aviso de privacidad", href: "#" },
    { label: "Términos de uso", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-charcoal pb-8 pt-20 text-cream/70">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-coral">
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
              <span className="font-display text-xl font-bold text-cream">
                PRODEA
              </span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed">
              Protección y Defensa Animal. Rescatamos, rehabilitamos y
              encontramos hogares amorosos para animales que lo necesitan.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-cream">
              Nosotros
            </h3>
            <ul className="space-y-3">
              {footerLinks.nosotros.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors hover:text-coral"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-cream">
              Servicios
            </h3>
            <ul className="space-y-3">
              {footerLinks.servicios.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors hover:text-coral"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-cream">
              Legal
            </h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors hover:text-coral"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-8 sm:flex-row">
          <p className="text-sm">
            © 2024 PRODEA. Todos los derechos reservados.
          </p>
          <p className="flex items-center gap-1 text-sm">
            Hecho con{" "}
            <Heart className="h-3.5 w-3.5 fill-coral text-coral" /> para
            quienes no tienen voz
          </p>
        </div>
      </div>
    </footer>
  );
}
