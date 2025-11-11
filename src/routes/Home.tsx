import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Mail } from "lucide-react";
import { HeroCarousel } from "../components/HeroCarousel";
import { HighlightsCarousel } from "../components/HighlightsCarousel";
import { FilmmakingCarousel } from "../components/FilmmakingCarousel";
import { ShortFormContent } from "../components/ShortFormContent";
import { Section } from "../components/Section";
import { ParallaxSection } from "../components/ParallaxSection";
import { ScrollReveal } from "../components/ScrollReveal";
import { siteConfig } from "../data/site";

export function Home() {
  return (
    <main>
      {/* Hero Full-Screen Section */}
      <section className="relative min-h-screen flex items-end overflow-hidden">
        {/* Full-screen Carousel Background with Parallax */}
        <ParallaxSection
          offset={100}
          className="absolute inset-0 pointer-events-none select-none -z-10"
        >
          <HeroCarousel />
          {/* Enhanced gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/40 to-ink/70" />
        </ParallaxSection>

        {/* Content Overlay */}
        <div className="relative w-full pb-16 md:pb-20 lg:pb-24 pt-24 md:pt-32">
          <div className="container mx-auto">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-white"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-semibold mb-6 text-balance leading-tight drop-shadow-lg">
                  {siteConfig.photographer.tagline}
                </h1>

                <p className="text-base md:text-lg lg:text-xl text-white/90 mb-8 leading-relaxed max-w-2xl drop-shadow-md">
                  {siteConfig.photographer.bio}
                </p>

                {/* Divider Line */}
                <div className="w-full h-px bg-white/20 mb-6" />

                {/* Details Row - No background */}
                <div className="mb-8 flex flex-wrap gap-4 md:gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                    <span className="text-sm text-white/90">
                      {siteConfig.photographer.availability}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-white/90" />
                    <span className="text-sm text-white/90">
                      {siteConfig.photographer.location}
                    </span>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://wa.me/201010302994?text=Hi%20Habiba!%20Im%20interested%20in%20working%20together%F0%9F%A4%8D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 font-sans tracking-[0.2em] uppercase font-light text-xs md:text-sm"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    BOOK A SHOOT
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Photography Highlights */}
      <Section className="bg-paper">
        <div className="container">
          <HighlightsCarousel />

          <ScrollReveal delay={0.2}>
            <div className="mt-12 text-center">
              <Link
                to="/photography"
                className="btn btn-secondary font-sans tracking-[0.2em] uppercase font-light text-xs md:text-sm"
              >
                VIEW ALL
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </Section>

      {/* Filmmaking Frames */}
      <Section>
        <div className="container">
          <FilmmakingCarousel />
        </div>
      </Section>

      {/* Short Form Content */}
      <Section className="bg-paper">
        <div className="container">
          <ShortFormContent />
        </div>
      </Section>

      {/* Testimonials */}
      {/* <Section className="bg-ink/5">
        <div className="container">
          <TestimonialsCarousel />
        </div>
      </Section> */}

      {/* CTA Band */}
      <Section className="relative overflow-hidden min-h-[400px] md:min-h-[600px] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/src/assets/photos/refer.jpg"
            alt="Photography background"
            className="w-full h-full object-cover"
            onError={(e) => {
              console.warn("Failed to load refer.jpg, using fallback");
              e.currentTarget.src =
                "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1600&q=80";
            }}
          />
          <div className="absolute inset-0 bg-ink/60" />
        </div>

        <div className="container relative z-10">
          <div className="max-w-3xl  sm:mx-auto lg:mx-50 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold mb-6 text-white">
                {siteConfig.cta.headline}
              </h2>
              <p className="text-lg md:text-xl mb-8 text-white/90">
                {siteConfig.cta.subtext}
              </p>
              <a
                href="https://wa.me/201010302994?text=Hi%20Habiba!%20Im%20interested%20in%20working%20together%F0%9F%A4%8D"
                target="_blank"
                rel="noopener noreferrer"
                className="btn bg-white text-ink hover:bg-white/90 font-sans tracking-[0.2em] uppercase font-light text-xs md:text-sm"
              >
                Get in touch
              </a>
            </motion.div>
          </div>
        </div>
      </Section>
    </main>
  );
}
