'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import { CheckCircle2, Circle, ExternalLink, ChevronDown, ChevronUp, Trophy } from 'lucide-react';
import { useProgressStore } from '@/lib/progress-store';
import { getPhaseById } from '@/lib/roadmap-data';
import type { PhaseId } from '@/types';
import { useState } from 'react';
import confetti from 'canvas-confetti';

const TYPE_ICON: Record<string, string> = {
  video: '🎬', reading: '📖', coding: '💻', exercise: '✏️',
  project: '🚀', exam: '📝', leetcode: '💡',
};

export default function PhasePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const phaseId = parseInt(id) as PhaseId;
  const phase = getPhaseById(phaseId);
  if (!phase || phaseId < 1 || phaseId > 10) notFound();

  const { completedTasks, completeTask, completedPhases, completePhase } = useProgressStore();
  const [openWeeks, setOpenWeeks] = useState<number[]>([phase.weeks[0]?.weekNumber ?? 1]);
  const isPhaseComplete = completedPhases.includes(phaseId);

  const totalTasks = phase.weeks.reduce((s, w) => s + w.tasks.length, 0);
  const doneTasks = completedTasks.filter((id) => id.startsWith(`p${phaseId}w`)).length;
  const pct = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

  function toggleWeek(n: number) {
    setOpenWeeks((prev) => prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n]);
  }

  function handleComplete() {
    completePhase(phaseId);
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 }, colors: [phase?.color ?? '#F97316', '#fff', '#F97316'] });
  }

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto space-y-5">
      {/* Header */}
      <div className="card p-6" style={{ borderColor: phase.color + '44' }}>
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0"
            style={{ background: phase.color + '22' }}>
            {phase.icon}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-[#888]">Phase {phase.id} · {phase.duration}</p>
            <h1 className="text-xl font-black text-white mt-0.5">{phase.name}</h1>
            <p className="text-sm text-[#888] mt-1">{phase.goal}</p>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex justify-between text-xs text-[#888] mb-1.5">
            <span>{doneTasks}/{totalTasks} tasks</span>
            <span>{pct}%</span>
          </div>
          <div className="h-2 rounded-full bg-[#222]">
            <div className="h-2 rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: phase.color }} />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {phase.skills.map((s) => (
            <span key={s} className="text-xs px-2.5 py-1 rounded-full"
              style={{ background: phase.color + '15', color: phase.color }}>
              {s}
            </span>
          ))}
        </div>

        {!isPhaseComplete && pct === 100 && (
          <button onClick={handleComplete}
            className="mt-4 w-full py-2.5 rounded-xl font-bold text-white text-sm flex items-center justify-center gap-2 transition-colors"
            style={{ background: phase.color }}>
            <Trophy size={16} /> Hoàn Thành Phase {phase.id}! 🎉
          </button>
        )}
        {isPhaseComplete && (
          <div className="mt-4 flex items-center gap-2 text-green-400 text-sm font-medium">
            <CheckCircle2 size={16} /> Phase đã hoàn thành!
          </div>
        )}
      </div>

      {/* Weeks */}
      <div className="space-y-3">
        {phase.weeks.map((week) => {
          const isOpen = openWeeks.includes(week.weekNumber);
          const weekDone = week.tasks.filter((t) => completedTasks.includes(t.id)).length;
          const weekPct = Math.round((weekDone / week.tasks.length) * 100);

          return (
            <div key={week.weekNumber} className="card overflow-hidden">
              <button
                onClick={() => toggleWeek(week.weekNumber)}
                className="w-full flex items-center gap-3 p-4 text-left hover:bg-white/5 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
                  style={{ background: phase.color + '22', color: phase.color }}>
                  W{week.phaseWeek}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{week.title}</p>
                  <p className="text-xs text-[#888]">{weekDone}/{week.tasks.length} · {weekPct}%</p>
                </div>
                {isOpen ? <ChevronUp size={14} className="text-[#888] shrink-0" /> : <ChevronDown size={14} className="text-[#888] shrink-0" />}
              </button>

              {isOpen && (
                <div className="border-t border-[#222] divide-y divide-[#1a1a1a]">
                  {week.tasks.map((task) => {
                    const done = completedTasks.includes(task.id);
                    return (
                      <div key={task.id} className={`flex items-center gap-3 px-4 py-3 ${done ? 'opacity-60' : ''}`}>
                        <button onClick={() => completeTask(task.id)} className="shrink-0">
                          {done
                            ? <CheckCircle2 size={16} className="text-green-400" />
                            : <Circle size={16} className="text-[#555]" />}
                        </button>
                        <span className="text-base shrink-0">{TYPE_ICON[task.type] ?? '📌'}</span>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium ${done ? 'line-through text-[#555]' : 'text-white'}`}>
                            {task.title}
                          </p>
                          <p className="text-xs text-[#888] truncate">{task.description}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-xs text-[#888]">{task.estimatedHours}h</span>
                          {task.resource && (
                            <a href={task.resource.url} target="_blank" rel="noopener noreferrer"
                              className="text-[#555] hover:text-[#F97316] transition-colors">
                              <ExternalLink size={12} />
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
