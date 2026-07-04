import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Sparkles, Download, Eye, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TEMPLATES } from '@/types/resume';
import TemplateCard from '@/components/TemplateCard';

const steps = [
  { icon: FileText, title: 'Choose a Template', desc: 'Pick from our professionally designed templates' },
  { icon: Sparkles, title: 'Fill Your Info', desc: 'Add your experience, skills, and education' },
  { icon: Eye, title: 'Preview Live', desc: 'See changes in real-time as you type' },
  { icon: Download, title: 'Download PDF', desc: 'Export your resume and start applying' },
];

const features = [
  'Multiple professional templates',
  'Real-time live preview',
  'One-click PDF download',
  'Auto-save progress',
  'Switch templates without losing data',
  'Mobile-friendly editor',
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg hero-gradient">
              <FileText className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-heading font-bold">ResumeForge</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/templates">
              <Button variant="ghost" size="sm">Templates</Button>
            </Link>
            <Link to="/builder">
              <Button size="sm">Start Building</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 hero-gradient opacity-[0.03]" />
        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground card-shadow">
              <Sparkles className="h-4 w-4 text-primary" />
              Free Resume Builder — No Sign Up Required
            </div>
            <h1 className="mb-6 text-4xl font-heading font-extrabold tracking-tight md:text-6xl lg:text-7xl">
              Create Your Professional Resume{' '}
              <span className="text-gradient">in Minutes</span>
            </h1>
            <p className="mb-10 text-lg text-muted-foreground md:text-xl">
              Choose from stunning templates, fill in your details, preview in real-time, and download as PDF. All for free.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link to="/builder">
                <Button size="lg" className="hero-gradient border-0 px-8 text-lg font-semibold text-primary-foreground glow">
                  Start Building
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/templates">
                <Button variant="outline" size="lg" className="px-8 text-lg">
                  View Templates
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Steps */}
      <section className="border-y border-border bg-card py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="mb-3 text-3xl font-heading font-bold md:text-4xl">How It Works</h2>
            <p className="text-muted-foreground">Four simple steps to your perfect resume</p>
          </motion.div>
          <div className="grid gap-8 md:grid-cols-4">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative text-center"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl hero-gradient">
                  <step.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <div className="mb-1 text-sm font-bold text-primary">Step {i + 1}</div>
                <h3 className="mb-2 text-lg font-heading font-semibold">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Showcase */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="mb-3 text-3xl font-heading font-bold md:text-4xl">Resume Templates</h2>
            <p className="text-muted-foreground">Choose from professionally designed templates</p>
          </motion.div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TEMPLATES.slice(0, 3).map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <TemplateCard template={t} />
              </motion.div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/templates">
              <Button variant="outline" size="lg">
                View All Templates
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-y border-border bg-card py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="mb-3 text-3xl font-heading font-bold md:text-4xl">Everything You Need</h2>
            <p className="mb-10 text-muted-foreground">Powerful features to create the perfect resume</p>
            <div className="grid grid-cols-1 gap-4 text-left sm:grid-cols-2">
              {features.map((f) => (
                <div key={f} className="flex items-center gap-3 rounded-lg border border-border bg-background p-4">
                  <CheckCircle className="h-5 w-5 shrink-0 text-accent" />
                  <span className="font-medium">{f}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl rounded-2xl hero-gradient p-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-heading font-bold text-primary-foreground md:text-4xl">
              Ready to Build Your Resume?
            </h2>
            <p className="mb-8 text-primary-foreground/80">
              Join thousands of job seekers who landed their dream job with our resume builder.
            </p>
            <Link to="/builder">
              <Button size="lg" variant="secondary" className="px-8 text-lg font-semibold">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} ResumeForge. Build your future, one resume at a time.
        </div>
      </footer>
    </div>
  );
};

export default Index;
