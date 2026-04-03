'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useProgressStore } from '@/lib/progress-store';
import { TaskBlock } from './TaskBlock';
import type { Week } from '@/types';

interface WeekGridProps {
  weeks: Week[];
  phaseColor: string;
}

export function WeekGrid({ weeks, phaseColor }: WeekGridProps) {
  const { completedTasks } = useProgressStore();
  const [openWeeks, setOpenWeeks] = useState<number[]>([weeks[0]?.weekNumber ?? 0]);

  const toggle = (wNum: number) => {
    setOpenWeeks((prev) =>
      prev.includes(wNum) ? prev.filter((n) => n !== wNum) : [...prev, wNum]
    );
  };

  return (
    <div className="space-y-3">
      {weeks.map((week) => {
        const done = week.tasks.filter((t) => completedTasks.includes(t.id)).length;
        const total = week.tasks.length;
        const pct = total > 0 ? Math.round((done / total) * 100) : 0;
        const isComplete = done === total && total > 0;
        const isOpen = openWeeks.includes(week.weekNumber);

        return (
          <div
            key={week.weekNumber}
            className="card overflow-hidden"
            style={isComplete ? { borderColor: '#22c55e33' } : undefined}
          >
            {/* Week header */}
            <button
              onClick={() => toggle(week.weekNumber)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-white/2 transition-colors"
            >
              <div className="flex items-center gap-3">
                {isComplete ? (
                  <CheckCircle2 size={16} className="text-green-400 shrink-0" />
                ) : isOpen ? (
                  <ChevronDown size={16} className="text-[#888] shrink-0" />
                ) : (
                  <ChevronRight size={16} className="text-[#888] shrink-0" />
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ background: phaseColor + '22', color: phaseColor }}>
                      Tuần {week.phaseWeek}
                    </span>
                    <span className="text-sm font-semibold text-white">{week.title}</span>
                  </div>
                  <p className="text-xs text-[#666] mt-0.5 line-clamp-1">{week.goal}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs text-[#888]">{done}/{total}</span>
                <div className="w-16 h-1.5 rounded-full bg-[#222] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${pct}%`, background: isComplete ? '#22c55e' : phaseColor }}
                  />
                </div>
              </div>
            </button>

            {/* Tasks */}
            {isOpen && (
              <div className="px-4 pb-4 space-y-2 border-t border-[#1a1a1a]">
                <div className="pt-3 space-y-2">
                  {week.tasks.map((task) => (
                    <TaskBlock key={task.id} task={task} />
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
