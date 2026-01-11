import { Link } from "react-router-dom";
import { Lock, Instagram, Linkedin, Mail, Globe } from "lucide-react";
import { siteConfig } from "../lib/siteConfig";
import { useSiteSettings } from "../hooks/useSiteSettings";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { generalConfig, siteInfo, contactInfo } = useSiteSettings();

  return (
    <footer className="bg-paper border-t border-ink/5 pt-12 md:pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Dynamic Footer Image Section */}
        {/* {generalConfig.footer_image_url && (
          <div className="w-full max-w-lg mx-auto mb-12">
            <img
              src={generalConfig.footer_image_url}
              alt="Let's Create Something Together"
              className="w-full h-auto object-contain rounded-lg shadow-sm"
            />
          </div>
        )} */}

        <div className="text-center space-y-6">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-display font-semibold tracking-tight mb-2 uppercase">
              {siteInfo.title || "HABIBA EL ENANY"}
            </h3>
            <p className="text-sm text-muted max-w-xl mx-auto">
              {siteInfo.description ||
                siteInfo.bio ||
                siteConfig.photographer.tagline}
            </p>
          </div>

          {/* Social Links */}
          {/* <div className="flex items-center justify-center gap-6">
            {contactInfo.instagram && (
              <a
                href={contactInfo.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink/60 hover:text-accent transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            )}
            {contactInfo.linkedin && (
              <a
                href={contactInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink/60 hover:text-accent transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            )}
            {contactInfo.behance && (
              <a
                href={contactInfo.behance}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink/60 hover:text-accent transition-colors"
                aria-label="Behance"
              >
                <Globe size={20} />
              </a>
            )}
            {contactInfo.email && (
              <a
                href={`mailto:${contactInfo.email}`}
                className="text-ink/60 hover:text-accent transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            )}
          </div> */}
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-ink/5 text-center flex items-center justify-center gap-2">
          <p className="text-sm text-muted">
            &copy; {currentYear} {siteInfo.title || siteConfig.title}. All
            rights reserved.
          </p>
          <Link
            to="/admin"
            className="text-ink/30 hover:text-ink transition-colors duration-300 p-1"
            aria-label="Admin Access"
            title="Admin Dashboard"
          >
            <Lock className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
