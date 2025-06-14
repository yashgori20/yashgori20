
export interface ProjectType {
  title: string;
  description: string;
  technologies: string[];
  codeUrl: string;
  liveUrl: string;
}

export interface ExperienceType {
  role: string;
  company: string;
  location: string;
  period: string;
  points: string[];
  technologies: string[];
}

export interface SkillType {
  name: string;
  level: number;
}
