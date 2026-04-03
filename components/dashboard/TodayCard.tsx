'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Play, CheckCircle2, Circle, ExternalLink, Clock } from 'lucide-react';
import { useProgressStore } from '@/lib/progress-store';
import { PHASES } from '@/lib/roadmap-data';

function getDaysSinceStart(startDate: string): number {
  if (!startDate) return 1;
  const ms = Date.now() - new Date(startDate).getTime();
  return Math.max(1, Math.floor(ms / 86400000) + 1);
}

const TYPE_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  video:    { bg: 'rgba(59,130,246,0.1)',  text: '#60a5fa', border: 'rgba(59,130,246,0.3)' },
  coding:   { bg: 'rgba(16,185,129,0.1)',  text: '#34d399', border: 'rgba(16,185,129,0.3)' },
  reading:  { bg: 'rgba(139,92,246,0.1)',  text: '#a78bfa', border: 'rgba(139,92,246,0.3)' },
  exercise: { bg: 'rgba(245,158,11,0.1)',  text: '#fbbf24', border: 'rgba(245,158,11,0.3)' },
  project:  { bg: 'rgba(249,115,22,0.1)',  text: '#fb923c', border: 'rgba(249,115,22,0.3)' },
  exam:     { bg: 'rgba(239,68,68,0.1)',   text: '#f87171', border: 'rgba(239,68,68,0.3)' },
  leetcode: { bg: 'rgba(234,179,8,0.1)',   text: '#fde047', border: 'rgba(234,179,8,0.3)' },
};

const TYPE_LABELS: Record<string, string> = {
  video: 'Video', coding: 'Code', reading: 'Đọc',
  exercise: 'Bài tập', project: 'Dự án', exam: 'Thi', leetcode: 'LC',
};

const PHASE_GRADIENTS: Record<number, string> = {
  1: '#F97316', 2: '#F59E0B', 3: '#EF4444', 4: '#EAB308',
  5: '#8B5CF6', 6: '#7C3AED', 7: '#3B82F6', 8: '#06B6D4',
  9: '#10B981', 10: '#EC4899',
};

export function TodayCard() {
  const { currentPhase, completedTasks, completeTask, startDate, setStartDate } = useProgressStore();
  const [showSetup, setShowSetup] = useState(!startDate);
  const [dateInput, setDateInput] = useState(startDate || new Date().toISOString().split('T')[0]);

  const phase = PHASES.find((p) => p.id === currentPhase);
  const phaseColor = PHASE_GRADIENTS[currentPhase] ?? '#F97316';
  const dayNum = getDaysSinceStart(startDate);

  const globalWeekNum = Math.ceil(dayNum / 7);
  const todayWeek = phase?.weeks.find((w) => w.weekNumber === globalWeekNum) ?? phase?.weeks[0];
  const dayOfWeek = ((dayNum - 1) % 7) + 1;
  const todayTasks = todayWeek?.tasks.filter((t) => t.day === dayOfWeek) ?? [];
  const doneTasks = todayTasks.filter((t) => completedTasks.includes(t.id)).length;
  const progressPct = todayTasks.length > 0 ? Math.round((doneTasks / todayTasks.length) * 100) : 0;

  if (showSetup) {
    return (
      <div className="rounded-2xl p-6 relative overflow-hidden" style={{ background: 'var(--card)', border: '1px solid rgba(249,115,22,0.3)' }}>
        <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background: 'linear-gradient(90deg, #F97316, #8B5CF6)' }} />
        <h2 className="text-lg font-bold text-white mb-1">Bắt Đầu Hành Trình</h2>
        <p className="text-sm mb-4" style={{ color: 'var(--muted)' }}>Nhập ngày bắt đầu học để theo dõi tiến độ</p>
        <div className="flex gap-3">
          <input
            type="date"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
            className="flex-1 rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:ring-1 focus:ring-[#F97316]"
            style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}
          />
          <button
            onClick={() => { setStartDate(dateInput); setShowSetup(false); }}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #F97316, #EA580C)' }}
          >
            Start!
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl p-5 relative overflow-hidden" style={{ background: 'var(--card)', border: `1px solid ${phaseColor}33` }}>
      {/* Gradient top bar — phase color */}
      <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background: `linear-gradient(90deg, ${phaseColor}, ${phaseColor}aa)` }} />

      <div className="flex items-start justify-between mb-4 mt-1">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-lg">{phase?.icon}</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: `${phaseColor}22`, color: phaseColor }}>
              Phase {currentPhase}
            </span>
          </div>
          <h2 className="text-base font-bold text-white">{phase?.name}</h2>
          <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>Ngày {dayNum} · Tuần {todayWeek?.phaseWeek} · Hôm nay</p>
        </div>
        <Link
          href={`/phase/${currentPhase}`}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-white transition-all hover:opacity-90 shrink-0"
          style={{ background: `linear-gradient(135deg, ${phaseColor}, ${phaseColor}cc)` }}
        >
          <Play size={11} />
          Bắt Đầu
        </Link>
      </div>

      {todayTasks.length > 0 ? (
        <>
          <p className="text-xs font-semibold mb-2.5 uppercase tracking-wider" style={{ color: 'var(--muted)' }}>
            Nhiệm Vụ Hôm Nay
          </p>
          <div className="space-y-2">
            {todayTasks.map((task) => {
              const done = completedTasks.includes(task.id);
              const typeStyle = TYPE_COLORS[task.type] ?? TYPE_COLORS.reading;
              return (
                <div
                  key={task.id}
                  className="flex items-center gap-3 p-3 rounded-xl transition-all border-l-2"
                  style={{
                    background: done ? 'rgba(16,185,129,0.05)' : typeStyle.bg,
                    borderLeftColor: done ? '#10B981' : typeStyle.border,
                    border: `1px solid ${done ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.04)'}`,
                    borderLeft: `2px solid ${done ? '#10B981' : typeStyle.text}`,
                  }}
                >
                  <button
                    onClick={() => completeTask(task.id)}
                    className="shrink-0 transition-transform hover:scale-110"
                  >
                    {done
                      ? <CheckCircle2 size={16} className="text-emerald-400" />
                      : <Circle size={16} style={{ color: 'var(--muted)' }} />
                    }
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${done ? 'line-through opacity-50' : 'text-white'}`}>
                      {task.title}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] px-1.5 py-0.5 rounded font-medium" style={{ background: typeStyle.bg, color: typeStyle.text }}>
                        {TYPE_LABELS[task.type] ?? task.type}
                      </span>
                      <span className="flex items-center gap-1 text-[10px]" style={{ color: 'var(--muted)' }}>
                        <Clock size={9} />
                        {task.estimatedHours}h
                      </span>
                    </div>
                  </div>
                  {task.resource && (
                    <a href={task.resource.url} target="_blank" rel="noopener noreferrer"
                      className="shrink-0 transition-colors hover:text-[#F97316]" style={{ color: 'var(--muted)' }}>
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              );
            })}
          </div>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="flex justify-between text-[10px] mb-1.5" style={{ color: 'var(--muted)' }}>
              <span>{doneTasks}/{todayTasks.length} tasks hôm nay</span>
              <span>{progressPct}%</span>
            </div>
            <div className="h-1.5 rounded-full" style={{ background: 'var(--border)' }}>
              <div
                className="h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${progressPct}%`, background: `linear-gradient(90deg, ${phaseColor}, ${phaseColor}99)` }}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-6">
          <p className="text-2xl mb-2">🎉</p>
          <p className="text-sm font-medium text-white">Không có task hôm nay</p>
          <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>Nghỉ ngơi hoặc xem trước tuần sau!</p>
        </div>
      )}
    </div>
  );
}
