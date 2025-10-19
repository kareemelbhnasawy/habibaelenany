import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';

export function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-9xl font-display font-bold text-accent mb-4">404</h1>
        <h2 className="text-3xl md:text-4xl font-display font-semibold mb-4">
          Page Not Found
        </h2>
        <p className="text-lg text-muted mb-8 max-w-md mx-auto">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn btn-primary">
          <Home className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
      </motion.div>
    </main>
  );
}
