'use client';

import { Badge } from '@/components/ui/badge';
import { getPhaseInfo } from '@/lib/roadmap-data';
import { Clock, Target } from 'lucide-react';
import type { DayPlan } from '@/types';

const phaseColorMap: Record<string, string> = {
  blue: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  violet: 'bg-violet-500/10 text-violet-500 border-violet-500/20',
  amber: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
  red: 'bg-red-500/10 text-red-500 border-red-500/20',
  emerald: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
  pink: 'bg-pink-500/10 text-pink-500 border-pink-500/20',
};

export default function DayHeader({ day }: { day: DayPlan }) {
  const phaseInfo = getPhaseInfo(day.phase);
  const totalMinutes = day.lessons.reduce((sum, l) => sum + l.duration, 0);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <Badge variant="outline" className={phaseColorMap[phaseInfo.color] || ''}>
          {phaseInfo.name}
        </Badge>
        <span className="text-sm text-muted-foreground">Week {day.week}</span>
      </div>
      <h1 className="text-2xl font-bold">
        Day {day.id}: {day.title}
      </h1>
      <p className="text-muted-foreground">{day.goal}</p>
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4" />
          <span>{totalMinutes > 0 ? `${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}m` : '~4h estimated'}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Target className="w-4 h-4" />
          <span>{day.lessons.length} lessons</span>
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {day.targetSkills.map((skill) => (
          <Badge key={skill} variant="secondary" className="text-xs">
            {skill}
          </Badge>
        ))}
      </div>
    </div>
  );
}
