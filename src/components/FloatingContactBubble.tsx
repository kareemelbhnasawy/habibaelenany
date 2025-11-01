import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Instagram, MessageCircle, X } from 'lucide-react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { cn } from '../utils/cn';

export function FloatingContactBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-ink/20 backdrop-blur-sm z-40 md:hidden"
            style={{ touchAction: 'none' }}
          />
        )}
      </AnimatePresence>

      {/* Bubble */}
      <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 pointer-events-none">
        <div className="pointer-events-auto">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="absolute bottom-20 right-0 w-72 bg-paper rounded-2xl shadow-lifted p-6 border border-ink/10"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-lg font-semibold">
                  Let's Connect
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="focus-ring rounded-lg p-1 hover:bg-ink/5 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3">
                {/* WhatsApp */}
                <a
                  href="https://wa.me/201010302994?text=Hi%20Habiba!%20Im%20interested%20in%20working%20together%F0%9F%A4%8D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-ink/5 transition-colors focus-ring group"
                >
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <MessageCircle className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">WhatsApp</p>
                    <p className="text-xs text-muted">Connect with Me</p>
                  </div>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/habibalenany"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-ink/5 transition-colors focus-ring group"
                >
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Instagram className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">Instagram</p>
                    <p className="text-xs text-muted">@habibalenany</p>
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:habibalenany@gmail.com?subject=Collaboration%20Inquiry&body=Hi%20Habiba!%20Im%20interested%20in%20working%20together%F0%9F%A4%8D"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-ink/5 transition-colors focus-ring group"
                >
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-xs text-muted truncate">
                      habibalenany@gmail.com
                    </p>
                  </div>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Trigger Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'w-16 h-16 rounded-full bg-accent text-white shadow-lifted',
            'flex items-center justify-center',
            'hover:shadow-xl hover:scale-105 transition-all duration-200',
            'focus-ring'
          )}
          animate={
            prefersReducedMotion
              ? {}
              : {
                  y: [0, -8, 0],
                }
          }
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
          }}
          whileHover={
            prefersReducedMotion
              ? {}
              : {
                  rotate: [0, -5, 5, -5, 5, 0],
                  transition: { duration: 0.5 },
                }
          }
          whileTap={{ scale: 0.95 }}
          aria-label="Open contact menu"
          aria-expanded={isOpen}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="mail"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
              >
                <Mail className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
        </div>
      </div>
    </>
  );
}
