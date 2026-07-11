import { Link } from "@tanstack/react-router";
import { Linkedin, Instagram, Phone, Mail } from "lucide-react";
import {
  COMPANY,
  CONTACT_SERVICES,
  FOOTER_SITE_LINKS,
  FOOTER_SOCIAL_LINKS,
  SERVICES,
} from "@/lib/content";

const SOCIAL_ICONS = {
  LinkedIn: Linkedin,
  Instagram: Instagram,
} as const;

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative z-10 mt-auto border-t border-border bg-card/30"
      aria-labelledby="site-footer-heading"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-14 md:py-16">
        <h2 id="site-footer-heading" className="sr-only">
          Site footer
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="md:col-span-2 lg:col-span-3">
            <Link
              to="/"
              className="inline-flex items-center mb-5"
              aria-label="GrayBit Labs home"
            >
              <img
                src="/graybit-logo.png"
                alt="GrayBit Labs"
                width={267}
                height={82}
                loading="lazy"
                decoding="async"
                className="h-14 md:h-16 w-auto"
                draggable={false}
              />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              {COMPANY.description}
            </p>
            <p className="mt-4 text-xs text-muted-foreground/75">{COMPANY.location}</p>
          </div>

          {/* Nine capabilities */}
          <nav
            className="md:col-span-2 lg:col-span-5 xl:col-span-6"
            aria-label="Capabilities"
          >
            <FooterHeading>What we do</FooterHeading>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3">
              {SERVICES.map((service, index) => (
                <li key={service.slug}>
                  <Link
                    to="/services/$slug"
                    params={{ slug: service.slug }}
                    className="footer-link text-sm block w-fit"
                    data-cursor="grow"
                  >
                    {CONTACT_SERVICES[index] ?? service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Site */}
          <nav className="lg:col-span-2" aria-label="Site">
            <FooterHeading>Site</FooterHeading>
            <ul className="space-y-3">
              {FOOTER_SITE_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="footer-link text-sm block w-fit"
                    data-cursor="grow"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="lg:col-span-2">
            <FooterHeading>Get in touch</FooterHeading>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="footer-link inline-flex items-start gap-2.5"
                  data-cursor="grow"
                >
                  <Mail className="size-3.5 shrink-0 mt-0.5 text-muted-foreground" />
                  <span>{COMPANY.email}</span>
                </a>
              </li>
              {COMPANY.phones.map((phone) => (
                <li key={phone.href}>
                  <a
                    href={phone.href}
                    className="footer-link inline-flex items-center gap-2.5"
                    data-cursor="grow"
                  >
                    <Phone className="size-3.5 shrink-0 text-muted-foreground" />
                    <span>{phone.display}</span>
                  </a>
                </li>
              ))}
            </ul>

            <ul className="mt-6 flex items-center gap-3">
              {FOOTER_SOCIAL_LINKS.map((link) => {
                const Icon = SOCIAL_ICONS[link.label as keyof typeof SOCIAL_ICONS];
                if (!Icon) return null;

                const isPlaceholder = !link.href || link.href === "#";
                const className =
                  "inline-flex size-9 items-center justify-center rounded-md border border-border transition-colors duration-150";

                if (isPlaceholder) {
                  return (
                    <li key={link.label}>
                      <span
                        aria-label={`${link.label} (coming soon)`}
                        className={`${className} text-muted-foreground/40 cursor-default`}
                      >
                        <Icon className="size-4" />
                      </span>
                    </li>
                  );
                }

                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      className={`${className} text-muted-foreground hover:text-foreground hover:border-foreground/20`}
                      data-cursor="grow"
                    >
                      <Icon className="size-4" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-border text-xs text-muted-foreground">
          <p>© {year} {COMPANY.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-4">
      {children}
    </p>
  );
}
