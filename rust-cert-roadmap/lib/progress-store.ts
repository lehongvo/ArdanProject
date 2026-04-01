import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MockExamResult, JobApplication } from '@/types';

interface AppStore {
  // State
  startDate: string;
  currentDay: number;
  completedDays: number[];
  dayNotes: Record<number, string>;
  dayRatings: Record<number, 1 | 2 | 3 | 4 | 5>;
  lessonProgress: Record<string, boolean>;
  mockExamResults: MockExamResult[];
  jobApplications: JobApplication[];
  streak: number;
  settings: {
    dailyHours: number;
    startHour: number;
    notifications: boolean;
    theme: 'dark' | 'light';
  };

  // Actions
  setStartDate: (date: string) => void;
  completeDay: (dayId: number) => void;
  setDayNote: (dayId: number, note: string) => void;
  setDayRating: (dayId: number, rating: 1 | 2 | 3 | 4 | 5) => void;
  toggleLesson: (lessonId: string) => void;
  addMockExamResult: (result: MockExamResult) => void;
  addJobApplication: (job: JobApplication) => void;
  updateJobStatus: (jobId: string, status: JobApplication['status']) => void;
  removeJobApplication: (jobId: string) => void;
  updateSettings: (settings: Partial<AppStore['settings']>) => void;
  isDayAvailable: (dayId: number) => boolean;
  getDayStatus: (dayId: number) => 'locked' | 'available' | 'in-progress' | 'completed';
  calculateStreak: () => number;
  resetProgress: () => void;
}

const initialState = {
  startDate: new Date().toISOString().split('T')[0],
  currentDay: 1,
  completedDays: [] as number[],
  dayNotes: {} as Record<number, string>,
  dayRatings: {} as Record<number, 1 | 2 | 3 | 4 | 5>,
  lessonProgress: {} as Record<string, boolean>,
  mockExamResults: [] as MockExamResult[],
  jobApplications: [] as JobApplication[],
  streak: 0,
  settings: {
    dailyHours: 4,
    startHour: 9,
    notifications: true,
    theme: 'dark' as const,
  },
};

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      setStartDate: (date: string) => {
        set({ startDate: date });
      },

      completeDay: (dayId: number) => {
        set((state) => {
          const completedDays = state.completedDays.includes(dayId)
            ? state.completedDays
            : [...state.completedDays, dayId];
          const currentDay = dayId + 1;
          const newState = { completedDays, currentDay, streak: 0 };
          // Calculate streak inline
          let streak = 0;
          for (let d = currentDay - 1; d >= 1; d--) {
            if (completedDays.includes(d)) {
              streak++;
            } else {
              break;
            }
          }
          newState.streak = streak;
          return newState;
        });
      },

      setDayNote: (dayId: number, note: string) => {
        set((state) => ({
          dayNotes: { ...state.dayNotes, [dayId]: note },
        }));
      },

      setDayRating: (dayId: number, rating: 1 | 2 | 3 | 4 | 5) => {
        set((state) => ({
          dayRatings: { ...state.dayRatings, [dayId]: rating },
        }));
      },

      toggleLesson: (lessonId: string) => {
        set((state) => ({
          lessonProgress: {
            ...state.lessonProgress,
            [lessonId]: !state.lessonProgress[lessonId],
          },
        }));
      },

      addMockExamResult: (result: MockExamResult) => {
        set((state) => ({
          mockExamResults: [...state.mockExamResults, result],
        }));
      },

      addJobApplication: (job: JobApplication) => {
        set((state) => ({
          jobApplications: [...state.jobApplications, job],
        }));
      },

      updateJobStatus: (jobId: string, status: JobApplication['status']) => {
        set((state) => ({
          jobApplications: state.jobApplications.map((job) =>
            job.id === jobId ? { ...job, status } : job
          ),
        }));
      },

      removeJobApplication: (jobId: string) => {
        set((state) => ({
          jobApplications: state.jobApplications.filter((job) => job.id !== jobId),
        }));
      },

      updateSettings: (newSettings: Partial<AppStore['settings']>) => {
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        }));
      },

      isDayAvailable: (dayId: number) => {
        if (dayId === 1) return true;
        const { completedDays } = get();
        return completedDays.includes(dayId - 1);
      },

      getDayStatus: (dayId: number) => {
        const { completedDays, currentDay, lessonProgress } = get();
        if (completedDays.includes(dayId)) {
          return 'completed';
        }
        if (dayId === currentDay) {
          const hasProgress = Object.keys(lessonProgress).some(
            (key) => key.startsWith(`${dayId}-`) && lessonProgress[key]
          );
          if (hasProgress) {
            return 'in-progress';
          }
        }
        if (get().isDayAvailable(dayId)) {
          return 'available';
        }
        return 'locked';
      },

      calculateStreak: () => {
        const { currentDay, completedDays } = get();
        let streak = 0;
        for (let d = currentDay - 1; d >= 1; d--) {
          if (completedDays.includes(d)) {
            streak++;
          } else {
            break;
          }
        }
        set({ streak });
        return streak;
      },

      resetProgress: () => {
        set({
          ...initialState,
          startDate: new Date().toISOString().split('T')[0],
        });
      },
    }),
    {
      name: 'rust-cert-progress',
    }
  )
);
