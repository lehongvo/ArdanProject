'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ExternalLink, Trash2, GripVertical } from 'lucide-react';
import type { JobApplication } from '@/types';

const PLATFORM_COLORS: Record<JobApplication['platform'], string> = {
  'web3.career': '#F97316',
  wellfound: '#6366f1',
  remote3: '#10b981',
  linkedin: '#0077b5',
  other: '#888',
};

interface JobCardProps {
  job: JobApplication;
  onRemove: (id: string) => void;
}

export function JobCard({ job, onRemove }: JobCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: job.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-[#0d0d0d] border border-[#1e1e1e] rounded-xl p-3 space-y-2 cursor-default"
    >
      <div className="flex items-start gap-2">
        {/* Drag handle */}
        <button
          {...attributes}
          {...listeners}
          className="shrink-0 mt-0.5 text-[#444] hover:text-[#888] cursor-grab active:cursor-grabbing touch-none"
        >
          <GripVertical size={14} />
        </button>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white truncate">{job.company}</p>
          <p className="text-xs text-[#888] truncate">{job.position}</p>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          {job.url && (
            <a
              href={job.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#555] hover:text-[#F97316] transition-colors p-0.5"
            >
              <ExternalLink size={11} />
            </a>
          )}
          <button
            onClick={() => onRemove(job.id)}
            className="text-[#555] hover:text-red-400 transition-colors p-0.5"
          >
            <Trash2 size={11} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap pl-5">
        <span
          className="text-[10px] px-1.5 py-0.5 rounded-full font-medium"
          style={{
            background: PLATFORM_COLORS[job.platform] + '22',
            color: PLATFORM_COLORS[job.platform],
          }}
        >
          {job.platform}
        </span>
        {job.salary && (
          <span className="text-[10px] text-[#888]">{job.salary}</span>
        )}
        {job.appliedDate && (
          <span className="text-[10px] text-[#666]">
            {new Date(job.appliedDate).toLocaleDateString('vi-VN')}
          </span>
        )}
      </div>

      {job.tags.length > 0 && (
        <div className="flex gap-1 flex-wrap pl-5">
          {job.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded bg-[#1a1a1a] text-[#666]">
              {tag}
            </span>
          ))}
        </div>
      )}

      {job.notes && (
        <p className="text-[10px] text-[#666] pl-5 line-clamp-2">{job.notes}</p>
      )}
    </div>
  );
}
