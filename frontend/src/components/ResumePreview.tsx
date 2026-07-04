import { useResumeStore } from '@/store/resumeStore';
import ModernTemplate from '@/components/templates/ModernTemplate';
import ProfessionalTemplate from '@/components/templates/ProfessionalTemplate';
import MinimalTemplate from '@/components/templates/MinimalTemplate';
import CreativeTemplate from '@/components/templates/CreativeTemplate';
import AtsTemplate from '@/components/templates/AtsTemplate';
import ElegantTemplate from '@/components/templates/ElegantTemplate';

const templateMap = {
  modern: ModernTemplate,
  professional: ProfessionalTemplate,
  minimal: MinimalTemplate,
  creative: CreativeTemplate,
  ats: AtsTemplate,
  elegant: ElegantTemplate,
};

const ResumePreview = () => {
  const { resumeData, selectedTemplate } = useResumeStore();
  const Template = templateMap[selectedTemplate];

  return (
    <div id="resume-preview" className="bg-white text-gray-900 shadow-lg" style={{ width: '210mm', minHeight: '297mm', margin: '0 auto' }}>
      <Template data={resumeData} />
    </div>
  );
};

export default ResumePreview;
