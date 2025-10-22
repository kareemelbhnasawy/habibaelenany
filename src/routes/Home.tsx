import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Mail } from 'lucide-react';
import { HeroCarousel } from '../components/HeroCarousel';
import { HighlightsCarousel } from '../components/HighlightsCarousel';
import { FilmmakingCarousel } from '../components/FilmmakingCarousel';
import { ShortFormContent } from '../components/ShortFormContent';
import { TestimonialsCarousel } from '../components/TestimonialsCarousel';
import { Section } from '../components/Section';
import { siteConfig } from '../data/site';

export function Home() {
  return (
    <main>
      {/* Hero Full-Screen Section */}
      <section className="relative min-h-screen flex items-end">
        {/* Full-screen Carousel Background - completely non-interactive */}
        <div className="absolute inset-0 pointer-events-none select-none -z-10">
          <HeroCarousel />
          {/* Enhanced gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/40 to-ink/70" />
        </div>

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

                {/* Details Row */}
                <div className="mb-8 flex flex-wrap gap-4 md:gap-6">
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2">
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                    <span className="text-sm text-white/90">
                      {siteConfig.photographer.availability}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2">
                    <MapPin className="w-4 h-4 text-white/90" />
                    <span className="text-sm text-white/90">{siteConfig.photographer.location}</span>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4">
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="btn bg-white text-ink hover:bg-white/90 shadow-xl"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Book a shoot
                  </a>
                  <Link
                    to="/photography"
                    className="btn bg-white/10 backdrop-blur-md text-white border-2 border-white/30 hover:bg-white/20 hover:border-white/50 shadow-xl"
                  >
                    <span>About me</span>
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
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

          <div className="mt-12 text-center">
            <Link to="/photography" className="btn btn-secondary !rounded-none">
              View all
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
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
      <Section className="bg-ink/5">
        <div className="container">
          <TestimonialsCarousel />
        </div>
      </Section>

      {/* CTA Band */}
      <Section className="bg-accent text-white relative overflow-hidden">
        {/* Subtle texture */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }} />
        </div>

        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold mb-6">
                {siteConfig.cta.headline}
              </h2>
              <p className="text-lg md:text-xl mb-8 text-white/90">
                {siteConfig.cta.subtext}
              </p>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="btn bg-white text-accent hover:bg-white/90"
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
