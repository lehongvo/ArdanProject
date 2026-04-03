'use client';

import { use, useState } from 'react';
import { notFound } from 'next/navigation';
import { CheckCircle2, Circle, ExternalLink, ChevronDown, ChevronUp, Trophy, FileText, Code, AlertTriangle, Lightbulb, BookOpen, Calendar } from 'lucide-react';
import { useProgressStore } from '@/lib/progress-store';
import { getPhaseById } from '@/lib/roadmap-data';
import type { PhaseId, DailyTask } from '@/types';
import confetti from 'canvas-confetti';
import { getTaskDate, formatViDate, formatShortDate } from '@/lib/utils';

const TYPE_ICON: Record<string, string> = {
  video: '🎬', reading: '📖', coding: '💻', exercise: '✏️',
  project: '🚀', exam: '📝', leetcode: '💡',
};

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

function TaskRow({ task, done, onComplete, phaseColor, startDate, completedDate }: {
  task: DailyTask;
  done: boolean;
  onComplete: () => void;
  phaseColor: string;
  startDate: string;
  completedDate?: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const hasEnrichedContent = task.keyPoints || task.codeExample || task.commonMistakes || task.practicePrompt;

  const taskDate = startDate ? getTaskDate(startDate, task.week, task.day) : null;
  const taskDateLabel = taskDate ? formatViDate(taskDate) : null;

  const completedDateLabel = completedDate
    ? (() => {
        const [y, m, d] = completedDate.split('-');
        return `${d}/${m}`;
      })()
    : null;

  return (
    <div className={`transition-all ${done ? 'opacity-70' : ''}`}>
      {/* Main task row */}
      <div className="flex items-center gap-3 px-4 py-3">
        <button onClick={onComplete} className="shrink-0 transition-transform hover:scale-110">
          {done
            ? <CheckCircle2 size={16} className="text-emerald-400" />
            : <Circle size={16} style={{ color: 'var(--muted)' }} />}
        </button>
        <span className="text-base shrink-0">{TYPE_ICON[task.type] ?? '📌'}</span>
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-medium ${done ? 'line-through' : 'text-white'}`} style={done ? { color: 'var(--muted)' } : {}}>
            {task.title}
          </p>
          <div className="flex items-center gap-2 mt-0.5 flex-wrap">
            <p className="text-xs truncate" style={{ color: 'var(--muted)' }}>{task.description}</p>
            {done && completedDateLabel && (
              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 shrink-0">
                ✓ Xong {completedDateLabel}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {taskDateLabel && !done && (
            <span className="hidden sm:flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-md"
              style={{ background: 'var(--border)', color: 'var(--muted)' }}>
              <Calendar size={9} />
              {taskDateLabel}
            </span>
          )}
          <span className="text-xs" style={{ color: 'var(--muted)' }}>{task.estimatedHours}h</span>
          {task.resource && (
            <a href={task.resource.url} target="_blank" rel="noopener noreferrer"
              className="transition-colors hover:text-[#F97316]" style={{ color: 'var(--muted)' }}>
              <ExternalLink size={12} />
            </a>
          )}
          {hasEnrichedContent && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-0.5 text-[10px] font-medium px-2 py-0.5 rounded-md transition-all hover:opacity-80"
              style={{ background: expanded ? `${phaseColor}20` : 'var(--border)', color: expanded ? phaseColor : 'var(--muted)' }}
            >
              {expanded ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
              {expanded ? 'Thu gọn' : 'Chi tiết'}
            </button>
          )}
        </div>
      </div>

      {/* Expanded enriched content */}
      {expanded && hasEnrichedContent && (
        <div className="px-4 pb-4 space-y-3 border-t" style={{ borderColor: 'var(--border)' }}>
          <div className="pt-3 space-y-3">

            {/* Key Points */}
            {task.keyPoints && task.keyPoints.length > 0 && (
              <div className="rounded-xl p-3.5" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
                <div className="flex items-center gap-2 mb-2.5">
                  <BookOpen size={13} style={{ color: phaseColor }} />
                  <p className="text-xs font-semibold" style={{ color: phaseColor }}>Điểm Chính</p>
                </div>
                <ul className="space-y-1.5">
                  {task.keyPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-white/80">
                      <span className="shrink-0 mt-0.5 text-emerald-400">✓</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Code Example */}
            {task.codeExample && (
              <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
                <div className="flex items-center gap-2 px-3 py-2" style={{ background: 'rgba(249,115,22,0.08)', borderBottom: '1px solid var(--border)' }}>
                  <Code size={12} className="text-orange-400" />
                  <p className="text-[10px] font-semibold text-orange-400 uppercase tracking-wider">Code Example</p>
                  <div className="ml-auto flex gap-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                  </div>
                </div>
                <pre
                  className="p-3.5 text-xs overflow-x-auto leading-relaxed"
                  style={{
                    background: '#0a0a14',
                    color: '#e8e8f0',
                    fontFamily: 'var(--font-geist-mono), "JetBrains Mono", monospace',
                  }}
                >
                  <code>{task.codeExample}</code>
                </pre>
              </div>
            )}

            {/* Common Mistakes */}
            {task.commonMistakes && task.commonMistakes.length > 0 && (
              <div className="rounded-xl p-3.5" style={{ background: 'rgba(249,115,22,0.05)', border: '1px solid rgba(249,115,22,0.2)' }}>
                <div className="flex items-center gap-2 mb-2.5">
                  <AlertTriangle size={13} className="text-orange-400" />
                  <p className="text-xs font-semibold text-orange-400">Lỗi Thường Gặp</p>
                </div>
                <ul className="space-y-1.5">
                  {task.commonMistakes.map((mistake, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-orange-300/80">
                      <span className="shrink-0 mt-0.5">⚠</span>
                      <span>{mistake}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Practice Prompt */}
            {task.practicePrompt && (
              <div className="rounded-xl p-3.5" style={{ background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.2)' }}>
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb size={13} className="text-emerald-400" />
                  <p className="text-xs font-semibold text-emerald-400">Bài Tập Thực Hành</p>
                </div>
                <p className="text-xs text-emerald-300/80 leading-relaxed">{task.practicePrompt}</p>
              </div>
            )}

            {/* Inline notes */}
            <TaskNotes taskId={task.id} />
          </div>
        </div>
      )}
    </div>
  );
}

function TaskNotes({ taskId }: { taskId: string }) {
  const { taskNotes, updateTaskNotes } = useProgressStore();
  const notes = taskNotes[taskId] ?? '';
  const [value, setValue] = useState(notes);

  return (
    <div>
      <div className="flex items-center gap-2 mb-1.5">
        <FileText size={12} style={{ color: 'var(--muted)' }} />
        <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Ghi Chú</p>
      </div>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => updateTaskNotes(taskId, value)}
        placeholder="Ghi chú của bạn về task này..."
        rows={2}
        className="w-full text-xs rounded-lg px-3 py-2 outline-none resize-none transition-colors focus:ring-1 focus:ring-[#F97316]"
        style={{
          background: 'var(--bg)',
          border: '1px solid var(--border)',
          color: 'var(--fg)',
        }}
      />
    </div>
  );
}

export default function PhasePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const phaseId = parseInt(id) as PhaseId;
  const phase = getPhaseById(phaseId);
  if (!phase || phaseId < 1 || phaseId > 10) notFound();

  const { completedTasks, completedTaskDates, completeTask, completedPhases, completePhase, startDate } = useProgressStore();
  const [openWeeks, setOpenWeeks] = useState<number[]>([phase.weeks[0]?.weekNumber ?? 1]);
  const isPhaseComplete = completedPhases.includes(phaseId);

  const totalTasks = phase.weeks.reduce((s, w) => s + w.tasks.length, 0);
  const doneTasks = completedTasks.filter((tid) => tid.startsWith(`p${phaseId}w`)).length;
  const pct = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

  const [colorA, colorB] = PHASE_GRADIENTS[phaseId] ?? ['#F97316', '#EA580C'];

  function toggleWeek(n: number) {
    setOpenWeeks((prev) => prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n]);
  }

  function handleComplete() {
    completePhase(phaseId);
    confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 }, colors: [colorA, '#fff', colorB] });
  }

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto space-y-5">
      {/* Phase header — full gradient banner */}
      <div
        className="rounded-2xl p-6 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${colorA}15, ${colorB}08, var(--card))`,
          border: `1px solid ${colorA}30`,
        }}
      >
        {/* Top gradient bar */}
        <div
          className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
          style={{ background: `linear-gradient(90deg, ${colorA}, ${colorB})` }}
        />
        {/* Decorative blob */}
        <div
          className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl pointer-events-none opacity-15"
          style={{ background: colorA }}
        />

        <div className="relative flex items-start gap-4">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shrink-0"
            style={{ background: `linear-gradient(135deg, ${colorA}25, ${colorB}15)`, border: `1px solid ${colorA}30` }}
          >
            {phase.icon}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: colorA }}>
              Phase {phase.id} · {phase.duration}
            </p>
            <h1 className="text-xl font-black text-white mb-1">{phase.name}</h1>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(232,232,240,0.6)' }}>{phase.goal}</p>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-5 relative">
          <div className="flex justify-between text-xs mb-2" style={{ color: 'var(--muted)' }}>
            <span>{doneTasks}/{totalTasks} tasks hoàn thành</span>
            <span className="font-bold" style={{ color: colorA }}>{pct}%</span>
          </div>
          <div className="h-2 rounded-full" style={{ background: 'var(--border)' }}>
            <div
              className="h-2 rounded-full transition-all duration-700 relative overflow-hidden"
              style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${colorA}, ${colorB})` }}
            >
              <div className="absolute inset-0 progress-shimmer" />
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mt-4">
          {phase.skills.map((s) => (
            <span key={s} className="text-xs px-2.5 py-1 rounded-full font-medium"
              style={{ background: `${colorA}15`, color: colorA }}>
              {s}
            </span>
          ))}
        </div>

        {/* Complete button */}
        {!isPhaseComplete && pct === 100 && (
          <button
            onClick={handleComplete}
            className="mt-5 w-full py-3 rounded-xl font-bold text-white text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90 hover:scale-[1.01]"
            style={{ background: `linear-gradient(135deg, ${colorA}, ${colorB})` }}
          >
            <Trophy size={16} />
            Hoàn Thành Phase {phase.id}! 🎉
          </button>
        )}
        {isPhaseComplete && (
          <div className="mt-4 flex items-center gap-2 text-emerald-400 text-sm font-semibold">
            <CheckCircle2 size={16} />
            Phase đã hoàn thành xuất sắc!
          </div>
        )}
      </div>

      {/* Weeks accordion */}
      <div className="space-y-3">
        {phase.weeks.map((week) => {
          const isOpen = openWeeks.includes(week.weekNumber);
          const weekDone = week.tasks.filter((t) => completedTasks.includes(t.id)).length;
          const weekPct = week.tasks.length > 0 ? Math.round((weekDone / week.tasks.length) * 100) : 0;
          const weekComplete = weekPct === 100;

          const weekDateRange = startDate
            ? (() => {
                const start = getTaskDate(startDate, week.weekNumber, 1);
                const end = getTaskDate(startDate, week.weekNumber, 7);
                return `${formatShortDate(start)} – ${formatShortDate(end)}`;
              })()
            : null;

          return (
            <div
              key={week.weekNumber}
              className="rounded-2xl overflow-hidden"
              style={{
                background: 'var(--card)',
                border: `1px solid ${weekComplete ? 'rgba(16,185,129,0.2)' : 'var(--border)'}`,
              }}
            >
              <button
                onClick={() => toggleWeek(week.weekNumber)}
                className="w-full flex items-center gap-3 p-4 text-left transition-colors hover:bg-white/5"
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black shrink-0"
                  style={{
                    background: weekComplete ? 'rgba(16,185,129,0.2)' : `${colorA}20`,
                    color: weekComplete ? '#10B981' : colorA,
                  }}
                >
                  {weekComplete ? '✓' : `W${week.phaseWeek}`}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-white truncate">{week.title}</p>
                    {weekDateRange && (
                      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded shrink-0"
                        style={{ background: 'var(--border)', color: 'var(--muted)' }}>
                        📅 {weekDateRange}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <p className="text-xs" style={{ color: 'var(--muted)' }}>{weekDone}/{week.tasks.length} tasks</p>
                    <div className="flex-1 max-w-24 h-1 rounded-full" style={{ background: 'var(--border)' }}>
                      <div
                        className="h-1 rounded-full transition-all"
                        style={{
                          width: `${weekPct}%`,
                          background: weekComplete ? '#10B981' : `linear-gradient(90deg, ${colorA}, ${colorB})`,
                        }}
                      />
                    </div>
                    <span className="text-[10px] font-medium" style={{ color: weekComplete ? '#10B981' : colorA }}>
                      {weekPct}%
                    </span>
                  </div>
                </div>
                {isOpen
                  ? <ChevronUp size={14} style={{ color: 'var(--muted)' }} className="shrink-0" />
                  : <ChevronDown size={14} style={{ color: 'var(--muted)' }} className="shrink-0" />}
              </button>

              {isOpen && (
                <div className="border-t divide-y" style={{ borderColor: 'var(--border)' }}>
                  <p className="px-4 py-2 text-[10px] font-medium" style={{ color: 'var(--muted)' }}>
                    {week.goal}
                  </p>
                  {week.tasks.map((task) => (
                    <TaskRow
                      key={task.id}
                      task={task}
                      done={completedTasks.includes(task.id)}
                      onComplete={() => completeTask(task.id)}
                      phaseColor={colorA}
                      startDate={startDate}
                      completedDate={completedTaskDates[task.id]}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
