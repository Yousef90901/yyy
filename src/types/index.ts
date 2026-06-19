export interface Profile {
  name: string;
  title: string;
  titleEn: string;
  bio: string;
  photo: string;
  email: string;
  phone: string;
  location: string;
  socialLinks: SocialLink[];
  resumeUrl: string;
  aboutTitle: string;
  aboutText: string[];
  stats: Stat[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface Stat {
  label: string;
  value: string;
  icon: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: number;
  icon: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  link?: string;
  github?: string;
  featured: boolean;
  date: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  description: string;
  startDate: string;
  endDate: string;
  current: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  avatar: string;
}

export interface SiteTheme {
  primary: string;
  secondary: string;
  accent: string;
  darkBg: string;
  lightBg: string;
}

export interface PortfolioData {
  profile: Profile;
  skills: Skill[];
  projects: Project[];
  experiences: Experience[];
  testimonials: Testimonial[];
  theme: SiteTheme;
  adminPassword: string;
}
