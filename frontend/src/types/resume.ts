export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  linkedin: string;
  portfolio: string;
}

export interface WorkExperience {
  id: string;
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  year: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  link: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  experience: WorkExperience[];
  education: Education[];
  skills: string[];
  projects: Project[];
  certifications: Certification[];
}

export type TemplateId = 'modern' | 'professional' | 'minimal' | 'creative' | 'ats' | 'elegant';

export interface TemplateInfo {
  id: TemplateId;
  name: string;
  description: string;
  color: string;
}

export const TEMPLATES: TemplateInfo[] = [
  { id: 'modern', name: 'Modern', description: 'Clean lines with a contemporary feel', color: 'hsl(217, 91%, 50%)' },
  { id: 'professional', name: 'Professional', description: 'Traditional layout for corporate roles', color: 'hsl(220, 25%, 20%)' },
  { id: 'minimal', name: 'Minimal', description: 'Simple and elegant design', color: 'hsl(0, 0%, 30%)' },
  { id: 'creative', name: 'Creative', description: 'Bold design for creative fields', color: 'hsl(280, 70%, 50%)' },
  { id: 'ats', name: 'ATS-Friendly', description: 'Optimized for applicant tracking systems', color: 'hsl(168, 75%, 35%)' },
  { id: 'elegant', name: 'Elegant', description: 'Sophisticated and refined layout', color: 'hsl(340, 65%, 47%)' },
];

export const DEFAULT_RESUME: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    linkedin: '',
    portfolio: '',
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
};
