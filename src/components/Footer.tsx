// import { Instagram, Linkedin } from 'lucide-react';
import { siteConfig } from '../data/site';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-paper border-t border-ink/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-display font-semibold tracking-tight mb-4">
              HABIBA EL ENANY
            </h3>
            <p className="text-sm text-muted max-w-xs">
              {siteConfig.photographer.tagline}
            </p>
          </div>

          {/* Quick Links */}
          {/* <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-wide">
              Quick Links
            </h4>
            <nav className="space-y-2">
              {siteConfig.nav.links.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="block text-sm text-muted hover:text-accent transition-colors focus-ring"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div> */}

          {/* Contact & Social */}
          {/* <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-wide">
              Connect
            </h4>
            <div className="space-y-3">
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="block text-sm text-muted hover:text-accent transition-colors focus-ring rounded"
              >
                {siteConfig.contact.email}
              </a>
              <div className="flex gap-4 pt-2">
                <a
                  href={siteConfig.contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-accent transition-colors focus-ring rounded p-1"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href={siteConfig.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-accent transition-colors focus-ring rounded p-1"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={siteConfig.contact.behance}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-accent transition-colors focus-ring rounded p-1"
                  aria-label="Behance"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z" />
                  </svg>
                </a>
              </div>
            </div>
          </div> */}
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-ink/5 text-center">
          <p className="text-sm text-muted">
            &copy; {currentYear} {siteConfig.title}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
