'use client';

import { CheckCircle2, Code2, Brain, Flame } from 'lucide-react';
import { useProgressStore, getLeetcodeStats, getMockAverage } from '@/lib/progress-store';

export function QuickStats() {
  const { completedTasks, leetcodeProblems, mockExamResults, studyStreak } = useProgressStore();
  const lc = getLeetcodeStats(leetcodeProblems);
  const mockAvg = getMockAverage(mockExamResults);

  const stats = [
    { icon: CheckCircle2, label: 'Tasks Xong', value: completedTasks.length, color: 'text-green-400', suffix: '' },
    { icon: Code2, label: 'LeetCode', value: lc.done, color: 'text-yellow-400', suffix: '/1000' },
    { icon: Brain, label: 'Mock Avg', value: mockAvg, color: 'text-purple-400', suffix: '%' },
    { icon: Flame, label: 'Streak', value: studyStreak, color: 'text-orange-400', suffix: ' ngày' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {stats.map(({ icon: Icon, label, value, color, suffix }) => (
        <div key={label} className="card p-4">
          <Icon size={18} className={`${color} mb-2`} />
          <p className="text-2xl font-black text-white">
            {value}
            <span className="text-sm font-normal text-[#888]">{suffix}</span>
          </p>
          <p className="text-xs text-[#888] mt-0.5">{label}</p>
        </div>
      ))}
    </div>
  );
}
