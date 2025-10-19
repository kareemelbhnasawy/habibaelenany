import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, Mail } from 'lucide-react';
import { HeroCarousel } from '../components/HeroCarousel';
import { HighlightsCarousel } from '../components/HighlightsCarousel';
import { FilmmakingCarousel } from '../components/FilmmakingCarousel';
import { ShortFormContent } from '../components/ShortFormContent';
import { TestimonialsCarousel } from '../components/TestimonialsCarousel';
import { Section } from '../components/Section';
import { siteConfig } from '../data/site';

export function Home() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 100]);

  return (
    <main className="min-h-screen">
      {/* Hero Split Section */}
      <section className="relative min-h-[90vh] md:min-h-screen pt-16 md:pt-20">
        <div className="container mx-auto h-full">
          <div className="grid lg:grid-cols-2 gap-0 lg:gap-8 h-full">
            {/* Left: Carousel */}
            <motion.div
              style={{ y: heroY }}
              className="relative h-[50vh] lg:h-auto lg:min-h-[600px] order-1 lg:order-1 rounded-none lg:rounded-2xl overflow-hidden"
            >
              <HeroCarousel />
            </motion.div>

            {/* Right: Content */}
            <div className="flex items-center order-2 lg:order-2 py-12 lg:py-0">
              <div className="w-full max-w-xl mx-auto lg:mx-0">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold mb-6 text-balance leading-tight">
                    {siteConfig.photographer.tagline}
                  </h2>

                  <p className="text-base md:text-lg text-muted mb-8 leading-relaxed">
                    {siteConfig.photographer.bio}
                  </p>

                  <Link
                    to="/photography"
                    className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors font-medium group focus-ring rounded-lg"
                  >
                    <span>About me</span>
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>

                  {/* Details Row */}
                  <div className="mt-12 pt-8 border-t border-ink/10 flex flex-wrap gap-6">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span className="text-sm text-muted">
                        {siteConfig.photographer.availability}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-muted">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{siteConfig.photographer.location}</span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="btn btn-primary"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Book a shoot
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photography Highlights */}
      <Section className="bg-paper">
        <div className="container">
          <HighlightsCarousel />

          <div className="mt-12 text-center">
            <Link to="/photography" className="btn btn-secondary">
              See all work
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

      {/* Category Preview */}
      <Section>
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold mb-4">
              Explore by Category
            </h2>
            <p className="text-muted text-lg">
              Discover diverse creative work
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                name: 'Portraits',
                image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=1000&fit=crop'
              },
              {
                name: 'Editorial',
                image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&h=1000&fit=crop'
              },
              {
                name: 'Filmmaking',
                image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=1000&fit=crop'
              },
            ].map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={`/photography?category=${category.name}`}
                  className="group block relative aspect-[3/4] rounded-lg overflow-hidden focus-ring"
                >
                  <img
                    src={category.image}
                    alt={`${category.name} photography`}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  <div className="absolute inset-0 flex items-end p-8">
                    <h3 className="text-white font-display text-2xl md:text-3xl font-semibold">
                      {category.name}
                    </h3>
                  </div>
                  <div className="absolute inset-0 ring-2 ring-transparent group-hover:ring-accent/50 transition-all rounded-lg" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Testimonials */}
      <Section className="bg-paper">
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
