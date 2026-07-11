import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/content";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-border bg-background/70 backdrop-blur-xl shadow-[0_2px_30px_-12px_rgba(0,0,0,0.6)]"
          : "border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 h-24 md:h-32 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 group"
          aria-label="GrayBit Labs home"
          data-cursor="grow"
        >
          <img
            src="/graybit-logo.png"
            alt="GrayBit Labs"
            width={260}
            height={80}
            loading="eager"
            decoding="async"
            className="h-16 md:h-20 w-auto select-none transition-transform duration-300 group-hover:scale-[1.03]"
            draggable={false}
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-muted-foreground">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              data-cursor="grow"
              className="relative py-1 hover:text-foreground transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
              activeProps={{ className: "text-foreground after:w-full" }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/contact"
            data-cursor="grow"
            className="btn-accent ml-2 inline-flex items-center px-5 py-2.5 text-sm"
          >
            Start a project
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          className="md:hidden p-2 -mr-2 text-foreground"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl">
          <nav className="px-5 py-6 flex flex-col gap-1">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="px-3 py-3 rounded-lg text-base text-foreground/80 hover:text-foreground hover:bg-secondary transition-colors"
                activeProps={{ className: "text-accent bg-secondary" }}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="btn-accent mt-4 px-4 py-3.5 text-center font-medium"
            >
              Start a project
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
