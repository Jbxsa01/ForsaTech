export interface ExperienceItem {
  company: string;
  position: string;
  duration: string;
  description: string;
}

export interface EducationItem {
  school: string;
  degree: string;
  duration: string;
  description: string;
}

export interface ProfileData {
  userId?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  dateOfBirth: string;
  bio: string;
  currentPosition: string;
  company: string;
  experience: string;
  website: string;
  linkedin: string;
  github: string;
  profileImage?: string;
  
  // CV fields
  address: string;
  summary: string;
  experienceJson: string; // JSON array of ExperienceItem[]
  educationJson: string; // JSON array of EducationItem[]
  skills: string;
  languages: string;
}
