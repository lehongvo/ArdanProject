'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AppState, PhaseId, SolanaProject, MockExamResult, JobApplication } from '@/types';

export const useProgressStore = create<AppState>()(
  persist(
    (set, get) => ({
      startDate: '',
      currentPhase: 1,
      completedPhases: [],
      completedWeeks: [],
      completedTasks: [],
      completedTaskDates: {},
      taskNotes: {},
      phaseRatings: {} as Record<number, 1 | 2 | 3 | 4 | 5>,
      leetcodeProblems: {},
      solanaProjects: {},
      mockExamResults: [],
      jobApplications: [],
      studyStreak: 0,
      lastStudyDate: '',
      settings: {
        dailyHours: 4,
        startHour: 8,
        theme: 'dark',
      },

      setStartDate: (date: string) => set({ startDate: date }),

      completeTask: (taskId: string) =>
        set((state) => {
          if (state.completedTasks.includes(taskId)) return state;
          const completedTasks = [...state.completedTasks, taskId];
          const today = new Date().toISOString().split('T')[0];
          const completedTaskDates = { ...state.completedTaskDates, [taskId]: today };
          return { completedTasks, completedTaskDates, ...updateStreak(state) };
        }),

      completeWeek: (weekId: number) =>
        set((state) => {
          if (state.completedWeeks.includes(weekId)) return state;
          return { completedWeeks: [...state.completedWeeks, weekId] };
        }),

      completePhase: (phaseId: PhaseId) =>
        set((state) => {
          if (state.completedPhases.includes(phaseId)) return state;
          const completedPhases = [...state.completedPhases, phaseId];
          const nextPhase = (phaseId < 10 ? phaseId + 1 : phaseId) as PhaseId;
          return { completedPhases, currentPhase: nextPhase };
        }),

      toggleLeetcode: (problemId: number) =>
        set((state) => {
          const current = state.leetcodeProblems[problemId];
          const done = !current?.done;
          return {
            leetcodeProblems: {
              ...state.leetcodeProblems,
              [problemId]: { done, doneAt: done ? new Date().toISOString() : undefined },
            },
            ...(done ? updateStreak(state) : {}),
          };
        }),

      updateProject: (projectId: number, data: Partial<SolanaProject>) =>
        set((state) => ({
          solanaProjects: {
            ...state.solanaProjects,
            [projectId]: { ...state.solanaProjects[projectId], ...data },
          },
        })),

      addMockResult: (result: MockExamResult) =>
        set((state) => ({ mockExamResults: [result, ...state.mockExamResults] })),

      addJob: (job: JobApplication) =>
        set((state) => ({ jobApplications: [job, ...state.jobApplications] })),

      updateJob: (id: string, status: JobApplication['status']) =>
        set((state) => ({
          jobApplications: state.jobApplications.map((j) =>
            j.id === id ? { ...j, status } : j
          ),
        })),

      removeJob: (id: string) =>
        set((state) => ({
          jobApplications: state.jobApplications.filter((j) => j.id !== id),
        })),

      updateStreak: () => set((state) => updateStreak(state)),

      updateTaskNotes: (taskId: string, notes: string) =>
        set((state) => ({ taskNotes: { ...state.taskNotes, [taskId]: notes } })),
    }),
    {
      name: 'blockchain-roadmap-progress',
      version: 1,
    }
  )
);

function updateStreak(state: AppState): Partial<AppState> {
  const today = new Date().toISOString().split('T')[0];
  if (state.lastStudyDate === today) return {};
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  const streak = state.lastStudyDate === yesterday ? state.studyStreak + 1 : 1;
  return { studyStreak: streak, lastStudyDate: today };
}

export function computePhaseProgress(
  phaseId: PhaseId,
  totalTasks: number,
  completedTasks: string[]
): number {
  if (totalTasks === 0) return 0;
  const done = completedTasks.filter((id) => id.startsWith(`p${phaseId}w`)).length;
  return Math.round((done / totalTasks) * 100);
}

export function getLeetcodeStats(problems: AppState['leetcodeProblems']) {
  const entries = Object.values(problems);
  const done = entries.filter((p) => p.done).length;
  return { done, total: 1000, percent: Math.round((done / 1000) * 100) };
}

export function getMockAverage(results: MockExamResult[]): number {
  if (results.length === 0) return 0;
  return Math.round(results.reduce((sum, r) => sum + (r.score / r.totalQuestions) * 100, 0) / results.length);
}
