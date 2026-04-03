'use client';

import { CheckCircle2, Code2, Brain, Flame, TrendingUp } from 'lucide-react';
import { useProgressStore, getLeetcodeStats, getMockAverage } from '@/lib/progress-store';

const STAT_CONFIGS = [
  {
    key: 'tasks',
    icon: CheckCircle2,
    label: 'Tasks Xong',
    subtitle: 'hoàn thành',
    gradient: 'from-emerald-500/20 to-emerald-600/10',
    iconGradient: 'from-emerald-500 to-emerald-600',
    textColor: 'text-emerald-400',
    borderColor: 'rgba(16,185,129,0.2)',
  },
  {
    key: 'leetcode',
    icon: Code2,
    label: 'LeetCode',
    subtitle: '/ 1000 bài',
    gradient: 'from-yellow-500/20 to-yellow-600/10',
    iconGradient: 'from-yellow-500 to-yellow-600',
    textColor: 'text-yellow-400',
    borderColor: 'rgba(245,158,11,0.2)',
  },
  {
    key: 'mock',
    icon: Brain,
    label: 'Mock Avg',
    subtitle: '% điểm',
    gradient: 'from-purple-500/20 to-purple-600/10',
    iconGradient: 'from-purple-500 to-purple-600',
    textColor: 'text-purple-400',
    borderColor: 'rgba(139,92,246,0.2)',
  },
  {
    key: 'streak',
    icon: Flame,
    label: 'Streak',
    subtitle: 'ngày liên tiếp',
    gradient: 'from-orange-500/20 to-orange-600/10',
    iconGradient: 'from-orange-500 to-orange-600',
    textColor: 'text-orange-400',
    borderColor: 'rgba(249,115,22,0.2)',
  },
];

export function QuickStats() {
  const { completedTasks, leetcodeProblems, mockExamResults, studyStreak } = useProgressStore();
  const lc = getLeetcodeStats(leetcodeProblems);
  const mockAvg = getMockAverage(mockExamResults);

  const values: Record<string, number> = {
    tasks: completedTasks.length,
    leetcode: lc.done,
    mock: mockAvg,
    streak: studyStreak,
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {STAT_CONFIGS.map((cfg) => {
        const Icon = cfg.icon;
        const val = values[cfg.key] ?? 0;
        return (
          <div
            key={cfg.key}
            className="relative rounded-2xl p-4 overflow-hidden"
            style={{
              background: 'var(--card)',
              border: `1px solid ${cfg.borderColor}`,
            }}
          >
            {/* Gradient bg */}
            <div className={`absolute inset-0 bg-gradient-to-br ${cfg.gradient} opacity-60 pointer-events-none`} />

            <div className="relative">
              {/* Icon with gradient bg */}
              <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${cfg.iconGradient} flex items-center justify-center mb-3`}>
                <Icon size={15} className="text-white" />
              </div>

              {/* Value */}
              <p className="text-2xl font-black text-white leading-none">
                {val}
              </p>

              {/* Label + subtitle */}
              <p className="text-xs font-medium text-white/70 mt-0.5">{cfg.label}</p>
              <p className="text-[10px] mt-0.5" style={{ color: 'var(--muted)' }}>{cfg.subtitle}</p>

              {/* Trend indicator for streak */}
              {cfg.key === 'streak' && val >= 3 && (
                <div className="absolute top-0 right-0 flex items-center gap-0.5 text-[10px] text-emerald-400">
                  <TrendingUp size={10} />
                  <span>+{val}</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
