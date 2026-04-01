'use client';

import { useAppStore } from '@/lib/progress-store';
import { getDaysByPhase, getPhaseInfo } from '@/lib/roadmap-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import type { Phase } from '@/types';

const phases: Phase[] = ['foundation', 'intermediate', 'advanced', 'exam-prep', 'job-hunt', 'interview-prep'];

const phaseColorClasses: Record<string, string> = {
  blue: '[&>div]:bg-blue-500',
  violet: '[&>div]:bg-violet-500',
  amber: '[&>div]:bg-amber-500',
  red: '[&>div]:bg-red-500',
  emerald: '[&>div]:bg-emerald-500',
  pink: '[&>div]:bg-pink-500',
};

export default function PhaseProgress() {
  const completedDays = useAppStore((s) => s.completedDays);

  return (
    <Card data-testid="phase-progress">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Phase Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {phases.map((phase) => {
          const info = getPhaseInfo(phase);
          const days = getDaysByPhase(phase);
          const completed = days.filter((d) => completedDays.includes(d.id)).length;
          const percent = days.length > 0 ? Math.round((completed / days.length) * 100) : 0;

          return (
            <div key={phase} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{info.name}</span>
                <span className="text-muted-foreground">
                  {completed}/{days.length} ({percent}%)
                </span>
              </div>
              <Progress value={percent} className={`h-2 ${phaseColorClasses[info.color] || ''}`} />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
