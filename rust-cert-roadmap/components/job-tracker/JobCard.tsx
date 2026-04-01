'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Trash2, GripVertical } from 'lucide-react';
import type { JobApplication } from '@/types';

const platformColors: Record<string, string> = {
  'web3.career': 'bg-purple-500/10 text-purple-400',
  wellfound: 'bg-orange-500/10 text-orange-400',
  remote3: 'bg-blue-500/10 text-blue-400',
  linkedin: 'bg-sky-500/10 text-sky-400',
  other: 'bg-gray-500/10 text-gray-400',
};

interface JobCardProps {
  job: JobApplication;
  onDelete: (id: string) => void;
}

export default function JobCard({ job, onDelete }: JobCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: job.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} data-testid={`job-card-${job.id}`}>
      <Card className="cursor-grab active:cursor-grabbing">
        <CardContent className="p-3 space-y-2">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-1.5" {...attributes} {...listeners}>
              <GripVertical className="w-3 h-3 text-muted-foreground" />
              <h4 className="text-sm font-medium line-clamp-1">{job.company}</h4>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="w-6 h-6 text-muted-foreground hover:text-red-500"
              onClick={() => onDelete(job.id)}
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-1">{job.position}</p>
          {job.salary && (
            <p className="text-xs font-medium text-emerald-400">{job.salary}</p>
          )}
          <div className="flex items-center justify-between">
            <Badge variant="outline" className={`text-[10px] ${platformColors[job.platform] || ''}`}>
              {job.platform}
            </Badge>
            <a href={job.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-3 h-3 text-muted-foreground hover:text-foreground" />
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
