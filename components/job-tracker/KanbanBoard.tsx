'use client';

import { useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { JobCard } from './JobCard';
import type { JobApplication } from '@/types';

const COLUMNS: { id: JobApplication['status']; label: string; color: string }[] = [
  { id: 'bookmarked', label: 'Đã Lưu', color: '#888' },
  { id: 'applied', label: 'Đã Apply', color: '#3b82f6' },
  { id: 'interview', label: 'Phỏng Vấn', color: '#f59e0b' },
  { id: 'offer', label: 'Offer', color: '#22c55e' },
  { id: 'rejected', label: 'Từ Chối', color: '#ef4444' },
];

interface KanbanBoardProps {
  jobs: JobApplication[];
  onUpdate: (id: string, status: JobApplication['status']) => void;
  onRemove: (id: string) => void;
}

export function KanbanBoard({ jobs, onUpdate, onRemove }: KanbanBoardProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(String(event.active.id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const overId = String(over.id);
    const columnMatch = COLUMNS.find((c) => c.id === overId);

    if (columnMatch) {
      // Dropped on a column directly
      onUpdate(String(active.id), columnMatch.id);
    } else {
      // Dropped on another card — find that card's column
      const targetJob = jobs.find((j) => j.id === overId);
      if (targetJob && targetJob.status !== jobs.find((j) => j.id === String(active.id))?.status) {
        onUpdate(String(active.id), targetJob.status);
      }
    }
  };

  const activeJob = jobs.find((j) => j.id === activeId);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-3 overflow-x-auto pb-4">
        {COLUMNS.map((col) => {
          const colJobs = jobs.filter((j) => j.status === col.id);
          return (
            <div
              key={col.id}
              id={col.id}
              className="flex-shrink-0 w-64 flex flex-col"
            >
              {/* Column header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: col.color }} />
                  <span className="text-xs font-semibold text-white">{col.label}</span>
                </div>
                <span
                  className="text-[10px] px-1.5 py-0.5 rounded-full font-bold"
                  style={{ background: col.color + '22', color: col.color }}
                >
                  {colJobs.length}
                </span>
              </div>

              {/* Cards */}
              <div
                className="flex-1 min-h-32 rounded-xl border border-dashed border-[#222] p-2 space-y-2"
                data-column={col.id}
              >
                <SortableContext
                  items={colJobs.map((j) => j.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {colJobs.map((job) => (
                    <JobCard key={job.id} job={job} onRemove={onRemove} />
                  ))}
                </SortableContext>

                {colJobs.length === 0 && (
                  <div className="flex items-center justify-center h-20 text-[10px] text-[#444]">
                    Kéo thả vào đây
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <DragOverlay>
        {activeJob ? (
          <div className="opacity-90 rotate-2 shadow-2xl">
            <JobCard job={activeJob} onRemove={() => undefined} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
