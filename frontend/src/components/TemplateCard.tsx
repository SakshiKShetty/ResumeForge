import { Link, useNavigate } from 'react-router-dom';
import { useResumeStore } from '@/store/resumeStore';
import { TemplateInfo } from '@/types/resume';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TemplateCard = ({ template }: { template: TemplateInfo }) => {
  const setTemplate = useResumeStore((s) => s.setTemplate);
  const navigate = useNavigate();

  const handleUse = () => {
    setTemplate(template.id);
    navigate('/builder');
  };

  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-card card-shadow transition-all duration-300 hover:card-shadow-hover hover:-translate-y-1">
      {/* Preview area */}
      <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
        <div className="absolute inset-4 rounded-lg bg-background p-4 shadow-sm">
          {/* Mini resume preview */}
          <div className="mb-3 flex items-center gap-2">
            <div className="h-8 w-8 rounded-full" style={{ backgroundColor: template.color }} />
            <div>
              <div className="h-2.5 w-20 rounded-full bg-foreground/20" />
              <div className="mt-1 h-2 w-14 rounded-full bg-foreground/10" />
            </div>
          </div>
          <div className="mb-2 h-1.5 w-full rounded-full" style={{ backgroundColor: template.color, opacity: 0.2 }} />
          <div className="space-y-1.5">
            <div className="h-2 w-full rounded-full bg-foreground/8" />
            <div className="h-2 w-4/5 rounded-full bg-foreground/8" />
            <div className="h-2 w-3/5 rounded-full bg-foreground/8" />
          </div>
          <div className="mt-3 h-1.5 w-16 rounded-full" style={{ backgroundColor: template.color, opacity: 0.3 }} />
          <div className="mt-2 space-y-1.5">
            <div className="h-2 w-full rounded-full bg-foreground/8" />
            <div className="h-2 w-3/4 rounded-full bg-foreground/8" />
          </div>
          <div className="mt-3 flex gap-1.5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-4 w-12 rounded-full" style={{ backgroundColor: template.color, opacity: 0.15 }} />
            ))}
          </div>
        </div>
      </div>
      {/* Info */}
      <div className="p-5">
        <h3 className="mb-1 font-heading font-semibold text-lg">{template.name}</h3>
        <p className="mb-4 text-sm text-muted-foreground">{template.description}</p>
        <Button onClick={handleUse} className="w-full" size="sm">
          Use Template <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default TemplateCard;
