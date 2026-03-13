import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  return (
    <section className="gradient-hero relative overflow-hidden">
      <div className="container py-20 md:py-28">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-xs font-semibold text-accent-foreground mb-6">
              <BookOpen className="h-3.5 w-3.5" />
              MHTCET 2026 Mock Tests Available
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl font-display font-bold text-foreground leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Practice Mock Tests for{' '}
            <span className="text-primary">Competitive Exams</span>
          </motion.h1>

          <motion.p
            className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Real exam simulation with instant performance analysis. Prepare smarter with our professional test interface.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link to="/exams/mhtcet">
              <Button size="lg" className="gap-2 text-base px-8">
                Start Mock Test <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/exams">
              <Button size="lg" variant="outline" className="text-base px-8">
                View Exams
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
    </section>
  );
}
