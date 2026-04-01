'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/progress-store';
import { getDaysByPhase, getPhaseInfo } from '@/lib/roadmap-data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Lock, CheckCircle2, Circle, Loader2 } from 'lucide-react';
import type { Phase } from '@/types';

const phases: Phase[] = ['foundation', 'intermediate', 'advanced', 'exam-prep', 'job-hunt', 'interview-prep'];

const statusIcons = {
  locked: Lock,
  available: Circle,
  'in-progress': Loader2,
  completed: CheckCircle2,
};

const statusColors = {
  locked: 'bg-muted text-muted-foreground border-border cursor-not-allowed',
  available: 'bg-blue-500/10 text-blue-400 border-blue-500/20 hover:border-blue-500/50 cursor-pointer',
  'in-progress': 'bg-amber-500/10 text-amber-400 border-amber-500/20 hover:border-amber-500/50 cursor-pointer',
  completed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:border-emerald-500/50 cursor-pointer',
};

const phaseTabColors: Record<string, string> = {
  blue: 'data-[state=active]:bg-blue-500/10 data-[state=active]:text-blue-400',
  violet: 'data-[state=active]:bg-violet-500/10 data-[state=active]:text-violet-400',
  amber: 'data-[state=active]:bg-amber-500/10 data-[state=active]:text-amber-400',
  red: 'data-[state=active]:bg-red-500/10 data-[state=active]:text-red-400',
  emerald: 'data-[state=active]:bg-emerald-500/10 data-[state=active]:text-emerald-400',
  pink: 'data-[state=active]:bg-pink-500/10 data-[state=active]:text-pink-400',
};

export default function RoadmapPage() {
  const [activePhase, setActivePhase] = useState<Phase>('foundation');
  const getDayStatus = useAppStore((s) => s.getDayStatus);
  const completedDays = useAppStore((s) => s.completedDays);

  const phaseDays = getDaysByPhase(activePhase);
  const phaseInfo = getPhaseInfo(activePhase);
  const completedInPhase = phaseDays.filter((d) => completedDays.includes(d.id)).length;
  const phasePercent = phaseDays.length > 0 ? Math.round((completedInPhase / phaseDays.length) * 100) : 0;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Roadmap</h1>
        <p className="text-muted-foreground mt-1">
          Your 120-day journey to Rust certification
        </p>
      </div>

      <Tabs value={activePhase} onValueChange={(v) => setActivePhase(v as Phase)}>
        <TabsList className="w-full justify-start overflow-x-auto flex-nowrap h-auto p-1 bg-muted/50">
          {phases.map((phase) => {
            const info = getPhaseInfo(phase);
            return (
              <TabsTrigger
                key={phase}
                value={phase}
                className={`text-xs whitespace-nowrap ${phaseTabColors[info.color] || ''}`}
              >
                {info.name}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {phases.map((phase) => (
          <TabsContent key={phase} value={phase} className="space-y-4 mt-4">
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h2 className="font-semibold">{phaseInfo.name}</h2>
                    <p className="text-sm text-muted-foreground">{phaseInfo.description}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    Days {phaseInfo.days}
                  </Badge>
                </div>
                <div className="flex items-center gap-3">
                  <Progress value={phasePercent} className="h-2 flex-1" />
                  <span className="text-sm font-medium text-muted-foreground w-12 text-right">
                    {phasePercent}%
                  </span>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
              {getDaysByPhase(phase).map((day) => {
                const status = getDayStatus(day.id);
                const StatusIcon = statusIcons[status];
                const content = (
                  <Card
                    className={`transition-all ${statusColors[status]}`}
                    data-testid={`day-card-${day.id}`}
                  >
                    <CardContent className="p-3 text-center space-y-1">
                      <StatusIcon className={`w-4 h-4 mx-auto ${status === 'in-progress' ? 'animate-spin' : ''}`} />
                      <p className="text-xs font-bold">Day {day.id}</p>
                      <p className="text-[10px] leading-tight line-clamp-2">{day.title}</p>
                    </CardContent>
                  </Card>
                );

                if (status === 'locked') {
                  return <div key={day.id}>{content}</div>;
                }

                return (
                  <Link key={day.id} href={`/day/${day.id}`}>
                    {content}
                  </Link>
                );
              })}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
