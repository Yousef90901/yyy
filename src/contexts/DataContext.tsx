import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { PortfolioData, Skill, Project, Experience, Testimonial, Profile, defaultData } from '../data/defaultData';

interface DataContextType {
  data: PortfolioData;
  updateProfile: (profile: Profile) => void;
  updateTheme: (theme: Partial<PortfolioData['theme']>) => void;
  addSkill: (skill: Skill) => void;
  updateSkill: (id: string, skill: Partial<Skill>) => void;
  deleteSkill: (id: string) => void;
  addProject: (project: Project) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  addExperience: (exp: Experience) => void;
  updateExperience: (id: string, exp: Partial<Experience>) => void;
  deleteExperience: (id: string) => void;
  addTestimonial: (t: Testimonial) => void;
  updateTestimonial: (id: string, t: Partial<Testimonial>) => void;
  deleteTestimonial: (id: string) => void;
  resetData: () => void;
}

const DataContext = createContext<DataContextType | null>(null);

const STORAGE_KEY = 'yt_portfolio_data';
const DATA_VERSION = 2;

function loadData(): PortfolioData {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed._version === DATA_VERSION) return parsed;
    }
  } catch {}
  const fresh = { ...defaultData, _version: DATA_VERSION };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
  return fresh;
}

function saveData(data: PortfolioData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function DataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<PortfolioData>(loadData);

  useEffect(() => { saveData(data); }, [data]);

  const updateProfile = (profile: Profile) => setData(prev => ({ ...prev, profile }));
  const updateTheme = (theme: Partial<PortfolioData['theme']>) => setData(prev => ({ ...prev, theme: { ...prev.theme, ...theme } }));

  const addSkill = (skill: Skill) => setData(prev => ({ ...prev, skills: [...prev.skills, skill] }));
  const updateSkill = (id: string, upd: Partial<Skill>) => setData(prev => ({ ...prev, skills: prev.skills.map(s => s.id === id ? { ...s, ...upd } : s) }));
  const deleteSkill = (id: string) => setData(prev => ({ ...prev, skills: prev.skills.filter(s => s.id !== id) }));

  const addProject = (project: Project) => setData(prev => ({ ...prev, projects: [...prev.projects, project] }));
  const updateProject = (id: string, upd: Partial<Project>) => setData(prev => ({ ...prev, projects: prev.projects.map(p => p.id === id ? { ...p, ...upd } : p) }));
  const deleteProject = (id: string) => setData(prev => ({ ...prev, projects: prev.projects.filter(p => p.id !== id) }));

  const addExperience = (exp: Experience) => setData(prev => ({ ...prev, experiences: [...prev.experiences, exp] }));
  const updateExperience = (id: string, upd: Partial<Experience>) => setData(prev => ({ ...prev, experiences: prev.experiences.map(e => e.id === id ? { ...e, ...upd } : e) }));
  const deleteExperience = (id: string) => setData(prev => ({ ...prev, experiences: prev.experiences.filter(e => e.id !== id) }));

  const addTestimonial = (t: Testimonial) => setData(prev => ({ ...prev, testimonials: [...prev.testimonials, t] }));
  const updateTestimonial = (id: string, upd: Partial<Testimonial>) => setData(prev => ({ ...prev, testimonials: prev.testimonials.map(t => t.id === id ? { ...t, ...upd } : t) }));
  const deleteTestimonial = (id: string) => setData(prev => ({ ...prev, testimonials: prev.testimonials.filter(t => t.id !== id) }));

  const resetData = () => {
    const fresh = { ...defaultData, _version: DATA_VERSION };
    setData(fresh);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
  };

  return (
    <DataContext.Provider value={{ data, updateProfile, updateTheme, addSkill, updateSkill, deleteSkill, addProject, updateProject, deleteProject, addExperience, updateExperience, deleteExperience, addTestimonial, updateTestimonial, deleteTestimonial, resetData }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
}
