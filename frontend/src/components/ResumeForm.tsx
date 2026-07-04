import { useState, KeyboardEvent } from 'react';
import { useResumeStore } from '@/store/resumeStore';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, X, User, Briefcase, GraduationCap, Wrench, FolderOpen, Award } from 'lucide-react';

const Section = ({ title, icon: Icon, children }: { title: string; icon: any; children: React.ReactNode }) => (
  <div className="border-b border-border p-6">
    <div className="mb-4 flex items-center gap-2">
      <Icon className="h-5 w-5 text-primary" />
      <h2 className="font-heading font-semibold text-lg">{title}</h2>
    </div>
    {children}
  </div>
);

const ResumeForm = () => {
  const store = useResumeStore();
  const { resumeData } = store;
  const [skillInput, setSkillInput] = useState('');

  const handleSkillKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      e.preventDefault();
      store.addSkill(skillInput.trim());
      setSkillInput('');
    }
  };

  return (
    <div>
      {/* Personal Info */}
      <Section title="Personal Information" icon={User}>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label>Full Name</Label>
            <Input value={resumeData.personalInfo.fullName} onChange={(e) => store.setPersonalInfo({ fullName: e.target.value })} placeholder="John Doe" />
          </div>
          <div>
            <Label>Email</Label>
            <Input type="email" value={resumeData.personalInfo.email} onChange={(e) => store.setPersonalInfo({ email: e.target.value })} placeholder="john@example.com" />
          </div>
          <div>
            <Label>Phone</Label>
            <Input value={resumeData.personalInfo.phone} onChange={(e) => store.setPersonalInfo({ phone: e.target.value })} placeholder="+1 234 567 890" />
          </div>
          <div>
            <Label>Address</Label>
            <Input value={resumeData.personalInfo.address} onChange={(e) => store.setPersonalInfo({ address: e.target.value })} placeholder="New York, NY" />
          </div>
          <div>
            <Label>LinkedIn</Label>
            <Input value={resumeData.personalInfo.linkedin} onChange={(e) => store.setPersonalInfo({ linkedin: e.target.value })} placeholder="linkedin.com/in/johndoe" />
          </div>
          <div className="sm:col-span-2">
            <Label>Portfolio</Label>
            <Input value={resumeData.personalInfo.portfolio} onChange={(e) => store.setPersonalInfo({ portfolio: e.target.value })} placeholder="johndoe.com" />
          </div>
        </div>
      </Section>

      {/* Summary */}
      <Section title="Professional Summary" icon={User}>
        <Textarea
          value={resumeData.summary}
          onChange={(e) => store.setSummary(e.target.value)}
          placeholder="A brief summary of your professional background..."
          rows={4}
        />
      </Section>

      {/* Experience */}
      <Section title="Work Experience" icon={Briefcase}>
        {resumeData.experience.map((exp) => (
          <div key={exp.id} className="mb-4 rounded-lg border border-border p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Experience Entry</span>
              <Button variant="ghost" size="sm" onClick={() => store.removeExperience(exp.id)}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Input value={exp.jobTitle} onChange={(e) => store.updateExperience(exp.id, { jobTitle: e.target.value })} placeholder="Job Title" />
              <Input value={exp.company} onChange={(e) => store.updateExperience(exp.id, { company: e.target.value })} placeholder="Company" />
              <Input value={exp.startDate} onChange={(e) => store.updateExperience(exp.id, { startDate: e.target.value })} placeholder="Start Date" />
              <Input value={exp.endDate} onChange={(e) => store.updateExperience(exp.id, { endDate: e.target.value })} placeholder="End Date" />
              <div className="sm:col-span-2">
                <Textarea value={exp.description} onChange={(e) => store.updateExperience(exp.id, { description: e.target.value })} placeholder="Describe your responsibilities..." rows={3} />
              </div>
            </div>
          </div>
        ))}
        <Button variant="outline" onClick={store.addExperience} className="w-full">
          <Plus className="mr-1 h-4 w-4" /> Add Experience
        </Button>
      </Section>

      {/* Education */}
      <Section title="Education" icon={GraduationCap}>
        {resumeData.education.map((edu) => (
          <div key={edu.id} className="mb-4 rounded-lg border border-border p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Education Entry</span>
              <Button variant="ghost" size="sm" onClick={() => store.removeEducation(edu.id)}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Input value={edu.degree} onChange={(e) => store.updateEducation(edu.id, { degree: e.target.value })} placeholder="Degree" />
              <Input value={edu.institution} onChange={(e) => store.updateEducation(edu.id, { institution: e.target.value })} placeholder="Institution" />
              <Input value={edu.year} onChange={(e) => store.updateEducation(edu.id, { year: e.target.value })} placeholder="Year" />
            </div>
          </div>
        ))}
        <Button variant="outline" onClick={store.addEducation} className="w-full">
          <Plus className="mr-1 h-4 w-4" /> Add Education
        </Button>
      </Section>

      {/* Skills */}
      <Section title="Skills" icon={Wrench}>
        <div className="mb-3 flex flex-wrap gap-2">
          {resumeData.skills.map((skill) => (
            <span key={skill} className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              {skill}
              <button onClick={() => store.removeSkill(skill)}>
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
        <Input
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          onKeyDown={handleSkillKeyDown}
          placeholder="Type a skill and press Enter"
        />
      </Section>

      {/* Projects */}
      <Section title="Projects" icon={FolderOpen}>
        {resumeData.projects.map((proj) => (
          <div key={proj.id} className="mb-4 rounded-lg border border-border p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Project Entry</span>
              <Button variant="ghost" size="sm" onClick={() => store.removeProject(proj.id)}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
            <div className="grid gap-3">
              <Input value={proj.name} onChange={(e) => store.updateProject(proj.id, { name: e.target.value })} placeholder="Project Name" />
              <Textarea value={proj.description} onChange={(e) => store.updateProject(proj.id, { description: e.target.value })} placeholder="Description" rows={2} />
              <Input value={proj.link} onChange={(e) => store.updateProject(proj.id, { link: e.target.value })} placeholder="Project Link" />
            </div>
          </div>
        ))}
        <Button variant="outline" onClick={store.addProject} className="w-full">
          <Plus className="mr-1 h-4 w-4" /> Add Project
        </Button>
      </Section>

      {/* Certifications */}
      <Section title="Certifications" icon={Award}>
        {resumeData.certifications.map((cert) => (
          <div key={cert.id} className="mb-4 rounded-lg border border-border p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Certification Entry</span>
              <Button variant="ghost" size="sm" onClick={() => store.removeCertification(cert.id)}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Input value={cert.name} onChange={(e) => store.updateCertification(cert.id, { name: e.target.value })} placeholder="Certification Name" />
              <Input value={cert.issuer} onChange={(e) => store.updateCertification(cert.id, { issuer: e.target.value })} placeholder="Issuer" />
              <Input value={cert.year} onChange={(e) => store.updateCertification(cert.id, { year: e.target.value })} placeholder="Year" />
            </div>
          </div>
        ))}
        <Button variant="outline" onClick={store.addCertification} className="w-full">
          <Plus className="mr-1 h-4 w-4" /> Add Certification
        </Button>
      </Section>
    </div>
  );
};

export default ResumeForm;
