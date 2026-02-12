
export interface Student {
  studentId: string;
  fullName: string;
  classNo: string;
}

export interface AnalysisResult {
  totalScore: number;
  averageScore: number;
  strengths: string;
  improvements: string;
  comments: string;
  videoUrl?: string;
  scores: {
    posture: number;
    technique: number;
    agility: number;
    consistency: number;
    efficiency: number;
  };
}

export enum AppState {
  SEARCH,
  UPLOAD,
  ANALYZING,
  RESULT
}

export interface UploadData {
  studentId: string;
  fullName: string;
  classNo: string;
  subject: string;
  testType: string;
  file: File;
}
