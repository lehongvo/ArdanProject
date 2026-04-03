export type PhaseId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type PhaseStatus = 'locked' | 'active' | 'completed';

export type TaskStatus = 'pending' | 'in-progress' | 'done' | 'skipped';

export interface DailyTask {
  id: string;
  phaseId: PhaseId;
  week: number;
  day: number; // 1-7
  title: string;
  description: string;
  estimatedHours: number;
  type: 'reading' | 'coding' | 'video' | 'exercise' | 'project' | 'exam' | 'leetcode';
  resource?: {
    url: string;
    label: string;
    platform: 'udemy' | 'ardan' | 'leetcode' | 'github' | 'docs' | 'youtube' | 'custom';
  };
  status: TaskStatus;
  completedAt?: string;
  notes?: string;
}

export interface Phase {
  id: PhaseId;
  name: string;
  shortName: string;
  duration: string;
  totalWeeks: number;
  description: string;
  goal: string;
  color: string;
  icon: string;
  skills: string[];
  weeks: Week[];
  status: PhaseStatus;
  completedAt?: string;
}

export interface Week {
  weekNumber: number;
  phaseWeek: number;
  phaseId: PhaseId;
  title: string;
  goal: string;
  tasks: DailyTask[];
  isCompleted: boolean;
}

export interface LeetCodeProblem {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  url: string;
  done: boolean;
  doneAt?: string;
  notes?: string;
}

export interface SolanaProject {
  id: number;
  name: string;
  description: string;
  skills: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedDays: number;
  objectives: string[];
  anchorConcepts: string[];
  successCriteria: string[];
  githubUrl?: string;
  status: 'not-started' | 'in-progress' | 'completed' | 'deployed';
  startedAt?: string;
  completedAt?: string;
  deployedUrl?: string;
  notes?: string;
}

export interface MockExamResult {
  id: string;
  examType: 'rust-foundation' | 'zk-cert' | 'ardan-rust' | 'custom';
  date: string;
  score: number;
  totalQuestions: number;
  timeUsed: number;
  wrongTopics: string[];
  passed: boolean;
}

export interface ExamQuestion {
  id: string;
  examType: 'rust-foundation' | 'zk-cert' | 'ardan-rust';
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options: { A: string; B: string; C: string; D: string };
  answer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
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
  tags: string[];
}

export interface AppState {
  startDate: string;
  currentPhase: PhaseId;
  completedPhases: PhaseId[];
  completedWeeks: number[];
  completedTasks: string[];
  taskNotes: Record<string, string>;
  phaseRatings: Record<number, 1 | 2 | 3 | 4 | 5>;
  leetcodeProblems: Record<number, { done: boolean; doneAt?: string; notes?: string }>;
  solanaProjects: Record<number, Partial<SolanaProject>>;
  mockExamResults: MockExamResult[];
  jobApplications: JobApplication[];
  studyStreak: number;
  lastStudyDate: string;
  settings: {
    dailyHours: number;
    startHour: number;
    theme: 'dark' | 'light';
  };
  completeTask: (taskId: string) => void;
  completeWeek: (weekId: number) => void;
  completePhase: (phaseId: PhaseId) => void;
  toggleLeetcode: (problemId: number) => void;
  updateProject: (projectId: number, data: Partial<SolanaProject>) => void;
  addMockResult: (result: MockExamResult) => void;
  addJob: (job: JobApplication) => void;
  updateJob: (id: string, status: JobApplication['status']) => void;
  removeJob: (id: string) => void;
  updateStreak: () => void;
  setStartDate: (date: string) => void;
  updateTaskNotes: (taskId: string, notes: string) => void;
}
