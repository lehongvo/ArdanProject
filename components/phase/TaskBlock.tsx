'use client';

import { ExternalLink, CheckCircle2, Circle, BookOpen, Code2, Video, Dumbbell, FolderKanban, GraduationCap, Code } from 'lucide-react';
import { useProgressStore } from '@/lib/progress-store';
import type { DailyTask } from '@/types';

const TYPE_ICONS: Record<DailyTask['type'], React.ElementType> = {
  reading: BookOpen,
  coding: Code2,
  video: Video,
  exercise: Dumbbell,
  project: FolderKanban,
  exam: GraduationCap,
  leetcode: Code,
};

const TYPE_LABELS: Record<DailyTask['type'], string> = {
  reading: 'Đọc',
  coding: 'Code',
  video: 'Video',
  exercise: 'Bài Tập',
  project: 'Project',
  exam: 'Thi',
  leetcode: 'LeetCode',
};

const PLATFORM_COLORS: Record<string, string> = {
  udemy: '#a435f0',
  ardan: '#F97316',
  leetcode: '#FFA116',
  github: '#4078c8',
  docs: '#48b5c4',
  youtube: '#ff0000',
  custom: '#888',
};

interface TaskBlockProps {
  task: DailyTask;
}

export function TaskBlock({ task }: TaskBlockProps) {
  const { completedTasks, completeTask, taskNotes, updateTaskNotes } = useProgressStore();
  const done = completedTasks.includes(task.id);
  const Icon = TYPE_ICONS[task.type];

  return (
    <div
      data-testid={`task-${task.id}`}
      className={`group flex items-start gap-3 p-3 rounded-xl border transition-all ${
        done
          ? 'bg-green-500/5 border-green-500/20 opacity-70'
          : 'bg-[#0d0d0d] border-[#1e1e1e] hover:border-[#333]'
      }`}
    >
      {/* Checkbox */}
      <button
        onClick={() => completeTask(task.id)}
        data-testid={`task-check-${task.id}`}
        className="shrink-0 mt-0.5 text-[#555] hover:text-white transition-colors"
      >
        {done ? (
          <CheckCircle2 size={18} className="text-green-400" />
        ) : (
          <Circle size={18} />
        )}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <p className={`text-sm font-medium leading-snug ${done ? 'line-through text-[#555]' : 'text-white'}`}>
              {task.title}
            </p>
            <p className="text-xs text-[#666] mt-0.5 line-clamp-2">{task.description}</p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Time */}
            <span className="text-[10px] text-[#888] whitespace-nowrap">{task.estimatedHours}h</span>

            {/* Resource link */}
            {task.resource && (
              <a
                href={task.resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#555] hover:text-[#F97316] transition-colors"
                title={task.resource.label}
              >
                <ExternalLink size={12} />
              </a>
            )}
          </div>
        </div>

        {/* Tags */}
        <div className="flex items-center gap-2 mt-2">
          <span className="flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-[#1a1a1a] text-[#888]">
            <Icon size={9} />
            {TYPE_LABELS[task.type]}
          </span>
          {task.resource && (
            <span
              className="text-[10px] px-1.5 py-0.5 rounded font-medium"
              style={{
                background: (PLATFORM_COLORS[task.resource.platform] ?? '#888') + '22',
                color: PLATFORM_COLORS[task.resource.platform] ?? '#888',
              }}
            >
              {task.resource.platform}
            </span>
          )}
          <span className="text-[10px] text-[#555]">
            Day {task.day}
          </span>
        </div>

        {/* Notes (lazy-shown) */}
        <div className="mt-2 hidden group-hover:block">
          <input
            type="text"
            value={taskNotes[task.id] ?? ''}
            onChange={(e) => updateTaskNotes(task.id, e.target.value)}
            placeholder="Ghi chú..."
            className="w-full text-xs bg-transparent border-b border-[#333] text-[#888] placeholder:text-[#444] focus:outline-none focus:border-[#F97316]/50 pb-0.5"
          />
        </div>
      </div>
    </div>
  );
}
