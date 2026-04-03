'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Play, CheckCircle2, Circle, ExternalLink } from 'lucide-react';
import { useProgressStore } from '@/lib/progress-store';
import { PHASES } from '@/lib/roadmap-data';

function getDaysSinceStart(startDate: string): number {
  if (!startDate) return 1;
  const ms = Date.now() - new Date(startDate).getTime();
  return Math.max(1, Math.floor(ms / 86400000) + 1);
}

export function TodayCard() {
  const { currentPhase, completedTasks, completeTask, startDate, setStartDate } = useProgressStore();
  const [showSetup, setShowSetup] = useState(!startDate);
  const [dateInput, setDateInput] = useState(startDate || new Date().toISOString().split('T')[0]);

  const phase = PHASES.find((p) => p.id === currentPhase);
  const dayNum = getDaysSinceStart(startDate);

  // find today's week and tasks
  const globalWeekNum = Math.ceil(dayNum / 7);
  const todayWeek = phase?.weeks.find((w) => w.weekNumber === globalWeekNum) ?? phase?.weeks[0];
  const dayOfWeek = ((dayNum - 1) % 7) + 1;
  const todayTasks = todayWeek?.tasks.filter((t) => t.day === dayOfWeek) ?? [];

  if (showSetup) {
    return (
      <div className="card p-6 border-[#F97316]/30">
        <h2 className="text-lg font-bold text-white mb-1">🚀 Bắt Đầu Hành Trình</h2>
        <p className="text-sm text-[#888] mb-4">Nhập ngày bắt đầu học để theo dõi tiến độ</p>
        <div className="flex gap-3">
          <input
            type="date"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
            className="flex-1 bg-[#111] border border-[#333] rounded-lg px-3 py-2 text-sm text-white"
          />
          <button
            onClick={() => { setStartDate(dateInput); setShowSetup(false); }}
            className="bg-[#F97316] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#ea6c0a] transition-colors"
          >
            Start!
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card p-5" style={{ borderColor: (phase?.color ?? '#F97316') + '33' }}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">{phase?.icon}</span>
            <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: (phase?.color ?? '#F97316') + '22', color: phase?.color ?? '#F97316' }}>
              Phase {currentPhase}
            </span>
          </div>
          <h2 className="text-base font-bold text-white">{phase?.name}</h2>
          <p className="text-xs text-[#888] mt-0.5">Ngày {dayNum} · Tuần {todayWeek?.phaseWeek} · Hôm nay</p>
        </div>
        <Link
          href={`/phase/${currentPhase}`}
          className="flex items-center gap-1.5 bg-[#F97316] text-white px-3 py-2 rounded-lg text-xs font-semibold hover:bg-[#ea6c0a] transition-colors"
        >
          <Play size={12} />
          Bắt Đầu
        </Link>
      </div>

      {todayTasks.length > 0 ? (
        <div className="space-y-2">
          <p className="text-xs text-[#888] font-medium mb-2">Nhiệm Vụ Hôm Nay</p>
          {todayTasks.map((task) => {
            const done = completedTasks.includes(task.id);
            return (
              <div
                key={task.id}
                className={`flex items-center gap-3 p-2.5 rounded-lg border transition-colors ${
                  done ? 'bg-green-500/5 border-green-500/20' : 'bg-[#0d0d0d] border-[#222]'
                }`}
              >
                <button onClick={() => completeTask(task.id)} className="shrink-0 text-[#888] hover:text-white transition-colors">
                  {done ? <CheckCircle2 size={16} className="text-green-400" /> : <Circle size={16} />}
                </button>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${done ? 'line-through text-[#555]' : 'text-white'}`}>
                    {task.title}
                  </p>
                  <p className="text-xs text-[#888]">{task.estimatedHours}h</p>
                </div>
                {task.resource && (
                  <a href={task.resource.url} target="_blank" rel="noopener noreferrer" className="text-[#555] hover:text-[#F97316] transition-colors">
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-sm text-[#888] text-center py-4">Không có task hôm nay 🎉</p>
      )}
    </div>
  );
}
