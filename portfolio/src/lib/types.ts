export interface Hero {
  name: string;
  role: string;
  tagline: string;
  profileImage?: string;
  resumeUrl?: string;
  ctaButtons?: {
    viewProjectsLabel?: string;
    contactLabel?: string;
    resumeLabel?: string;
  };
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
  grade?: string;
}

export interface About {
  bio: string;
  education: Education[];
  experienceSummary?: string;
  technologies: string[];
  careerGoals?: string;
}

export interface Skill {
  _id: string;
  name: string;
  category: "Frontend" | "Backend" | "Database" | "Mobile" | "Tools" | "Other";
  icon?: string;
  proficiency: number;
  order: number;
}

export interface Experience {
  _id: string;
  role: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  points: string[];
  order: number;
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  images: string[];
  techStack: string[];
  features: string[];
  githubLink?: string;
  liveLink?: string;
  videoLink?: string;
  caseStudyLink?: string;
  featured: boolean;
  order: number;
}

export interface Certification {
  _id: string;
  title: string;
  issuer: string;
  date: string;
  image?: string;
  credentialUrl?: string;
  order: number;
}

export interface Achievement {
  _id: string;
  label: string;
  value: number;
  suffix?: string;
  icon?: string;
  order: number;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  location?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
}
