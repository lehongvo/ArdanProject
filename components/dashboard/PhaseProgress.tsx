'use client';

import Link from 'next/link';
import { useProgressStore, computePhaseProgress } from '@/lib/progress-store';
import { PHASES } from '@/lib/roadmap-data';
import { Lock } from 'lucide-react';

const PHASE_GRADIENTS: Record<number, [string, string]> = {
  1:  ['#F97316', '#EA580C'],
  2:  ['#F59E0B', '#D97706'],
  3:  ['#EF4444', '#DC2626'],
  4:  ['#EAB308', '#CA8A04'],
  5:  ['#8B5CF6', '#7C3AED'],
  6:  ['#7C3AED', '#6D28D9'],
  7:  ['#3B82F6', '#2563EB'],
  8:  ['#06B6D4', '#0891B2'],
  9:  ['#10B981', '#059669'],
  10: ['#EC4899', '#DB2777'],
};

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return '249,115,22';
  return `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}`;
}

export function PhaseProgress() {
  const { currentPhase, completedPhases, completedTasks } = useProgressStore();

  return (
    <div className="rounded-2xl p-5" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider" style={{ color: 'var(--muted)' }}>
          10 Giai Đoạn · 12 Tháng
        </h2>
        <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'var(--border)', color: 'var(--muted)' }}>
          {completedPhases.length}/10
        </span>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
        {PHASES.map((phase) => {
          const isCompleted = completedPhases.includes(phase.id);
          const isActive = phase.id === currentPhase;
          const isLocked = !isCompleted && !isActive;
          const total = phase.weeks.reduce((s, w) => s + w.tasks.length, 0);
          const pct = computePhaseProgress(phase.id, total, completedTasks);
          const [colorA, colorB] = PHASE_GRADIENTS[phase.id] ?? ['#F97316', '#EA580C'];
          const rgbA = hexToRgb(colorA);

          return (
            <Link
              key={phase.id}
              href={`/phase/${phase.id}`}
              className="relative rounded-xl p-3 flex-shrink-0 transition-all hover:scale-105"
              style={{
                minWidth: 120,
                background: isCompleted
                  ? 'rgba(16,185,129,0.08)'
                  : isActive
                    ? `rgba(${rgbA},0.1)`
                    : 'var(--bg)',
                border: isActive
                  ? `1px solid ${colorA}55`
                  : isCompleted
                    ? '1px solid rgba(16,185,129,0.3)'
                    : '1px solid var(--border)',
                opacity: isLocked ? 0.45 : 1,
                boxShadow: isActive ? `0 0 20px ${colorA}22` : 'none',
              }}
            >
              {isActive && (
                <div
                  className="absolute top-0 left-0 right-0 h-0.5 rounded-t-xl"
                  style={{ background: `linear-gradient(90deg, ${colorA}, ${colorB})` }}
                />
              )}

              {isCompleted && (
                <div className="absolute inset-0 rounded-xl bg-emerald-500/5 pointer-events-none" />
              )}

              {isLocked && (
                <div className="absolute top-2 right-2">
                  <Lock size={10} style={{ color: 'var(--muted)' }} />
                </div>
              )}

              <div
                className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold mb-2"
                style={{
                  background: isCompleted ? 'rgba(16,185,129,0.2)' : isLocked ? 'var(--border)' : `${colorA}22`,
                  color: isCompleted ? '#10B981' : isLocked ? 'var(--muted)' : colorA,
                }}
              >
                {isCompleted ? '\u2713' : phase.id}
              </div>

              <div className="text-2xl mb-1.5 leading-none">{phase.icon}</div>

              <p className="text-[10px] font-medium leading-tight" style={{ color: isLocked ? 'var(--muted)' : 'white' }}>
                {phase.shortName}
              </p>

              {isActive && (
                <span
                  className="mt-1.5 inline-flex items-center gap-1 text-[9px] font-semibold px-1.5 py-0.5 rounded-full"
                  style={{ background: `${colorA}22`, color: colorA }}
                >
                  Hien tai
                </span>
              )}

              {!isLocked && (
                <div className="mt-2 h-1 rounded-full" style={{ background: 'var(--border)' }}>
                  <div
                    className="h-1 rounded-full transition-all duration-700"
                    style={{
                      width: `${isCompleted ? 100 : pct}%`,
                      background: isCompleted
                        ? '#10B981'
                        : `linear-gradient(90deg, ${colorA}, ${colorB})`,
                    }}
                  />
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
