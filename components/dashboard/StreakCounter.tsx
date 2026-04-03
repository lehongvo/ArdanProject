'use client';

import { useProgressStore } from '@/lib/progress-store';

export function StreakCounter() {
  const { studyStreak, lastStudyDate } = useProgressStore();
  const today = new Date().toISOString().split('T')[0];
  const studiedToday = lastStudyDate === today;

  const color = studyStreak >= 7 ? 'text-green-400' : studyStreak > 0 ? 'text-orange-400' : 'text-[#555]';

  return (
    <div className="card p-5 flex flex-col items-center justify-center text-center">
      <div className={`text-4xl mb-1 ${studyStreak === 0 ? 'grayscale opacity-30' : ''}`}>🔥</div>
      <p className={`text-3xl font-black ${color}`}>{studyStreak}</p>
      <p className="text-xs text-[#888] mt-1">ngày liên tiếp</p>
      {studiedToday && (
        <span className="mt-2 text-[10px] bg-green-500/10 text-green-400 px-2 py-0.5 rounded-full">
          Hôm nay ✓
        </span>
      )}
      {!studiedToday && studyStreak > 0 && (
        <span className="mt-2 text-[10px] bg-orange-500/10 text-orange-400 px-2 py-0.5 rounded-full">
          Học hôm nay để duy trì!
        </span>
      )}
    </div>
  );
}
