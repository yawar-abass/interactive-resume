export interface ResumeData {
  name: string;
  title: string;
  summary?: string;
  skills: string[];
  experience: Experience[];
  projects?: Project[];
  education: Education[];
  certifications?: Certification[];
  awards?: Award[];
}
export interface Experience {
  company: string;
  role: string;
  duration: string;
  description: string;
}

export interface Education {
  degree: string;
  university: string;
  year: string;
  details?: string;
}

export interface Project {
  name: string;
  tech: string[];
  description: string;
}

export interface Certification {
  title: string;
  issuer: string;
  year: string;
}

export interface Award {
  name: string;
  year: string;
  description: string;
}

export type ResumeView = "cards" | "timeline" | "table";
