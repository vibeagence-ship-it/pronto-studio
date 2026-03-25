import Link from "next/link";

// ---------------------------------------------------------------------------
// Nav links
// ---------------------------------------------------------------------------

const navLinks = [
  { label: "Accueil", href: "#" },
  { label: "Services", href: "#services" },
  { label: "Tarifs", href: "#tarifs" },
  { label: "Audit gratuit", href: "#audit" },
  { label: "Contact", href: "#contact" },
];

const legalLinks = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Politique de confidentialité", href: "/confidentialite" },
];

// ---------------------------------------------------------------------------
// Footer — Server Component (no "use client" needed)
// ---------------------------------------------------------------------------

export default function Footer() {
  return (
    <footer
      className="w-full border-t border-[#222222] py-16"
      style={{ backgroundColor: "#080808" }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col items-center gap-8 text-center">
        {/* ---------------------------------------------------------------- */}
        {/* Logo + tagline                                                    */}
        {/* ---------------------------------------------------------------- */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="text-xl leading-none" aria-hidden="true">
              ⚡
            </span>
            <span className="font-bold font-[family-name:var(--font-space-grotesk)] text-2xl text-[#F5F5F5] tracking-tight">
              PRONTO
            </span>
            <span className="font-bold font-[family-name:var(--font-space-grotesk)] text-2xl text-[#FF3B00] tracking-tight">
              STUDIO
            </span>
          </div>
          <p className="text-[#888888] text-sm">
            L&apos;IA au service de votre croissance.
          </p>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Nav links                                                         */}
        {/* ---------------------------------------------------------------- */}
        <nav aria-label="Navigation pied de page">
          <ul className="flex flex-wrap justify-center gap-6 md:gap-8 text-sm text-[#888888]">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="transition-colors duration-200 hover:text-[#F5F5F5]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* ---------------------------------------------------------------- */}
        {/* Contact email                                                     */}
        {/* ---------------------------------------------------------------- */}
        <a
          href="mailto:contact@pronto-studio.fr"
          className="text-[#FF3B00] text-sm transition-all duration-200 hover:underline"
        >
          contact@pronto-studio.fr
        </a>

        {/* ---------------------------------------------------------------- */}
        {/* Bottom bar                                                        */}
        {/* ---------------------------------------------------------------- */}
        <div className="w-full border-t border-[#222222] mt-0 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#444444]">
            {/* Copyright */}
            <span className="order-2 md:order-1">
              © 2025 Pronto Studio. Tous droits réservés.
            </span>

            {/* Made with agents */}
            <span className="order-1 md:order-2 text-[#555555]">
              Fait avec des agents IA — Forbach, France 🤖
            </span>

            {/* Legal links */}
            <nav
              aria-label="Liens légaux"
              className="order-3 flex gap-4 md:gap-5"
            >
              {legalLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-[#444444] text-xs transition-colors duration-200 hover:text-[#888888]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
