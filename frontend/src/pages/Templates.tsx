import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TEMPLATES } from '@/types/resume';
import TemplateCard from '@/components/TemplateCard';

const Templates = () => {
  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg hero-gradient">
              <FileText className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-heading font-bold">ResumeForge</span>
          </Link>
          <Link to="/builder">
            <Button size="sm">Start Building</Button>
          </Link>
        </div>
      </nav>

      <section className="py-16">
        <div className="container">
          <Link to="/" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <h1 className="mb-3 text-3xl font-heading font-bold md:text-4xl">Choose Your Template</h1>
            <p className="text-muted-foreground">Select a template to start building your professional resume</p>
          </motion.div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TEMPLATES.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <TemplateCard template={t} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Templates;
