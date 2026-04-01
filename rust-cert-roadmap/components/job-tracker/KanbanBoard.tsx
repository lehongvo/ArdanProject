'use client';

import { useAppStore } from '@/lib/progress-store';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import JobCard from './JobCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { JobApplication } from '@/types';

const columns: { id: JobApplication['status']; label: string; color: string }[] = [
  { id: 'bookmarked', label: 'Bookmarked', color: 'border-t-gray-500' },
  { id: 'applied', label: 'Applied', color: 'border-t-blue-500' },
  { id: 'interview', label: 'Interview', color: 'border-t-amber-500' },
  { id: 'offer', label: 'Offer', color: 'border-t-emerald-500' },
  { id: 'rejected', label: 'Rejected', color: 'border-t-red-500' },
];

function DroppableColumn({
  id,
  label,
  color,
  jobs,
  onDelete,
}: {
  id: string;
  label: string;
  color: string;
  jobs: JobApplication[];
  onDelete: (id: string) => void;
}) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`flex-1 min-w-[200px] rounded-lg border border-border border-t-2 ${color} bg-muted/30 ${
        isOver ? 'ring-2 ring-[#DEA584]/50' : ''
      }`}
    >
      <div className="p-3 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">{label}</h3>
          <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
            {jobs.length}
          </span>
        </div>
      </div>
      <ScrollArea className="h-[400px]">
        <div className="p-2 space-y-2">
          <SortableContext items={jobs.map((j) => j.id)} strategy={verticalListSortingStrategy}>
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} onDelete={onDelete} />
            ))}
          </SortableContext>
          {jobs.length === 0 && (
            <p className="text-xs text-muted-foreground text-center py-8">Drop jobs here</p>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

export default function KanbanBoard() {
  const jobApplications = useAppStore((s) => s.jobApplications);
  const updateJobStatus = useAppStore((s) => s.updateJobStatus);
  const removeJobApplication = useAppStore((s) => s.removeJobApplication);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const jobId = active.id as string;
    const overId = over.id as string;

    const isColumn = columns.some((c) => c.id === overId);
    if (isColumn) {
      updateJobStatus(jobId, overId as JobApplication['status']);
    } else {
      const targetJob = jobApplications.find((j) => j.id === overId);
      if (targetJob) {
        updateJobStatus(jobId, targetJob.status);
      }
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const overId = over.id as string;
    const isColumn = columns.some((c) => c.id === overId);

    if (isColumn) {
      const jobId = active.id as string;
      const job = jobApplications.find((j) => j.id === jobId);
      if (job && job.status !== overId) {
        updateJobStatus(jobId, overId as JobApplication['status']);
      }
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <div className="flex gap-3 overflow-x-auto pb-4" data-testid="kanban-board">
        {columns.map((col) => {
          const jobs = jobApplications.filter((j) => j.status === col.id);
          return (
            <DroppableColumn
              key={col.id}
              id={col.id}
              label={col.label}
              color={col.color}
              jobs={jobs}
              onDelete={removeJobApplication}
            />
          );
        })}
      </div>
    </DndContext>
  );
}
