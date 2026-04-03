'use client';

import Link from 'next/link';
import { useProgressStore, computePhaseProgress } from '@/lib/progress-store';
import { PHASES } from '@/lib/roadmap-data';

export function PhaseProgress() {
  const { currentPhase, completedPhases, completedTasks } = useProgressStore();

  return (
    <div className="card p-5">
      <h2 className="text-sm font-semibold text-[#888] uppercase tracking-wider mb-4">
        10 Giai Đoạn · 12 Tháng
      </h2>
      <div className="grid grid-cols-5 gap-2">
        {PHASES.map((phase) => {
          const isCompleted = completedPhases.includes(phase.id);
          const isActive = phase.id === currentPhase;
          const isLocked = !isCompleted && !isActive;
          const total = phase.weeks.reduce((s, w) => s + w.tasks.length, 0);
          const pct = computePhaseProgress(phase.id, total, completedTasks);

          return (
            <Link
              key={phase.id}
              href={`/phase/${phase.id}`}
              className={`relative rounded-lg p-2.5 border transition-all hover:scale-105 ${
                isCompleted
                  ? 'border-green-500/30 bg-green-500/5'
                  : isActive
                  ? 'border-[#F97316]/40 bg-[#F97316]/5'
                  : 'border-[#222] bg-[#111] opacity-60'
              }`}
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mb-1.5 mx-auto"
                style={{ background: isLocked ? '#333' : phase.color + '22', color: isLocked ? '#666' : phase.color }}
              >
                {isCompleted ? '✓' : phase.id}
              </div>
              <p className="text-[10px] text-center text-[#888] leading-tight line-clamp-2">
                {phase.shortName}
              </p>
              {!isLocked && (
                <div className="mt-2 h-1 rounded-full bg-[#222]">
                  <div
                    className="h-1 rounded-full transition-all"
                    style={{ width: `${isCompleted ? 100 : pct}%`, background: phase.color }}
                  />
                </div>
              )}
              {isActive && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#F97316] animate-pulse" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
