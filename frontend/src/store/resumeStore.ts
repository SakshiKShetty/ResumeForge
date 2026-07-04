import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ResumeData, TemplateId, DEFAULT_RESUME } from '@/types/resume';

interface ResumeStore {
  resumeData: ResumeData;
  selectedTemplate: TemplateId;
  setResumeData: (data: Partial<ResumeData>) => void;
  setPersonalInfo: (info: Partial<ResumeData['personalInfo']>) => void;
  setSummary: (summary: string) => void;
  addExperience: () => void;
  updateExperience: (id: string, data: Partial<ResumeData['experience'][0]>) => void;
  removeExperience: (id: string) => void;
  addEducation: () => void;
  updateEducation: (id: string, data: Partial<ResumeData['education'][0]>) => void;
  removeEducation: (id: string) => void;
  addSkill: (skill: string) => void;
  removeSkill: (skill: string) => void;
  addProject: () => void;
  updateProject: (id: string, data: Partial<ResumeData['projects'][0]>) => void;
  removeProject: (id: string) => void;
  addCertification: () => void;
  updateCertification: (id: string, data: Partial<ResumeData['certifications'][0]>) => void;
  removeCertification: (id: string) => void;
  setTemplate: (template: TemplateId) => void;
  resetResume: () => void;
}

const genId = () => crypto.randomUUID();

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      resumeData: DEFAULT_RESUME,
      selectedTemplate: 'modern',

      setResumeData: (data) => set((s) => ({ resumeData: { ...s.resumeData, ...data } })),
      
      setPersonalInfo: (info) => set((s) => ({
        resumeData: { ...s.resumeData, personalInfo: { ...s.resumeData.personalInfo, ...info } }
      })),

      setSummary: (summary) => set((s) => ({ resumeData: { ...s.resumeData, summary } })),

      addExperience: () => set((s) => ({
        resumeData: {
          ...s.resumeData,
          experience: [...s.resumeData.experience, { id: genId(), jobTitle: '', company: '', startDate: '', endDate: '', description: '' }]
        }
      })),
      updateExperience: (id, data) => set((s) => ({
        resumeData: {
          ...s.resumeData,
          experience: s.resumeData.experience.map((e) => e.id === id ? { ...e, ...data } : e)
        }
      })),
      removeExperience: (id) => set((s) => ({
        resumeData: { ...s.resumeData, experience: s.resumeData.experience.filter((e) => e.id !== id) }
      })),

      addEducation: () => set((s) => ({
        resumeData: {
          ...s.resumeData,
          education: [...s.resumeData.education, { id: genId(), degree: '', institution: '', year: '' }]
        }
      })),
      updateEducation: (id, data) => set((s) => ({
        resumeData: {
          ...s.resumeData,
          education: s.resumeData.education.map((e) => e.id === id ? { ...e, ...data } : e)
        }
      })),
      removeEducation: (id) => set((s) => ({
        resumeData: { ...s.resumeData, education: s.resumeData.education.filter((e) => e.id !== id) }
      })),

      addSkill: (skill) => set((s) => ({
        resumeData: { ...s.resumeData, skills: [...s.resumeData.skills, skill] }
      })),
      removeSkill: (skill) => set((s) => ({
        resumeData: { ...s.resumeData, skills: s.resumeData.skills.filter((sk) => sk !== skill) }
      })),

      addProject: () => set((s) => ({
        resumeData: {
          ...s.resumeData,
          projects: [...s.resumeData.projects, { id: genId(), name: '', description: '', link: '' }]
        }
      })),
      updateProject: (id, data) => set((s) => ({
        resumeData: {
          ...s.resumeData,
          projects: s.resumeData.projects.map((p) => p.id === id ? { ...p, ...data } : p)
        }
      })),
      removeProject: (id) => set((s) => ({
        resumeData: { ...s.resumeData, projects: s.resumeData.projects.filter((p) => p.id !== id) }
      })),

      addCertification: () => set((s) => ({
        resumeData: {
          ...s.resumeData,
          certifications: [...s.resumeData.certifications, { id: genId(), name: '', issuer: '', year: '' }]
        }
      })),
      updateCertification: (id, data) => set((s) => ({
        resumeData: {
          ...s.resumeData,
          certifications: s.resumeData.certifications.map((c) => c.id === id ? { ...c, ...data } : c)
        }
      })),
      removeCertification: (id) => set((s) => ({
        resumeData: { ...s.resumeData, certifications: s.resumeData.certifications.filter((c) => c.id !== id) }
      })),

      setTemplate: (template) => set({ selectedTemplate: template }),
      resetResume: () => set({ resumeData: DEFAULT_RESUME }),
    }),
    { name: 'resume-builder-storage' }
  )
);
