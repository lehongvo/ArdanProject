'use client';

import { CheckCircle2, Clock, Target, Zap } from 'lucide-react';
import { useProgressStore, computePhaseProgress } from '@/lib/progress-store';
import type { Phase } from '@/types';

interface PhaseHeaderProps {
  phase: Phase;
  onComplete: () => void;
}

export function PhaseHeader({ phase, onComplete }: PhaseHeaderProps) {
  const { completedPhases, completedTasks } = useProgressStore();
  const isCompleted = completedPhases.includes(phase.id);
  const totalTasks = phase.weeks.reduce((s, w) => s + w.tasks.length, 0);
  const pct = isCompleted ? 100 : computePhaseProgress(phase.id, totalTasks, completedTasks);
  const doneTasks = Math.round((pct / 100) * totalTasks);

  return (
    <div
      className="rounded-2xl p-6 border mb-6"
      style={{ borderColor: phase.color + '33', background: phase.color + '08' }}
    >
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0"
            style={{ background: phase.color + '22' }}
          >
            {phase.icon}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span
                className="text-xs font-bold px-2.5 py-0.5 rounded-full"
                style={{ background: phase.color + '22', color: phase.color }}
              >
                Phase {phase.id}
              </span>
              {isCompleted && (
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-green-500/20 text-green-400">
                  Hoàn Thành ✓
                </span>
              )}
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white">{phase.name}</h1>
            <p className="text-sm text-[#888] mt-1">{phase.goal}</p>
          </div>
        </div>

        {/* Progress Ring */}
        <div className="flex flex-col items-center gap-1">
          <div className="relative w-16 h-16">
            <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="26" fill="none" stroke="#222" strokeWidth="6" />
              <circle
                cx="32"
                cy="32"
                r="26"
                fill="none"
                stroke={phase.color}
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 26}`}
                strokeDashoffset={`${2 * Math.PI * 26 * (1 - pct / 100)}`}
                className="transition-all duration-700"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-sm font-black text-white">
              {pct}%
            </span>
          </div>
          <p className="text-[10px] text-[#888]">
            {doneTasks}/{totalTasks} tasks
          </p>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3 mt-5">
        <div className="flex items-center gap-2">
          <Clock size={14} style={{ color: phase.color }} />
          <span className="text-sm text-[#aaa]">{phase.duration}</span>
        </div>
        <div className="flex items-center gap-2">
          <Target size={14} style={{ color: phase.color }} />
          <span className="text-sm text-[#aaa]">{phase.totalWeeks} tuần</span>
        </div>
        <div className="flex items-center gap-2">
          <Zap size={14} style={{ color: phase.color }} />
          <span className="text-sm text-[#aaa]">{totalTasks} tasks</span>
        </div>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-1.5 mt-4">
        {phase.skills.map((skill) => (
          <span
            key={skill}
            className="text-[11px] px-2.5 py-1 rounded-full border"
            style={{ borderColor: phase.color + '33', color: phase.color + 'cc' }}
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Complete button */}
      {!isCompleted && pct >= 80 && (
        <div className="mt-5 pt-4 border-t border-[#222]">
          <button
            onClick={onComplete}
            data-testid="complete-phase-btn"
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90 active:scale-95"
            style={{ background: phase.color }}
          >
            <CheckCircle2 size={16} />
            Hoàn Thành Phase {phase.id}!
          </button>
        </div>
      )}
    </div>
  );
}
