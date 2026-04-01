export type Phase = 'foundation' | 'intermediate' | 'advanced' | 'exam-prep' | 'job-hunt' | 'interview-prep';
export type DayStatus = 'locked' | 'available' | 'in-progress' | 'completed';

export interface Lesson {
  id: string;
  title: string;
  duration: number;
  type: 'video' | 'reading' | 'coding' | 'exercise' | 'quiz' | 'project';
  resource: {
    platform: 'udemy' | 'rustbook' | 'ardan' | 'docs' | 'github' | 'custom';
    url: string;
    title: string;
    section?: string;
  };
  description: string;
  objectives: string[];
  codeExercise?: {
    prompt: string;
    starterCode: string;
    hint?: string;
  };
}

export interface DayPlan {
  id: number;
  phase: Phase;
  week: number;
  date?: string;
  title: string;
  goal: string;
  targetSkills: string[];
  lessons: Lesson[];
  dailyChallenge: {
    title: string;
    description: string;
    estimatedTime: number;
  };
  reviewTopics: string[];
  status: DayStatus;
  completedAt?: string;
  notes?: string;
  rating?: 1 | 2 | 3 | 4 | 5;
}

export interface MockExamResult {
  id: string;
  date: string;
  score: number;
  totalQuestions: number;
  timeUsed: number;
  wrongTopics: string[];
  passed: boolean;
}

export interface JobApplication {
  id: string;
  company: string;
  position: string;
  salary?: string;
  url: string;
  status: 'bookmarked' | 'applied' | 'interview' | 'offer' | 'rejected';
  appliedDate?: string;
  notes: string;
  platform: 'web3.career' | 'wellfound' | 'remote3' | 'linkedin' | 'other';
}

export interface ExamQuestion {
  id: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options: { A: string; B: string; C: string; D: string };
  answer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  reference?: string;
}

export interface AppState {
  startDate: string;
  currentDay: number;
  completedDays: number[];
  dayNotes: Record<number, string>;
  dayRatings: Record<number, 1 | 2 | 3 | 4 | 5>;
  lessonProgress: Record<string, boolean>;
  mockExamResults: MockExamResult[];
  jobApplications: JobApplication[];
  settings: {
    dailyHours: number;
    startHour: number;
    notifications: boolean;
    theme: 'dark' | 'light';
  };
}
