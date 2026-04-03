'use client';

import { useProgressStore } from '@/lib/progress-store';

export function StreakCounter() {
  const { studyStreak, lastStudyDate } = useProgressStore();
  const today = new Date().toISOString().split('T')[0];
  const studiedToday = lastStudyDate === today;

  const level = studyStreak >= 30 ? 'legendary' : studyStreak >= 14 ? 'epic' : studyStreak >= 7 ? 'great' : studyStreak > 0 ? 'active' : 'inactive';
  const levelColors = {
    legendary: { text: '#F97316', bg: 'rgba(249,115,22,0.15)', border: 'rgba(249,115,22,0.3)' },
    epic:      { text: '#8B5CF6', bg: 'rgba(139,92,246,0.15)', border: 'rgba(139,92,246,0.3)' },
    great:     { text: '#10B981', bg: 'rgba(16,185,129,0.15)', border: 'rgba(16,185,129,0.3)' },
    active:    { text: '#F59E0B', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.25)' },
    inactive:  { text: 'var(--muted)', bg: 'var(--bg)', border: 'var(--border)' },
  };
  const colors = levelColors[level];

  return (
    <div
      className="rounded-2xl p-5 flex flex-col items-center justify-center text-center relative overflow-hidden"
      style={{ background: 'var(--card)', border: `1px solid ${colors.border}` }}
    >
      {/* Subtle gradient bg */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: colors.bg, opacity: 0.5 }} />

      <div className="relative">
        {/* Fire icon */}
        <div className={`text-4xl mb-2 ${studyStreak > 0 ? 'fire-animate' : 'opacity-20 grayscale'}`}>
          🔥
        </div>

        {/* Streak number */}
        <p className="text-4xl font-black leading-none" style={{ color: colors.text }}>
          {studyStreak}
        </p>
        <p className="text-xs mt-1 font-medium text-white/70">ngày liên tiếp</p>

        {/* Status badge */}
        <div className="mt-3">
          {studiedToday ? (
            <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400">
              Hôm nay ✓
            </span>
          ) : studyStreak > 0 ? (
            <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-orange-500/15 text-orange-400">
              Học hôm nay!
            </span>
          ) : (
            <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full" style={{ background: 'var(--border)', color: 'var(--muted)' }}>
              Chưa bắt đầu
            </span>
          )}
        </div>

        {/* Level label */}
        {studyStreak >= 7 && (
          <p className="text-[9px] mt-2 font-bold uppercase tracking-widest" style={{ color: colors.text }}>
            {level === 'legendary' ? '🌟 Legendary' : level === 'epic' ? '💜 Epic' : '✨ Great'}
          </p>
        )}
      </div>
    </div>
  );
}
