import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export function getDaysSince(dateStr: string): number {
  const start = new Date(dateStr)
  const now = new Date()
  const diff = now.getTime() - start.getTime()
  return Math.floor(diff / (1000 * 60 * 60 * 24))
}

export function getCurrentPhaseAndWeek(
  startDate: string,
  dailyHours: number = 4
): { phase: number; week: number; day: number } {
  const daysSince = getDaysSince(startDate)
  // 4 weeks per phase for most phases, but some have 8 weeks
  // Phase durations in weeks: [4,4,4,4,4,8,4,4,8,4] = 52 weeks total
  const phaseDurationsWeeks = [4, 4, 4, 4, 4, 8, 4, 4, 8, 4]
  const weekNumber = Math.floor(daysSince / 7) + 1
  let cumulativeWeeks = 0
  for (let i = 0; i < phaseDurationsWeeks.length; i++) {
    cumulativeWeeks += phaseDurationsWeeks[i]
    if (weekNumber <= cumulativeWeeks) {
      const phaseStartWeek = cumulativeWeeks - phaseDurationsWeeks[i]
      const weekInPhase = weekNumber - phaseStartWeek
      const dayInWeek = (daysSince % 7) + 1
      return { phase: i + 1, week: weekInPhase, day: dayInWeek }
    }
  }
  return { phase: 10, week: 4, day: 7 }
}

export function getPhaseColor(phaseId: number): string {
  const colors: Record<number, string> = {
    1: "#F97316",
    2: "#F59E0B",
    3: "#EF4444",
    4: "#EAB308",
    5: "#8B5CF6",
    6: "#7C3AED",
    7: "#3B82F6",
    8: "#06B6D4",
    9: "#10B981",
    10: "#EC4899",
  }
  return colors[phaseId] ?? "#6B7280"
}

export function getPhaseColorClass(phaseId: number): string {
  const colors: Record<number, string> = {
    1: "text-orange-500",
    2: "text-amber-500",
    3: "text-red-500",
    4: "text-yellow-500",
    5: "text-violet-500",
    6: "text-violet-700",
    7: "text-blue-500",
    8: "text-cyan-500",
    9: "text-emerald-500",
    10: "text-pink-500",
  }
  return colors[phaseId] ?? "text-gray-500"
}

export function getPhaseBgClass(phaseId: number): string {
  const colors: Record<number, string> = {
    1: "bg-orange-500/10 border-orange-500/30",
    2: "bg-amber-500/10 border-amber-500/30",
    3: "bg-red-500/10 border-red-500/30",
    4: "bg-yellow-500/10 border-yellow-500/30",
    5: "bg-violet-500/10 border-violet-500/30",
    6: "bg-violet-700/10 border-violet-700/30",
    7: "bg-blue-500/10 border-blue-500/30",
    8: "bg-cyan-500/10 border-cyan-500/30",
    9: "bg-emerald-500/10 border-emerald-500/30",
    10: "bg-pink-500/10 border-pink-500/30",
  }
  return colors[phaseId] ?? "bg-gray-500/10 border-gray-500/30"
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 9)
}
